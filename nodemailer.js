const express = require('express');
const PORT = 4000;
const app = express();
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: "Gmail",
    port: 465,
    secureConnection: false,
    auth: {
      user: "am7620613@gmail.com",
      pass: "yjiqasnwcujeqyds",
    }  
  });

async function main() {
    try {
        const info = await transporter.sendMail({
            from: 'am7620613@gmail.com',
            to: "maurya.48.ashish@gmail.com",
            subject: "Hello ✔",//Title
            text: "Hello world?",
            html: "<b>Hello Hello Nazare Screen Par (Mike testing Chal raha hai)</b>",//Subject
        });

        console.log("Message sent: %s", info.messageId);
    } catch (error) {
        console.error('Error sending email:', error);
    }
}

app.listen(PORT, async () => {
    console.log('Server Running...');
    await main();
});
