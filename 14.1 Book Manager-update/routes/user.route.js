var express = require("express");
var db = require("../db");
var router = express.Router();
var controller = require("../controller/user.controller");
var validate = require("../validate/user.validate");

db.defaults({ list_user: [] }).write();

router.get("/", validate.count_cookie, controller.index);

router.get("/cookie", function(request, response, next) {
    response.cookie("user-id", 12345);
    response.send("Heluu");
});
router.get("/list", validate.count_cookie, controller.list);

router.get("/search", validate.count_cookie, controller.search);

//detail by id
router.get("/detail/:id", validate.count_cookie, controller.detail_id);

//create
router.get("/create", validate.count_cookie, controller.get_cre);

router.post(
    "/create",
    validate.count_cookie,
    validate.postCreate,
    controller.post_cre
);

//delete
router.get("/delete", validate.count_cookie, controller.delete);

//delete by id
router.get("/delete/:id", validate.count_cookie, controller.delete_id);
//view update
router.get("/edit", validate.count_cookie, controller.edit);
//view update
router.get("/edit/:id", validate.count_cookie, controller.edit_id_get);
//update by id
router.post("/edit/:id", validate.count_cookie, controller.edit_id_post);

module.exports = router;