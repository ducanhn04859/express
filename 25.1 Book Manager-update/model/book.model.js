var mongoose = require("mongoose");

var bookSchema = new mongoose.Schema({
    title: String,
    des: String,
    image: String,
});

var Book = mongoose.model("Book", bookSchema, "list_book");
module.exports = Book;