require("dotenv").config();
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var SESSTION_SECRET = process.env.SESSTION_SECRET; // doc SESSTION_SECRET tu file .env
var bookRoute = require("./routes/book.route");
var userRoute = require("./routes/user.route");
var transRoute = require("./routes/transaction.route");
var authRoute = require("./routes/auth.route");
var productRoute = require("./routes/product.route");

var authMiddlewares = require("./middlewares/auth.middlewares");

var port = 3000;

app.set("view engine", "pug");
app.set("views", "./views");
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cookieParser(SESSTION_SECRET));
app.use(express.static("public"));

app.get("/", function(request, response) {
    response.render("index", {
        name: "Welcome to Book Manager",
    });
});

app.use("/book", authMiddlewares.requireAuth, bookRoute);
//app.use("/book", bookRoute);
app.use("/user", authMiddlewares.requireAuth, userRoute);
app.use("/transaction", authMiddlewares.requireAuth, transRoute);
//app.use("/transaction", transRoute);
app.use("/auth", authRoute);
app.use("/product", productRoute);

app.listen(port, function() {
    console.log("Server listening on port " + port);
});