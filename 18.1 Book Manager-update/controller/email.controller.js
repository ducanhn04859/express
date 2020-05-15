require("dotenv").config();
var api_key = process.env.API_KEY;
const mailgun = require("mailgun-js");
const DOMAIN =
    "https://api.mailgun.net/v3/sandboxc83bfcdf2e014496be4a649c42175d7b.mailgun.org";
const mg = mailgun({ apiKey: api_key, domain: DOMAIN });
const data = {
    from: "Excited User <ducanhn130897@gmail.com>",
    to: "anhndse04859@fpt.edu.com",
    subject: "Hello",
    text: "Testing some Mailgun awesomness!",
};
mg.messages().send(data, function(error, body) {
    console.log(body);
});