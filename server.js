// required modules
var express = require('express'),
    app = express(),
    http = require('http'),
    server = http.createServer(app),
    io = require('socket.io')(server),
    logger = require('./logger'),
    EVENT = require('./game/game-state-consts').eventList,
    Game = require('./game/game');

app.use('/js', express.static(__dirname + '/public/js'));
app.use('/assets', express.static(__dirname + '/public/assets'));
app.use('/', function(req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

game = new Game();

io.on('connection', function(socket) {
    logger.info('Client %s has connected', socket.id);

    socket.on('queue', function() {
        logger.info('Client %s is attempting to join queue.', socket.id);
        game.update(EVENT.ONQUEUE, socket);
    });


    socket.on('disconnect', function() {
        logger.info('Client %s has disconnected', socket.id);
        //logger.debug('%s %s', socket.id, game.playerList);

        var playerList = game.playerList;

        // check to make sure disconnected socket is part of the game queue list
        // else ignore
        playerList.forEach(function(player) {
            if (player.socket == socket) {
                logger.debug('A match has been found, %s', socket.id);
                game.update(EVENT.ONPLAYERDISCONNECT);
            }
        });
    });
});

server.listen(8101, function() {
    logger.info('Server listening on port 8101');
});



