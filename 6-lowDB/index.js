var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var low = require("lowdb");
var FileSync = require('lowdb/adapters/FileSync')
var adapter = new FileSync('db.json') // luu data tai bd.json

var port = 3000;

app.set('view engine', 'pug');
app.set('views', './views');
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

db = low(adapter);
// Set some defaults (required if your JSON file is empty)
db.defaults({ list_user: [] })
    .write()


app.get('/', function(request, response) {
    response.render('index', {
        name: 'Bai 6: LowDB'
    });
});


app.get('/todos', (request, response) => {
    response.send('<ul> <li>Đi chợ</li> <li>Nấu cơm</li><li>Rửa bát</li><li>Học code tại CodersX</li></ul>');
});

app.get('/users-render', function(request, response) {
    response.render('user/index', {
        users: db.get('list_user').value()
    });
});

app.get('/users-render/search', function(request, response) {
    var q = request.query.q;
    var matchUser = db.get('list_user').value().filter(function(user) {
        return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    });
    response.render('user/index', {
        users: matchUser
    });
});

app.get('/users-render/create', function(request, response) {
    response.render('user/create');
});

app.post('/users-render/create', function(request, response) {
    console.log(request.body);
    db.get('list_user').push(request.body).write();
    response.redirect('/users-render');
});

app.listen(port, function() {
    console.log('Server listening on port ' + port);
});