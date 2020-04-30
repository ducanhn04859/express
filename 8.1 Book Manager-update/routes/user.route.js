var express = require("express");
var db = require("../db");
var shortid = require("shortid");
var router = express.Router();
db.defaults({ list_user: [] }).write();

router.get("/", function(request, response) {
    response.render("user/index");
});

router.get("/list", function(request, response) {
    response.render("user/list", {
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
    response.render("user/list", {
        users: matchUser,
    });
});

//detail by id
router.get("/detail/:id", function(request, response) {
    var id = request.params.id;

    var user_id = db.get("list_user").find({ id: id }).value();

    response.render("user/view", {
        users: user_id,
    });
});

//create
router.get("/create", function(request, response) {
    response.render("user/create");
});

router.post("/create", function(request, response) {
    //console.log(request.body);
    var id = shortid.generate();
    db.get("list_user")
        .push({ id: id, name: request.body.name, tel: request.body.tel })
        .write();
    response.redirect("/user");
});

//delete
router.get("/delete", function(request, response) {
    response.render("user/list_seach_dele", {
        users: db.get("list_user").value(),
    });
});

//delete by id
router.get("/delete/:id", function(request, response) {
    var id = request.params.id;
    db.get("list_user").remove({ id: id }).write();
    response.redirect("/user/delete");
});
//view update
router.get("/edit", function(request, response) {
    response.render("user/list_search_update", {
        users: db.get("list_user").value(),
    });
});
//view update
router.get("/edit/:id", function(request, response) {
    var id = request.params.id;
    var user_id = db.get("list_user").find({ id: id }).value();
    response.render("user/update", {
        users: user_id,
    });
});
//update by id
router.post("/edit/:id", function(request, response) {
    var id = request.params.id;
    console.log(request.body.des_u);
    console.log(request.body.title_u);
    db.get("list_user")
        .find({ id: id })
        .assign({ id: id, name: request.body.name_u, tel: request.body.tel_u })
        .write();
    response.redirect("/user/edit");
});

module.exports = router;