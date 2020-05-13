var express = require("express");
var db = require("../db");
var router = express.Router();
var controller = require("../controller/book.controller");

db.defaults({ list_book: [] });

router.get("/", controller.index);

router.get("/list", controller.list);

router.get("/edit", controller.edit);

router.get("/delete", controller.delete);

router.get("/search", controller.search);

router.get("/create", controller.get_cre);

router.post("/create", controller.post_cre);

//detail by id
router.get("/detail/:id", controller.detail_id);

//delete by id
router.get("/delete/:id", controller.delete_id);

//view update
router.get("/edit/:id", controller.edit_id_get);
//update by id
router.post("/edit/:id", controller.edit_id_post);

module.exports = router;