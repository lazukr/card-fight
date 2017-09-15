// required modules
var express = require('express'),
    app = express(),
    http = require('http'),
    server = http.createServer(app),
    io = require('socket.io')(server),
    logger = require('./logger'),
    EVENT = require('./game-state-consts').eventList,
    Game = require('./game');

app.use('/js', express.static(__dirname + '/public/js'));
app.use('/assets', express.static(__dirname + '/public/assets'));
app.use('/', function(req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

game = new Game();

io.on('connection', function(socket) {
    logger.info('Client %s has connected', socket.id);

    socket.on('queue', function() {
        logger.info('Client %s is now waiting in queue for matchmaking.', socket.id);
        game.update(EVENT.ONQUEUE, socket);
    });


    socket.on('disconnect', function() {
        logger.info('Client %s has disconnected from the game', socket.id);
        game.update(EVENT.ONPLAYERDISCONNECT);
    });


});

server.listen(8101, function() {
    logger.info('Server listening on port 8101');
});



