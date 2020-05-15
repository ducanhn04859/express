var db = require("../db");
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
    response.render("user/index");
};

module.exports.list = function(request, response) {
    var error = [];
    response.render("user/list", {
        errors: error,
        users: db.get("list_user").value(),
    });
};

module.exports.search = function(request, response) {
    var q = request.query.q;
    var matchUser = db
        .get("list_user")
        .value()
        .filter(function(user) {
            return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
        });
    response.render("user/list", {
        users: matchUser,
    });
};

module.exports.detail_id = function(request, response) {
    var id = request.params.id;
    var user = db.get("list_user").find({ id: id }).value();
    //console.log(user_id);
    var error = [];
    if (user.id.length < 1) {
        error.push("ID is not exist! Check ID again.");
    }
    if (error.length) {
        response.render("user/list", {
            errors: error,
            users: db.get("list_user").value(),
        });
        //response.redirect("/user/list");
        return;
    }

    response.render("user/view", {
        users: user,
    });
};

module.exports.get_cre = function(request, response) {
    //console.log(request.cookies);
    response.render("user/create");
};

module.exports.post_cre = function(request, response) {
    //console.log(request.body);
    var id = shortid.generate();
    //var hashpass = md5(request.body.pass);
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(request.body.pass, salt);
    /* dạng file : public/uploads/... 
                            Để loại bỏ "public/":
                            - tách chuỗi dùng split("/")
                            - Bỏ item đầu tiên slice(1)
                            - gộp chuỗi lại join('/')*/
    var avatar = request.file.path.split("/").slice(1).join("/");
    cloudinary.uploader.upload(request.file.path, function(result) {
        //console.log(result.url);
        db.get("list_user")
            .push({
                id: id,
                name: request.body.name,
                tel: request.body.tel,
                email: request.body.email,
                pass: hash,
                isAdmin: false,
                avatar: result.url,
                count_erro: 0,
            })
            .write();
        response.redirect("/user/list");
    });
};

module.exports.delete = function(request, response) {
    response.render("user/list_seach_dele", {
        users: db.get("list_user").value(),
    });
};

module.exports.delete_id = function(request, response) {
    var id = request.params.id;
    db.get("list_user").remove({ id: id }).write();
    response.redirect("/user/delete");
};

module.exports.edit = function(request, response) {
    response.render("user/list_search_update", {
        users: db.get("list_user").value(),
    });
};

module.exports.edit_id_get = function(request, response) {
    var id = request.params.id;
    var user_id = db.get("list_user").find({ id: id }).value();
    response.render("user/update", {
        users: user_id,
    });
};

module.exports.edit_id_post = function(request, response) {
    var id = request.params.id;
    //console.log(request.body.des_u);
    //console.log(request.body.title_u);
    db.get("list_user")
        .find({ id: id })
        .assign({ id: id, name: request.body.name_u, tel: request.body.tel_u })
        .write();
    response.redirect("/user/edit");
};