var shortid = require("shortid");
var db = require("../db");
module.exports.index = function(request, response) {
    response.render("trans/index");
};

module.exports.list = function(request, response) {
    var id = request.signedCookies.userID;
    var user = db.get("list_user").find({ id: id }).value();
    var total_trans = db.get("list_trans").filter({ userId: id }).value().length;
    var page = parseInt(request.query.page) || 1; //n
    var perPgae = 10; //x
    var drop = (page - 1) * perPgae;
    var total_page = Math.ceil(total_trans / perPgae);
    var current_page = request.query.page;
    //console.log(total_trans);
    if (current_page == undefined || current_page == NaN) {
        current_page = 1;
    }
    if (user.isAdmin != true) {
        response.render("trans/list", {
            trans: db
                .get("list_trans")
                .filter({ userId: id })
                .drop(drop)
                .take(perPgae)
                .value(),
            users: db.get("list_user").value(),
            books: db.get("list_book").value(),
            numpage: total_page,
            current_page: current_page,
        });
    } else {
        response.render("trans/list", {
            trans: db.get("list_trans").value(),
            users: db.get("list_user").value(),
            books: db.get("list_book").value(),
        });
    }
    //console.log(list_user);
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
    response.redirect("/transaction/list");
};

module.exports.edit_id_get = function(request, response) {
    var id = request.params.id;
    var error = [];
    var ar_id = db.get("list_trans").map("id").value();
    var check_id = ar_id.filter(function(x) {
        return x == id;
    });
    //console.log(check_id);
    var trans_id = db.get("list_trans").find({ id: id }).value();
    if (check_id.length < 1) {
        error.push("ID is not exist! Check ID again.");
    }
    if (error.length) {
        response.render("trans/list", {
            errors: error,
            trans: db.get("list_trans").value(),
            users: db.get("list_user").value(),
            books: db.get("list_book").value(),
        });
        return;
    }

    response.render("trans/update", {
        trans: trans_id,
        users: db.get("list_user").value(),
        books: db.get("list_book").value(),
    });
    //console.log(trans_id);
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