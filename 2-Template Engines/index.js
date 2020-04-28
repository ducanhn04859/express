var express = require('express');
var app = express();
var port = 3000;

app.set('view engine', 'pug');
app.set('views', './views');

app.get('/', function(request, response) {
    // Tham số thứ 1 :index là tên path - đường dẫn muốn dùng(không cần .pug)
    // Tham số thứ 2 : object bao gồm key và value là tên biến và giá trị biến
    response.render('index', {
        name: 'Duc Anh Nguyen SE04859'
    });
});

app.get('/users', (request, response) => {
    response.render('users/index', {
        users: [
            { id: 1, name: 'Duc Anh' },
            { id: 2, name: 'Duy Anh' }
        ]
    });
});

// /todos trả về một danh sách các việc phải làm
app.get('/todos', (request, response) => {
    response.send('<ul> <li>Đi chợ</li> <li>Nấu cơm</li><li>Rửa bát</li><li>Học code tại CodersX</li></ul>');
});

app.listen(port, function() {
    console.log('Server listening on port ' + port);
});