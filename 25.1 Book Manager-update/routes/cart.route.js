var express = require("express");
var router = express.Router();
var controller = require("../controller/cart.controller");

//router.get("/add/:productId", controller.addToCart);
router.get("/items", controller.list);
router.get("/add/:bookId", controller.addBookToCart);

module.exports = router;