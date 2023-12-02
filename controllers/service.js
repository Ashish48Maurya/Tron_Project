const payment = require('../models/Payment')
const User = require('../models/User')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.sendFunds = async(req,res)=>{
  const {senderAddress,recipientAddress,amount} = req.body;
  if(!senderAddress || !recipientAddress || !amount){
    return res.status(400).json({"error":"please Fill All the Fielsd!!!"})
  }
  try{
    const Payment = new payment({
      from:senderAddress,
      to:recipientAddress,
      amount:amount
    })
    await Payment.save();
    return res.status(200).json({"msg":"Payment Successfull"})
  }
  catch(err){
    return res.status(500).json({"msg":`Internal Server Error ${err}`})
  }
}

exports.getHistory=async(req,res)=>{
  try{
    const history = await payment.find({ status: 'pending' });
    if(!history){
    return res.status(408).json({"error":"Server Error"})
    }
    else{
    return res.status(200).json({"Payments":history})
    }
  }
  catch(err){
    return res.status(500).json({"error":`Internal Server Error -> ${err}`})
  }
  
}


exports.updatePayment = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedPayment = await payment.findOneAndUpdate(
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

exports.signin = (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(422).json({ error: "Please provide a valid username and password" });
  }

  User.findOne({ username: username }).then((savedUser) => {
    if (!savedUser) {
      return res.status(422).json({ error: "Invalid username or password" });
    }

    bcrypt.compare(password, savedUser.password).then((isMatch) => {
      if (isMatch) {
        // Generate JWT token
        const token = jwt.sign({ _id: savedUser._id }, process.env.JWT_SECRET);
        res.json({ message: "Login successful", token: token });
      } else {
        res.status(422).json({ error: "Invalid username or password" });
      }
    }).catch(err => {
      console.log(err);
      res.status(500).json({ error: "Internal server error" });
    });
  }).catch(err => {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  });
};


exports.signup = (req, res) => {
  const { username, phrase, password } = req.body;

  if (!username || !phrase || !password) {
    console.log('Please add all the fields');
    return res.status(422).json({ error: "Please add all the fields" });
  }

  User.findOne({ $or: [{ phrase: phrase }, { username: username }] })
    .then((savedUser) => {
      if (savedUser) {
        console.log('User already exists! with that username or email');
        return res.status(422).json({ error: "User already exists! with that username or email" });
      }

      bcrypt.hash(password, 12).then((hashedPassword) => {
        const user = new User({
          username,
          phrase,
          password: hashedPassword
        });
        user.save().then(user => {
          // Generate JWT token
          const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
          res.json({ message: "Registered Successfully", token: token });
        })
          .catch(err => {
            console.log(err);
            res.status(500).json({ error: "Internal server error" });
          });
      }); // <-- Added closing parenthesis here
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: "Internal server error" });
    });
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

    res.json({ message: "Phrase verification successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
