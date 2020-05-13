var db = require("../db");
module.exports = function(req, res, next) {
    var sessionId = req.signedCookies.sessionId;
    var count = db.get("sessions").find({ id: sessionId }).value().count;
    res.locals.count = count;
    next();
};