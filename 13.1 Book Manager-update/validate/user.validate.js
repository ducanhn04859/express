module.exports.postCreate = function(request, response, next) {
    var error = [];
    var name_input = request.body.name;
    var ar_name_input = name_input.split("");
    if (!request.body.name) {
        error.push("Name is required.");
    }
    if (!request.body.tel) {
        error.push("Phone is required.");
    }
    if (ar_name_input.length > 30) {
        error.push("User Name is not more than 30 characters");
    }
    if (error.length) {
        response.render("user/create", {
            errors: error,
            values: request.body,
        });
        return;
    }
    next();
};