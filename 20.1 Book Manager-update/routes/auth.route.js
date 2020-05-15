var express = require("express");
var db = require("../db");
var router = express.Router();
var controller = require("../controller/auth.controller");

db.defaults({ list_user: [] }).write();

router.get("/login", controller.get_login);

router.post("/login", controller.post_login);

module.exports = router;