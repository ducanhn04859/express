var shortid = require("shortid");
var db = require("../db");
module.exports.index = function(request, response) {
    response.render("trans/index");
};

module.exports.list = function(request, response) {
    //console.log(user_name);
    response.render("trans/list", {
        trans: db.get("list_trans").value(),
        users: db.get("list_user").value(),
        books: db.get("list_book").value(),
    });
};

module.exports.get_cre = function(request, response) {
    response.render("trans/create", {
        users: db.get("list_user").value(),
        books: db.get("list_book").value(),
    });
};

module.exports.post_cre = function(request, response) {
    //console.log(request.body);
    var id_n = shortid.generate();
    var user_info = db
        .get("list_user")
        .value()
        .filter(function(user) {
            return (
                user.name.toLowerCase().indexOf(request.body.dD_user.toLowerCase()) !==
                -1
            );
        });
    var book_info = db
        .get("list_book")
        .value()
        .filter(function(user) {
            return (
                user.title.toLowerCase().indexOf(request.body.dD_book.toLowerCase()) !==
                -1
            );
        });
    //console.log(book_info[0]["id"]);
    db.get("list_trans")
        .push({
            id: id_n,
            userId: user_info[0]["id"],
            bookId: book_info[0]["id"],
            isComplete: false,
        })
        .write();
    response.redirect("/transaction");
};

module.exports.edit_id_get = function(request, response) {
    var id = request.params.id;
    var trans_id = db.get("list_trans").find({ id: id }).value();
    response.render("trans/update", {
        trans: trans_id,
        users: db.get("list_user").value(),
        books: db.get("list_book").value(),
    });
};

module.exports.edit_id_post = function(request, response) {
    var id = request.params.id;
    //console.log(request.body.des_u);
    var x = request.body.status;
    var status = false;
    if (x === "true") {
        status = true;
    } else {
        status = false;
    }
    //console.log(status);
    db.get("list_trans").find({ id: id }).assign({ isComplete: status }).write();
    response.redirect("/transaction/list");
};