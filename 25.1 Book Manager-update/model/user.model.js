var mongoose = require("mongoose");

var userSchema = new mongoose.Schema({
    name: String,
    tel: String,
    email: String,
    pass: String,
    isAdmin: Boolean,
    count_erro: Number,
    avatar: String,
});

var User = mongoose.model("User", userSchema, "users");
module.exports = User;