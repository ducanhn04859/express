var express = require("express");
var bodyParser = require("body-parser");
var port = 3000;

var userRoute = require("./routes/users-render.route");

var app = express();
app.set("view engine", "pug");
app.set("views", "./views");

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.get("/", function(request, response) {
    response.render("index", {
        name: "Bài 8 - Express Router",
    });
});

app.use("/users-render", userRoute);

app.listen(port, function() {
    console.log("Server listening on port " + port);
});