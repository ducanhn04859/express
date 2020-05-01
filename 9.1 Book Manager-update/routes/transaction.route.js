var express = require("express");
var db = require("../db");
var router = express.Router();
var controller = require("../controller/trans.controller");
db.defaults({ list_trans: [] }).write();

router.get("/", controller.index);

router.get("/list", controller.list);

// show and pull data into page /create
router.get("/create", controller.get_cre);

//create transaction
router.post("/create", controller.post_cre);

//view update
router.get("/edit/:id", controller.edit_id_get);
//update by id
router.post("/edit/:id", controller.edit_id_post);

module.exports = router;