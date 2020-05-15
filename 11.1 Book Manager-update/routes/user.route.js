var express = require("express");
var db = require("../db");
var router = express.Router();
var controller = require("../controller/user.controller");

db.defaults({ list_user: [] }).write();

router.get("/", controller.index);

router.get("/list", controller.list);

router.get("/search", controller.search);

//detail by id
router.get("/detail/:id", controller.detail_id);

//create
router.get("/create", controller.get_cre);

router.post("/create", controller.post_cre);

//delete
router.get("/delete", controller.delete);

//delete by id
router.get("/delete/:id", controller.delete_id);
//view update
router.get("/edit", controller.edit);
//view update
router.get("/edit/:id", controller.edit_id_get);
//update by id
router.post("/edit/:id", controller.edit_id_post);

module.exports = router;