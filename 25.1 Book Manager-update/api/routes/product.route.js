var express = require("express");
//var db = require("../db");
var router = express.Router();
//var controller = require("../../controller/product.controller");
var controller = require("../controller/project.controller");
//db.defaults({ product_list: [], sessions: [] }).write();

router.get("/", controller.index);
router.post("/", controller.post_index);
module.exports = router;