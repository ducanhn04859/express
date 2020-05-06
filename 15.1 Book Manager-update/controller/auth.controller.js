var db = require("../db");
var shortid = require("shortid");

module.exports.get_login = function(request, response) {
    response.render("auth/login");
};

module.exports.post_login = function(request, response) {
    var email = request.body.email;
    var pass = request.body.pass;

    var user = db.get("list_user").find({ email: email }).value();
    if (!user) {
        response.render("auth/login", {
            errors: ["User does not exsit !"],
            values: request.body,
        });
        return;
    }

    if (user.pass !== pass) {
        response.render("auth/login", {
            errors: ["Wrong pass !"],
            values: request.body,
        });
        return;
    }
    response.cookie("userID", user.id);
    response.redirect("/user/list");
};