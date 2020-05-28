//var db = require("../db");
var bcrypt = require("bcrypt");
var list_user_wrong = [];
var User = require("../../model/user.model");

module.exports.get_login = function(request, response) {
    response.render("auth/login");
};

module.exports.post_login = async function(request, response) {
    var email = request.body.email;
    var pass = request.body.pass;
    var user = await User.find({
        email: email,
    });
    console.log(user[0]);
    if (!user) {
        response.render("auth/login", {
            errors: ["User does not exsit !"],
            values: request.body,
        });
        return;
    }
    if (user[0]["count_erro"] < 5) {
        bcrypt.compare(pass, user[0]["pass:"], function(err, res) {
            // res == true
            if (res == false) {
                response.render("auth/login", {
                    errors: ["Wrong pass !"],
                    values: request.body,
                });
                user[0]["count_erro"] += 1;
                return;
            } else {
                response.cookie("userID", user[0]["_id"], {
                    signed: true,
                });
                response.redirect("/api/users/list");
                return;
            }
        });
    } else {
        response.render("auth/login", {
            errors: ["Wrong pass over 5 times !"],
            values: request.body,
        });
        const sgMail = require("@sendgrid/mail");
        var API_EMAIL = process.env.SENDGRID_API_KEY;
        sgMail.setApiKey(API_EMAIL);
        const msg = {
            to: "ducanhn1308@gmail.com",
            from: "ducanhn130897@gmail.com",
            subject: "Sending From Book Manager System",
            text: "Dear  " + user.name + " ,",
            html: "<br> <p>Your account had failed sign-in more than <strong> 5</strong> times. Please opend system to change password if need or contact to us for help thank you. </p> ",
        };
        sgMail.send(msg);
        return;
    }
};