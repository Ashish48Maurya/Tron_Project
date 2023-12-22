require('dotenv').config()
const Payment = require('../models/Payment');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Msg = require('../models/Contact');
const Admin = require('../models/Admin');



exports.sendFunds = async (req, res) => {
  const { senderAddress, recipientAddress, amount, asset,txId } = req.body;
  if (!senderAddress || !recipientAddress || !amount || !asset || !txId) {
    return res.status(400).json({ "error": "Please Fill All the Fields!!!" });
  }
  const userId = req.userID;
  console.log("USERID: ", userId)
  if (!userId) {
    return res.status(401).json({ "error": "User not authenticated" });
  }
  console.log("UserId: ", userId);
  try {
    const payment = new Payment({
      from: senderAddress,
      to: recipientAddress,
      asset: asset,
      amount: amount,
      txID : txId
    });
    await payment.save();
    const user = await User.findById(userId);
    console.log("User: ",user)
    if(user){
      await User.findByIdAndUpdate(
        userId,
        { $push: { payments: payment._id } },
        { new: true }
      );
    }
    else {
      console.log("User not found")
      return res.status(404).json({ "error": "User not found" });
    }
    return res.status(200).json({ "msg": "Payment Successful" });
  } catch (err) {
    return res.status(500).json({ "msg": `Internal Server Error ${err}` });
  }
};


exports.countUsers = async (req, res) => {
  try {
    const userCount = await User.countDocuments();
    res.status(200).json({ "userCount": userCount });
  } catch (error) {
    console.error(error);
    res.status(500).json({ "error": "Internal server error" });
  }
};

exports.userData = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId).populate('payments');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getHistory = async (req, res) => {
  try {
    const userId = req.userID;
    const user = await User.findById(userId).populate('payments');

    if (!user) {
      return res.status(404).json({ "error": "User not found" });
    }
    const history = user.payments;
    console.log(history);

    if (!history) {
      return res.status(408).json({ "error": "Server Error" });
    } else {
      return res.status(200).json({ "Payments": history });
    }
  } catch (err) {
    return res.status(500).json({ "error": `Internal Server Error -> ${err}` });
  }
};

exports.history = async (req, res) => {
  try {
    const history = await Payment.find({});

    if (history.length === 0) {
      return res.status(408).json({ "error": "No payment history found" });
    } else {
      return res.status(200).json({ "Payments": history });
    }
  } catch (err) {
    return res.status(500).json({ "error": `Internal Server Error -> ${err}` });
  }
};

exports.sendMsg = async (req, res) => {
  const { username, address, message } = req.body;

  if (!username || !address || !message) {
    return res.status(422).json({ error: 'All Fields Are Required!' });
  }
  const userId = req.userID;
  try {

    const newMsg = new Msg({
      username,
      address,
      message,
    });

    await newMsg.save();
    await User.findByIdAndUpdate(userId, { $push: { messages: newMsg._id } });
    return res.status(200).json({ message: 'Message saved successfully!' });

  } catch (err) {
    console.error(`Error sending message: ${err}`);
    return res.status(500).json({ error: `Internal Server Error -> ${err}` });
  }
};  



exports.user = async (req, res) => {
  try {
    const userData = req.User;
    console.log(userData);
    res.status(200).json({ msg: userData })
  } catch (error) {
    console.log(error)
  }
}

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
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(422).json({ error: "Invalid username or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      const secretKey = process.env.JWT_SECRET_KEY || 'yourDefaultSecretKey';
      const token = jwt.sign({ _id: user.id }, secretKey);
      console.log('Bearer ',token);

      return res.status(200).json({
        message: "Login successful",
        token,
      });
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

    user.save().then(async user => {
      return res.json({
        message: "Registered Successfully",
        token: await user.generateToken(),
        userId: user._id.toString(),
      });
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
    const makeUpdate = await User.findByIdAndUpdate(id, { password: hashedPassword }, { useFindAndModify: false, new: true });

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

exports.admin = async (req, res) => {
  const { serviceProvider, usdc, usdt } = req.body;
  const id = process.env.ID;

  console.log("Received ID:", id);

  try {
    const existingAdmin = await Admin.findById(id);

    if (!existingAdmin) {
      return res.status(404).send("Admin not found");
    }

    const updateFields = {};
    if (serviceProvider && serviceProvider !== existingAdmin.serviceProvider) {
      updateFields.serviceProvider = serviceProvider;
    }

    if (usdt && usdt !== existingAdmin.usdt) {
      updateFields.usdt = usdt;
    }

    if (usdc && usdc !== existingAdmin.usdc) {
      updateFields.usdc = usdc;
    }

    if (Object.keys(updateFields).length === 0) {
      
      return res.status(200).json({ message: "No changes made" });
    }

    const updatedAdmin = await Admin.findByIdAndUpdate(id, updateFields, { new: true });

    if (!updatedAdmin) {
      return res.status(404).send("Updation Failed");
    }

    return res.status(200).json({ message: "Address Changed Successfully!!!", address: updatedAdmin });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};


exports.getAddress = async (req, res) => {
  const id = process.env.ID;
  try {
    const address = await Admin.findById(id);
    console.log(address);

    if (address.length === 0) {
      return res.status(408).json({ "error": "No payment address found" });
    } else {
      return res.status(200).json({ "Addresses": address });
    }
  } catch (err) {
    return res.status(500).json({ "error": `Internal Server Error -> ${err}` });
  }
};