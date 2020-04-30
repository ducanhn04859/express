var express = require("express");
var db = require("../db");
var shortid = require("shortid");
var router = express.Router();
db.defaults({ list_book: [] }).write();

router.get("/", function(request, response) {
    response.render("book/index");
});

router.get("/list", function(request, response) {
    response.render("book/list", {
        books: db.get("list_book").value(),
    });
});

router.get("/edit", function(request, response) {
    response.render("book/list_search_update", {
        books: db.get("list_book").value(),
    });
});

router.get("/delete", function(request, response) {
    response.render("book/list_seach_dele", {
        books: db.get("list_book").value(),
    });
});

router.get("/search", function(request, response) {
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
});

router.get("/create", function(request, response) {
    response.render("book/create");
});

router.post("/create", function(request, response) {
    //console.log(request.body);
    var id = shortid.generate();
    db.get("list_book")
        .push({ id: id, title: request.body.title, des: request.body.des })
        .write();
    response.redirect("/book");
});

//detail by id
router.get("/detail/:id", function(request, response) {
    var id = request.params.id;

    var book_id = db.get("list_book").find({ id: id }).value();

    response.render("book/view", {
        book: book_id,
    });
});

//delete by id
router.get("/delete/:id", function(request, response) {
    var id = request.params.id;
    db.get("list_book").remove({ id: id }).write();
    response.redirect("/book/delete");
});

//view update
router.get("/edit/:id", function(request, response) {
    var id = request.params.id;
    var book_id = db.get("list_book").find({ id: id }).value();
    response.render("book/update", {
        book: book_id,
    });
});
//update by id
router.post("/edit/:id", function(request, response) {
    var id = request.params.id;
    console.log(request.body.des_u);
    console.log(request.body.title_u);
    db.get("list_book")
        .find({ id: id })
        .assign({ id: id, title: request.body.title_u, des: request.body.des_u })
        .write();
    response.redirect("/book/edit");
});

module.exports = router;