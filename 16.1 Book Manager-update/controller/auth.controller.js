var db = require("../db");
var shortid = require("shortid");
//var md5 = require("md5");
var bcrypt = require("bcrypt");

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

    bcrypt.compare(pass, user.pass, function(err, res) {
        // res == true
        if (res != true) {
            response.render("auth/login", {
                errors: ["Wrong pass !"],
                values: request.body,
            });
            return;
        }
    });
    //var hashpass = md5(pass);
    // if (user.pass !== hashpass) {
    //     response.render("auth/login", {
    //         errors: ["Wrong pass !"],
    //         values: request.body,
    //     });
    //     return;
    // }
    response.cookie("userID", user.id);
    response.redirect("/user/list");
};