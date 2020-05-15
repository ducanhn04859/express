var db = require("../db");

module.exports.index = function(req, res) {
    var page = parseInt(req.query.page) || 1; //n
    var perPgae = 8; //x
    var start = (page - 1) * perPgae;
    var end = page * perPgae;
    var drop = (page - 1) * perPgae;
    var total_page = Math.ceil(100 / perPgae);
    var current_page = req.query.page;
    console.log(current_page);
    res.render("product/index", {
        //Cach 1
        //products: db.get("product_list").value().slice(start, end),
        //Cach2
        products: db.get("product_list").drop(drop).take(perPgae).value(),
        numpage: total_page,
        current_page: current_page,
    });
    const sgMail = require("@sendgrid/mail");
    var API_EMAIL = process.env.SENDGRID_API_KEY;
    sgMail.setApiKey(API_EMAIL);
    const msg = {
        to: "ducanhn1308@gmail.com",
        from: "ducanhn130897@gmail.com",
        subject: "Sending with Twilio SendGrid is Fun",
        text: "and easy to do anywhere, even with Node.js",
        html: "<strong>and easy to do anywhere, even with Node.js</strong>",
    };
    sgMail.send(msg);
};