var express = require('express');
var app = express();
var port = 3000;

app.get('/', function(request, response) {
    response.send('<h1>Hello Duc Anh, Welcome to Express!</h1>');
});

// /todos trả về một danh sách các việc phải làm
app.get('/todos', (request, response) => {
    response.send('<ul> <li>Đi chợ</li> <li>Nấu cơm</li><li>Rửa bát</li><li>Học code tại CodersX</li></ul>');
});

app.listen(port, function() {
    console.log('Server listening on port ' + port);
});