var db = require("../db");

module.exports.addToCart = function(req, res, next) {
    var bookID = req.params.bookId;
    var sessionId = req.signedCookies.sessionId;
    var info_user = db.get("sessions").find({ id: sessionId }).value();

    var count_total = 0;
    if (!sessionId) {
        res.redirect("/product");
        return;
    }

    var count = db
        .get("sessions")
        .find({ id: sessionId })
        .get("cart." + bookID, 0)
        .value();

    db.get("sessions")
        .find({ id: sessionId })
        .set("cart." + bookID, count + 1)
        .write();
    // đếm sản phẩm
    var value_items = Object.values(info_user.cart);
    for (var i = 0; i < value_items.length; i++) {
        count_total += value_items[i];
    }
    db.get("sessions")
        .find({ id: sessionId })
        .assign({ count: count_total })
        .write();
    res.redirect("/product");
    //console.log(db.get("sessions").find({ id: sessionId }).value());
};

module.exports.list = function(req, res) {
    var sessionId = req.signedCookies.sessionId;
    var allBook = db.get("list_book").value();
    var x = db.get("sessions").find({ id: sessionId }).value().cart;
    res.render("cart/index", {
        books: x,
        book_item: allBook,
    });
};

module.exports.addBookToCart = function(req, res, next) {
    var bookID = req.params.bookId;
    var sessionId = req.signedCookies.sessionId;
    var info_user = db.get("sessions").find({ id: sessionId }).value();
    var count_total = 0;
    if (!sessionId) {
        res.redirect("/product");
        return;
    }

    var count = db
        .get("sessions")
        .find({ id: sessionId })
        .get("cart." + bookID, 0)
        .value();

    db.get("sessions")
        .find({ id: sessionId })
        .set("cart." + bookID, count + 1)
        .write();
    // đếm sản phẩm
    var value_items = Object.values(info_user.cart);
    for (var i = 0; i < value_items.length; i++) {
        count_total += value_items[i];
    }
    db.get("sessions")
        .find({ id: sessionId })
        .assign({ count: count_total })
        .write();
    res.redirect("/product");
    //console.log(db.get("sessions").find({ id: sessionId }).value());
};