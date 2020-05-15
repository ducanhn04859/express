var db = require("../db");

module.exports.requireAuth = function(req, res, next) {
    var id = req.cookies.userID;

    if (!req.cookies.userID) {
        res.redirect("/auth/login");
        return;
    }

    var user = db.get("list_user").find({ id: req.cookies.userID }).value();
    //console.log(user);
    if (!user) {
        res.redirect("/auth/login");
        return;
    }

    next();
};