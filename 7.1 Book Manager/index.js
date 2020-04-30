var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var low = require("lowdb");
var FileSync = require("lowdb/adapters/FileSync");
var adapter = new FileSync("db.json"); // luu data tai bd.json
var shortid = require("shortid");

var port = 3000;

app.set("view engine", "pug");
app.set("views", "./views");
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

db = low(adapter);
// Set some defaults (required if your JSON file is empty)
db.defaults({ list_book: [] }).write();

app.get("/", function(request, response) {
    response.render("index", {
        name: "Welcome to Book Manager",
    });
});

app.get("/book", function(request, response) {
    response.render("book/index", {
        books: db.get("list_book").value(),
    });
});

app.get("/book/search", function(request, response) {
    var q = request.query.q;
    var matchUser = db
        .get("list_book")
        .value()
        .filter(function(user) {
            return user.title.toLowerCase().indexOf(q.toLowerCase()) !== -1;
        });
    response.render("book/index", {
        books: matchUser,
    });
});

app.get("/book/create", function(request, response) {
    response.render("book/create");
});

app.post("/book/create", function(request, response) {
    //console.log(request.body);
    var id = shortid.generate();
    db.get("list_book")
        .push({ id: id, title: request.body.title, des: request.body.des })
        .write();
    response.redirect("/book");
});

//detail by id
app.get("/book/:id", function(request, response) {
    var id = request.params.id;

    var book_id = db.get("list_book").find({ id: id }).value();

    response.render("book/view", {
        book: book_id,
    });
});

//delete by id
app.get("/book/:id/delete", function(request, response) {
    var id = request.params.id;
    db.get("list_book").remove({ id: id }).write();
    response.redirect("/book");
});

//view update
app.get("/book/:id/update", function(request, response) {
    var id = request.params.id;
    var book_id = db.get("list_book").find({ id: id }).value();
    response.render("book/update", {
        book: book_id,
    });
});
//update by id
app.post("/book/:id/update", function(request, response) {
    var id = request.params.id;
    console.log(request.body.des_u);
    console.log(request.body.title_u);
    db.get("list_book")
        .find({ id: id })
        .assign({ id: id, title: request.body.title_u, des: request.body.des_u })
        .write();
    response.redirect("/book");
});

app.listen(port, function() {
    console.log("Server listening on port " + port);
});