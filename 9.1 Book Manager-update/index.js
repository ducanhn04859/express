var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var bookRoute = require("./routes/book.route");
var userRoute = require("./routes/user.route");
var transRoute = require("./routes/transaction.route");

var port = 3000;

app.set("view engine", "pug");
app.set("views", "./views");
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.get("/", function(request, response) {
    response.render("index", {
        name: "Welcome to Book Manager",
    });
});

app.use("/book", bookRoute);
app.use("/user", userRoute);
app.use("/transaction", transRoute);

app.listen(port, function() {
    console.log("Server listening on port " + port);
});