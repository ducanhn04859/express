//var db = require("../db");
var User = require("../../model/user.model");
var shortid = require("shortid");
var md5 = require("md5");
var bcrypt = require("bcrypt");
var cloudinary = require("cloudinary");
cloudinary.config({
    cloud_name: process.env.CLOUND_NAME,
    api_key: process.env.API_CLOUND,
    api_secret: process.env.API_CLOUND_SECRET,
});
module.exports.index = function(request, response) {
    response.render("user/api/index");
};

module.exports.list = async function(request, response) {
    var error = [];
    response.render("user/api/api-list", {
        errors: error,
        users: await User.find({}),
    });
};

module.exports.search = async function(request, response) {
    var q = request.query.q;
    var allUser = await User.find({});
    var matchUser = allUser.find(function(user) {
        return user["name"].toLowerCase().indexOf(q.toLowerCase()) !== -1;
    });
    var arr_matuser = [];
    arr_matuser.push(matchUser);
    if (matchUser) {
        response.render("user/api/api-list", {
            users: arr_matuser,
        });
    } else {
        var error = ["Not found user"];
        response.render("user/api/api-list", {
            errors: error,
            users: await User.find({}),
        });
    }
};

module.exports.detail_id = async function(request, response) {
    var id = request.params.id;
    var user = await User.find({ _id: id });
    var error = [];
    if (user.length < 1) {
        error.push("ID is not exist! Check ID again.");
    }
    if (error.length) {
        response.render("user/api/api-list", {
            errors: error,
            users: await User.find({}),
        });
        response.redirect("/api/users");
        return;
    }

    response.render("user/api/api-view", {
        users: user,
    });
};

module.exports.get_cre = function(request, response) {
    //console.log(request.cookies);
    response.render("user/api/api-create");
};

module.exports.post_cre = async function(request, response) {
    //console.log(request.body);
    var id = shortid.generate();
    //var hashpass = md5(request.body.pass);
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(request.body.pass, salt);
    cloudinary.uploader.upload(request.file.path, async function(result) {
        //console.log(result.url);
        var x = await User.create({
            name: request.body.name,
            tel: request.body.tel,
            email: request.body.email,
            pass: hash,
            isAdmin: false,
            avatar: result.url,
            count_erro: 0,
        });
        response.redirect("/api/users/list");
    });
};

module.exports.delete = async function(request, response) {
    response.render("user/api/api-list_seach_dele", {
        users: await User.find({}),
    });
};

module.exports.delete_id = async function(request, response) {
    var id = request.params.id;
    await User.deleteOne({ _id: id });
    response.redirect("/api/users/delete");
};

module.exports.edit = async function(request, response) {
    response.render("user/api/api-list_search_update", {
        users: await User.find({}),
    });
};

module.exports.edit_id_get = async function(request, response) {
    var id = request.params.id;
    //var user_id = db.get("list_user").find({ id: id }).value();
    var user_id = await User.find({ _id: id });
    response.render("user/api/api-update", {
        users: user_id,
    });
};

module.exports.edit_id_post = async function(request, response) {
    var id = request.params.id;
    console.log(request.file);
    // cloudinary.uploader.upload(request.file.path, async function(result) {
    //     //console.log(result.url);
    //     var filter = { _id: id };
    //     var update = {
    //         name: request.body.name,
    //         tel: request.body.tel,
    //         email: request.body.email,
    //         avatar: result.url,
    //     };
    //     await User.findOneAndUpdate(filter, update);
    //     response.redirect("/api/users/list/edit");
    // });
};