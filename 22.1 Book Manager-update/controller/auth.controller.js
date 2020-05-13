var db = require("../db");
var bcrypt = require("bcrypt");
var list_user_wrong = [];
module.exports.get_login = function(request, response) {
    response.render("auth/login");
};

module.exports.post_login = function(request, response) {
    var email = request.body.email;
    var pass = request.body.pass;

    var user = db
        .get("list_user")
        .find({
            email: email,
        })
        .value();
    if (!user) {
        response.render("auth/login", {
            errors: ["User does not exsit !"],
            values: request.body,
        });
        return;
    }

    if (user.count_erro < 5) {
        bcrypt.compare(pass, user.pass, function(err, res) {
            // res == true
            if (res == false) {
                response.render("auth/login", {
                    errors: ["Wrong pass !"],
                    values: request.body,
                });
                user.count_erro += 1;
                return;
            } else {
                response.cookie("userID", user.id, {
                    signed: true,
                });
                response.redirect("/user/list");
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