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

match = game();

io.on('connection', function(socket) {
    logger.info('Client %s has connected', socket.id);

    socket.on('ready-shuffle', function() {
        if (match.getLength() == 0) {
            match.addPlayers(socket);
            logger.info('Current players: %s', match.getPlayersID());
        } else if (match.getLength() < 2 && match.getPlayersID() != socket.id) {
            match.addPlayers(socket);
            logger.info('Current players: %s', match.getPlayersID());
            match.shuffleStage();
        }
    });

    socket.on('ready-play', function(deck) {

        deck.forEach(function(card) {
            logger.info(card);
        });

        match.updateReady(1);
        logger.info(match.getReady());

        if(match.getReady() == 2) {
            sendToClients('playing');
        }

    });


    socket.on('disconnect', function() {

        if (match != null) {
            match.removePlayer(socket);
            logger.info(match.getPlayersID());
            match.updateReady(-1);
            logger.info(match.getReady());
            sendToClients('waiting');
        }
    });

});

var sendToClients = function(emitKey) {
    var curMatchData = match.getData();
    for (var i = 0; i < match.getLength(); i++) {
        curMatchData[i].socket.emit(emitKey);
        logger.info('socket emit to %s with key %s', curMatchData[i].socket.id, emitKey);
    }
};


server.listen(8101, function() {
    logger.info('Server listening on port 8101');
});

function game() {

    var matchData = [];
    var ready = 0;

    return {
        getPlayersID: function() {
            var playerids = [];

            matchData.forEach(function(player) {
                playerids.push(player.socket.id);
            });

            return playerids;
        },

        getLength: function() {
            return matchData.length;
        },

        getData: function() {
            return matchData;
        },

        addPlayers: function(player) {
            matchData.push({
                socket: player,
                board: null,
                deck: null,
                ready: false
            })
        },

        removePlayer: function(player) {

            var index = -1;
            for (var i = 0; i < matchData.length; i++) {
                if (matchData[i].socket == player) {
                    logger.info("matched: %s at index %s", player, i);
                    var index = i;
                }
            };

            if (index > -1){
                matchData.splice(index, 1);
            };
        },

        shuffleStage: function() {

            var colours = [0, 2];

            matchData.forEach(function(player, index) {
                player.colour = colours[index];
                player.socket.emit('begin-shuffle' ,player.colour);
            });
        },

        updateReady: function(val) {
            ready = ready < 0 ? 0 : ready + val;
        },

        getReady: function() {
            return ready;
        }
    }
}