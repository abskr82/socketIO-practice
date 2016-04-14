var express = require('express');
var app = express();
var path = require('path');
var server = require('http').createServer(app);
var io = require('socket.io')(server);
app.set('views',path.join(__dirname,'views'));
app.set('view engine', 'ejs');


app.use(express.static('./public'));

app.get('/', function(req, res,next) {
    // res.sendFile(__dirname + '/index.html');
    res.render("index");
});

io.on('connection', function(client) {
    console.log('Client connected...');

    client.on('join', function(data) {
        console.log(data);
        // client.emit('messages', 'Hello from server');
    });

    client.on('messages', function(data) {
       client.emit('broad', data);
       client.broadcast.emit('broad',data);
    });

});


server.listen(7000);
