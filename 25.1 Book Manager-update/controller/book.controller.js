var db = require("../db");
var shortid = require("shortid");
var Book = require("../model/book.model");

module.exports.index = function(request, response) {
    response.render("book/index");
};

module.exports.list = function(request, response) {
    // var page = parseInt(request.query.page) || 1; //n
    // var perPgae = 8; //x
    // var total_book = db.get("list_book").value().length;
    // var drop = (page - 1) * perPgae;
    // var total_page = Math.ceil(total_book / perPgae);
    // var current_page = request.query.page;
    // //console.log(current_page);
    // if (current_page == undefined || current_page == NaN) {
    //     current_page = 1;
    // }
    // response.render("book/list", {
    //     books: db.get("list_book").drop(drop).take(perPgae).value(),
    //     numpage: total_page,
    //     current_page: current_page,
    // });
    Book.find().then(function(Books) {
        response.render("book/list", {
            books: Books,
        });
    });
};

module.exports.edit = function(request, response) {
    response.render("book/list_search_update", {
        books: db.get("list_book").value(),
    });
};

module.exports.delete = function(request, response) {
    response.render("book/list_seach_dele", {
        books: db.get("list_book").value(),
    });
};

module.exports.search = function(request, response) {
    var q = request.query.q;
    var matchUser = db
        .get("list_book")
        .value()
        .filter(function(user) {
            return user.title.toLowerCase().indexOf(q.toLowerCase()) !== -1;
        });
    response.render("book/list", {
        books: matchUser,
    });
};

module.exports.get_cre = function(request, response) {
    response.render("book/create");
};

module.exports.post_cre = function(request, response) {
    //console.log(request.body);
    var id = shortid.generate();
    db.get("list_book")
        .push({ id: id, title: request.body.title, des: request.body.des })
        .write();
    response.redirect("/book/list");
};

module.exports.detail_id = function(request, response) {
    var id = request.params.id;

    var book_id = db.get("list_book").find({ id: id }).value();

    response.render("book/view", {
        book: book_id,
    });
};

module.exports.delete_id = function(request, response) {
    var id = request.params.id;
    db.get("list_book").remove({ id: id }).write();
    response.redirect("/book/delete");
};

module.exports.edit_id_get = function(request, response) {
    var id = request.params.id;
    var book_id = db.get("list_book").find({ id: id }).value();
    response.render("book/update", {
        book: book_id,
    });
};

module.exports.edit_id_post = function(request, response) {
    var id = request.params.id;
    //console.log(request.body.des_u);
    //console.log(request.body.title_u);
    db.get("list_book")
        .find({ id: id })
        .assign({ id: id, title: request.body.title_u, des: request.body.des_u })
        .write();
    response.redirect("/book/edit");
};