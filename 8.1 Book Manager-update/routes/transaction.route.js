var express = require("express");
var db = require("../db");
var shortid = require("shortid");
var router = express.Router();
db.defaults({ list_trans: [] }).write();

router.get("/", function(request, response) {
    response.render("trans/index");
});

router.get("/list", function(request, response) {
    //console.log(user_name);
    response.render("trans/list", {
        trans: db.get("list_trans").value(),
        users: db.get("list_user").value(),
        books: db.get("list_book").value(),
    });
});
// show and pull data into page /create
router.get("/create", function(request, response) {
    response.render("trans/create", {
        users: db.get("list_user").value(),
        books: db.get("list_book").value(),
    });
});
//create transaction
router.post("/create", function(request, response) {
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
        })
        .write();
    response.redirect("/transaction");
});
module.exports = router;