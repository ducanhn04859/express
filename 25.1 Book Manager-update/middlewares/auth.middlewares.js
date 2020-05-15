var db = require("../db");

module.exports.requireAuth = function(req, res, next) {
    var id = req.signedCookies.userID;
    //console.log(id);
    if (!id) {
        res.redirect("/auth/login");
        return;
    }

    var user = db.get("list_user").find({ id: id }).value();
    //console.log(user);
    if (!user) {
        res.redirect("/auth/login");
        return;
    }
    res.locals.user = user;
    next();
};