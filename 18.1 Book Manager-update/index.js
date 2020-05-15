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

app.listen(port, function() {
    console.log("Server listening on port " + port);
});

// const mailgun = require("mailgun-js");
// var api_key = process.env.API_KEY;
// const DOMAIN = "email-demo-ec66a.web.app";
// const mg = mailgun({ apiKey: api_key, domain: DOMAIN });
// const data = {
//     from: "Excited User <ducanhn130897@gmail.com>",
//     to: "anhndse04859@fpt.edu.com",
//     subject: "Hello",
//     text: "Testing some Mailgun awesomness!",
//     html: "<h1>Testing some Mailgun awesomness</h1>",
// };
// mg.messages().send(data, function(error, body) {
//     console.log(body);
// });