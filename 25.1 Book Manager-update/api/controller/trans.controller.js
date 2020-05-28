//var db = require("../db");
var Trans = require("../../model/trans.model");
var Users = require("../../model/user.model");
var Books = require("../../model/book.model");

module.exports.index = async function(request, response) {
    //var id = request.signedCookies.userID;
    // var user = await Users.find({
    //     name: id,
    // });
    // console.log(await Users.find({}));
    response.render("trans/api", {
        trans: await Trans.find({}),
        users: await Users.find({}),
        books: await Books.find({}),
    });
    // if (user[0]["isAdmin"] != true) {
    //     response.render("trans/api.list", {
    //         trans: await Trans.find({ userId: id }),
    //         users: await Users.find({}),
    //         books: await Books.find({}),
    //     });
    // } else {
    //     response.render("trans/api.list", {
    //         trans: await Trans.find({}),
    //         users: await Users.find({}),
    //         books: await Books.find({}),
    //     });
    // }
    //console.log(list_user);
};