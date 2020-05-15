var db = require("../db");

module.exports.requireAuth = function(req, res, next) {
    var id = req.signedCookies.userID;

    if (!req.signedCookies.userID) {
        res.redirect("/auth/login");
        return;
    }

    var user = db.get("list_user").find({ id: req.signedCookies.userID }).value();
    //console.log(user);
    if (!user) {
        res.redirect("/auth/login");
        return;
    }
    res.locals.user = user;

    next();
};