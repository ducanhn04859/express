// var db = require("../db");
// db.defaults({ sessions: [] });
var Product = require("../model/product.model");
module.exports.index = function(req, res) {
    // var page = parseInt(req.query.page) || 1; //n
    // var perPgae = 8; //x
    // var start = (page - 1) * perPgae;
    // var end = page * perPgae;
    // var drop = (page - 1) * perPgae;
    // var total_page = Math.ceil(100 / perPgae);
    // var current_page = req.query.page;
    // res.render("product/index", {
    //     //Cach 1
    //     //products: db.get("product_list").value().slice(start, end),
    //     //Cach2
    //     products: db.get("product_list").drop(drop).take(perPgae).value(),
    //     numpage: total_page,
    //     current_page: current_page,
    // });
    Product.find().then(function(products) {
        res.render("product/index", {
            products: products,
        });
    });
};