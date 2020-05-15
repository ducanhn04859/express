var express = require("express");
var db = require("../db");
var shortid = require("shortid");

var router = express.Router();

router.get("/", function(request, response) {
    response.render("user/index", {
        users: db.get("list_user").value(),
    });
});

router.get("/search", function(request, response) {
    var q = request.query.q;
    var matchUser = db
        .get("list_user")
        .value()
        .filter(function(user) {
            return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
        });
    response.render("user/index", {
        users: matchUser,
    });
});

router.get("/create", function(request, response) {
    response.render("user/create");
});

router.post("/create", function(request, response) {
    //console.log(request.body);
    request.body.id = shortid.generate();
    db.get("list_user").push(request.body).write();
    response.redirect("/users-render");
});

router.get("/:id", function(request, response) {
    var id = request.params.id;

    var user = db.get("list_user").find({ id: id }).value();

    response.render("user/view", {
        user: user,
    });
});

module.exports = router;