// var db = require("../db");
// db.defaults({ sessions: [] });
var Product = require("../../model/product.model");
module.exports.index = async function(req, res) {
    var products = await Product.find();
    res.json(products);
    console.log(products);
};

module.exports.post_index = async function(req, res) {
    var products = await Product.create(req.body);
    res.json(products);
};