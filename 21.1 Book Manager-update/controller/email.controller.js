require("dotenv").config();
const sgMail = require("@sendgrid/mail");
var API_EMAIL = process.env;
sgMail.setApiKey(API_EMAIL);
const msg = {
    to: "ducanhn1308@gmail.com",
    from: "ducanhn130897@gmail.com",
    subject: "Sending with Twilio SendGrid is Fun",
    text: "and easy to do anywhere, even with Node.js",
    html: "<strong>and easy to do anywhere, even with Node.js</strong>",
};
sgMail.send(msg);