var express = require("express");
var app = express();
var port = 3000;

app.set('view engine', 'pug');
app.set('views', './views');

var list_user = [
    { id: 1, name: 'Duy Anh' },
    { id: 2, name: 'Duc Anh' },
    { id: 3, name: 'Huy Anh' },
    { id: 4, name: 'Minh Anh' }
];

app.get('/', function(request, response) {
    response.render('index', {
        name: 'Bai 3: Query parameter'
    });
});


app.get('/todos', (request, response) => {
    response.send('<ul> <li>Đi chợ</li> <li>Nấu cơm</li><li>Rửa bát</li><li>Học code tại CodersX</li></ul>');
});

app.get('/todos-render', function(request, response) {
    response.render('user/index', {
        users: list_user
    });
});

app.get('/todos-render/search', function(request, response) {
    var q = request.query.q;
    var matchUser = list_user.filter(function(user) {
        return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    });
    response.render('user/index', {
        users: matchUser
    });

});



app.listen(port, function() {
    console.log('Server listening on port ' + port);
});