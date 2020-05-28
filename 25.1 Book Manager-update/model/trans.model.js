var mongoose = require("mongoose");

var transSchema = new mongoose.Schema({
    userId: String,
    bookId: String,
    isComplete: Boolean,
});

var Trans = mongoose.model("Trans", transSchema, "trans");
module.exports = Trans;