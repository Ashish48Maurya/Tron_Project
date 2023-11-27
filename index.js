const express = require('express');
const app = express();
const port = 8000;
const qrcode = require('qrcode');
const path = require('path');
const cors = require('cors');
const routes = require('./routes/routers');
const mongoConnect = require('./db');
const UserModel = require('./model');
const bcrypt = require('bcrypt');

app.use(express.json());
app.use(cors());
app.use(routes);

const count = 1;

app.post('/generate-qr', (req, res) => {
  const toAddress = req.body.toAddress;
  const amount = (req.body.amount)*1e6;
  const qrCodeData = `bitcoin:${toAddress}?amount=${amount}`;

  qrcode.toFile(
    path.join(__dirname, '/Frontend' , '/public', '/images', `${toAddress}${amount}qrcode.png`),
    // path.join(__dirname, '/Frontend', '/public', '/images', `qrcode.png`),
    qrCodeData,
    (err) => {
      if (err) {
        res.status(500).send('Error generating QR code');
      } else {
        res.status(200).send('QR code generated and saved in the public directory');
      }
    }
  );
});

routes.post('/signup', (req, res) => {
  const { name, username, email, password } = req.body;

  if (!name || !username || !email || !password) {
    console.log('Please add all the fields');
    return res.status(422).json({ error: "Please add all the fields" });
  }

  USER.findOne({ $or: [{ email: email }, { username: username }] })
    .then((savedUser) => {
      if (savedUser) {
        console.log('User already exists! with that username or email');
        return res.status(422).json({ error: "User already exists! with that username or email" });
      }

      bcrypt.hash(password, 12).then((hashedPassword) => {
        const user = new USER({
          name,
          username,
          email,
          password: hashedPassword,
        });

        user.save()
          .then(user => {
            res.json({ message: "Registered Successfully" });
          })
          .catch(err => {
            console.log(err);
            res.status(500).json({ error: "Internal server error" });
          })
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: "Internal server error" });
    });
});

app.post("/signin", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(422).json({ error: "Please provide a valid email and password" });
  }

  USER.findOne({ email: email }).then((savedUser) => {
    if (!savedUser) {
      return res.status(422).json({ error: "Invalid email or password" });
    }

    bcrypt.compare(password, savedUser.password).then((isMatch) => {
      if (isMatch) {
        res.json({ message: "Login successful" });
      } else {
        res.status(422).json({ error: "Invalid email or password" });
      }
    }).catch(err => {
      console.log(err);
      res.status(500).json({ error: "Internal server error" });
    });
  }).catch(err => {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  });
});


mongoConnect("mongodb://localhost:27017/Tron_Project").then(() => {
  app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
  });
}).catch((err) => {
  console.error(err);
  process.exit(1);
});