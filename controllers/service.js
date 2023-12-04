const Payment = require('../models/Payment');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id.toString() }, "mynameisnothing");
  this.tokens = this.tokens.concat({ token: token });
  return token;
};

exports.sendFunds = async (req, res) => {
  const { senderAddress, recipientAddress, amount } = req.body;

  if (!senderAddress || !recipientAddress || !amount) {
    return res.status(400).json({ "error": "Please Fill All the Fields!!!" });
  }

  try {
    const payment = new Payment({
      from: senderAddress,
      to: recipientAddress,
      amount: amount
    });

    await payment.save();
    return res.status(200).json({ "msg": "Payment Successful" });
  } catch (err) {
    return res.status(500).json({ "msg": `Internal Server Error ${err}` });
  }
};

exports.getHistory = async (req, res) => {
  try {
    const history = await Payment.find({ status: 'pending' });

    if (!history) {
      return res.status(408).json({ "error": "Server Error" });
    } else {
      return res.status(200).json({ "Payments": history });
    }
  } catch (err) {
    return res.status(500).json({ "error": `Internal Server Error -> ${err}` });
  }
};

exports.updatePayment = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedPayment = await Payment.findOneAndUpdate(
      { _id: id },
      { $set: { status: req.body.status } },
      { useFindAndModify: false, new: true }
    );

    if (!updatedPayment) {
      return res.status(404).json({ "error": "Payment not found" });
    }

    return res.status(200).json({ "Updated_Payment": updatedPayment });
  } catch (err) {
    return res.status(500).json({ "error": `Internal Server Error -> ${err}` });
  }
};

exports.signin = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(422).json({ error: "Please provide a valid username and password" });
  }

  try {
    const user = await User.findOne({ username: username });

    if (!user) {
      return res.status(422).json({ error: "Invalid username or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      const token = await generateAuthToken.call(user);
      const cookies = res.cookie("jwt", token);

      // , {
      //   expires: new Date(Date.now() + 5000000),
      //     httpOnly: true,
      //       secure: false
      // }

      console.log(`Yoo is that a cookie ${cookies}`);
      return res.status(200).json({ message: "Login successful" });
    } else {
      return res.status(404).json({ error: "Invalid Credentials!!!" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

exports.signup = async (req, res) => {
  const { username, phrase, password } = req.body;

  if (!username || !phrase || !password) {
    console.log('Please add all the fields');
    return res.status(422).json({ error: "Please add all the fields" });
  }

  try {
    const existingUser = await User.findOne({ $or: [{ phrase: phrase }, { username: username }] });

    if (existingUser) {
      console.log('User already exists! with that username or email');
      return res.status(422).json({ error: "User already exists! with that username or email" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({
      username,
      phrase,
      password: hashedPassword
    });

    const token = generateAuthToken.call(user);

    res.cookie("jwt", token, {
      expires: new Date(Date.now() + 30000),
      httpOnly: true,
      secure: false 
    });

    user.save().then(user => {
      return res.json({ message: "Registered Successfully" });
    })
      .catch(err => {
        console.log(err);
        return res.status(500).json({ error: "Internal server error" });
      });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

exports.forgotpassword = async (req, res) => {
  const { phrase } = req.body;

  if (!phrase) {
    return res.status(422).json({ error: "Please provide a valid phrase" });
  }

  try {
    const user = await User.findOne({ phrase });

    if (!user) {
      return res.status(422).json({ error: "Invalid phrase" });
    }

    res.status(200).json({ message: "Phrase verification successful", "_id": user._id });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

exports.verify = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({ "error": "Content cannot be empty!!!" });
  }
  const { id } = req.params;

  const hashedPassword = await bcrypt.hash(req.body.password, 12);


  try {
    const makeUpdate = await User.findByIdAndUpdate(id, { password : hashedPassword }, { useFindAndModify: false, new: true });

    if (!makeUpdate) {
      return res.status(404).send("User Not Found");
    } else {
      return res.status(200).json({ message: "Password Changed Successfully!!!", "user": makeUpdate });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};
