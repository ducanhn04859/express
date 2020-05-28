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
var cartRoute = require("./routes/cart.route");
var mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URL);

var apiProductRoute = require("./api/routes/product.route");
var apiAuthRoute = require("./api/routes/auth.route");
var apiTransRoute = require("./api/routes/trans.route");
var apiUserRoute = require("./api/routes/user.route");

var authMiddlewares = require("./middlewares/auth.middlewares");
var sessionMiddlewares = require("./middlewares/session.middleware");
var countIteamMiddlewar = require("./middlewares/countIteam.middleware");
var port = 3000;

app.set("view engine", "pug");
app.set("views", "./views");
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cookieParser(SESSTION_SECRET));
app.use("/api/products", apiProductRoute);
app.use("/api/login", apiAuthRoute);
app.use("/api/trans", apiTransRoute);
app.use("/api/users", apiUserRoute);

app.use(express.static("public"));
app.use(sessionMiddlewares);
app.use(countIteamMiddlewar);

app.get("/", function(request, response) {
    response.render("index", {
        name: "Welcome to Book Manager",
    });
});

app.use("/book", sessionMiddlewares, countIteamMiddlewar, bookRoute);
//app.use("/book", bookRoute);
app.use(
    "/user",
    sessionMiddlewares,
    countIteamMiddlewar,
    authMiddlewares.requireAuth,
    userRoute
);
app.use(
    "/transaction",
    sessionMiddlewares,
    countIteamMiddlewar,
    authMiddlewares.requireAuth,
    transRoute
);
//app.use("/transaction", transRoute);
app.use("/auth", sessionMiddlewares, countIteamMiddlewar, authRoute);
app.use("/product", sessionMiddlewares, countIteamMiddlewar, productRoute);
//app.use("/product", productRoute);
app.use("/cart", sessionMiddlewares, countIteamMiddlewar, cartRoute);
app.listen(port, function() {
    console.log("Server listening on port " + port);
});