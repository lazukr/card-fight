var express = require('express'),
    app = express(),
    http = require('http'),
    server = http.createServer(app),
    io = require('socket.io')(server),
    winston = require('winston');

app.use('/js', express.static(__dirname + '/public/js'));
app.use('/assets', express.static(__dirname + '/public/assets'));
app.use('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

const logger = new (winston.Logger)({
    transports: [
        new (winston.transports.Console)({
            colorize: true
        })
    ]
});

logger.level = 'debug';

/*var match = {
    p1: {
        id: null,
        board: [],
        deck: []
    },
    p2: {
        id: null,
        board: [],
        deck: []
    }
};*/

match = null;

io.on('connection', function(socket) {
    logger.info('Client %s has connected', socket.id);

    socket.on('ready', function() {
        if (match == null) {
            match = game(socket);
            logger.info('Game initialized');
            logger.info('Current players: %s', match.getPlayers());
        } else if (match.getPlayers().length < 2) {
            match.addPlayers(socket);
            logger.info('Current players: %s', match.getPlayers());
            match.shuffleStage();
        }
    });

});


server.listen(8101, function() {
    logger.info('Server listening on port 8101');
});

function game(player0) {

    var matchData = [{
        socket: player0,
        board: null, 
        deck: null,
    }];

    return {
        getPlayers: function() {
            var playerids = [];

            matchData.forEach(function(player) {
                playerids.push(player.socket.id);
            });

            return playerids;
        },

        addPlayers: function(player) {
            matchData.push({
                socket: player,
                board: null,
                deck: null,
            })
        },

        shuffleStage: function() {

            var colours = [0, 2];

            matchData.forEach(function(player, index) {
                player.colour = colours[index];
                player.socket.emit('ready-reply' ,player.colour);
            })
        }
    }
}