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
    res.sendFile(__dirname + '/index.html');
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





/*function game() {
    var turn = -1;
    var matchData = [];
    var ready = 0;
    var listCards = [];
    var checkCards = [];
    listCards.push([]);

    for (var suit = 1; suit < 5; suit++) {
        listCards.push([]);
        listCards[suit].push(null);
        for (var rank = 1; rank < 14; rank++) {
            listCards[suit].push({
                rank: rank,
                suit: suit,
                face: 0
            });
        }
    }

    var find = function(player) {

        var index = -1;

        for (var i = 0; i < matchData.length; i++) {
            if (matchData[i].socket === player) {
                logger.info("matched: %s at index %s", player, i);
                index = i;
            }
        }

        return index;
    };


    return {
        getPlayersID: function() {
            var playerids = [];

            matchData.forEach(function(player) {
                playerids.push(player.socket.id);
            });

            return playerids;
        },

        getData: function() {
            return matchData;
        },

        addPlayers: function(player) {
            matchData.push({
                socket: player,
                board: [],
                deck: [],
                grave: []
            })

        },

        setDeck: function(player, deck) {
            var index = find(player);
            if (index > -1) {
                logger.info("deck set at: %s", index);

                for (var i = 0; i < deck.length; i++) {
                    matchData[index].deck.push(deck[i]);
                }
            }
        },

        setTurn: function(curTurn) {
            turn = curTurn;
        },

        getDecks: function() {

            var decks = [];
            matchData.forEach(function(player) {
                decks.push(player.deck);
            });

            logger.debug(decks);

            return decks;
        },

        getBoards: function() {

            var boards = [];
            matchData.forEach(function(player) {
                boards.push(player.board);
            });
            logger.debug(boards);

            return boards;
        },

        getGraves: function() {
            var graves = [];
            matchData.forEach(function(player) {
                graves.push(player.grave);
            });
            logger.debug(graves);

            return graves;
        },


        getReady: function() {
            return ready;
        },

        getAllCards: function() {
            return listCards;
        },

        getCheckCards: function() {
            return checkCards;
        },

        reset: function() {
            matchData = [];
            checkCards = [];
            turn = -1;
            ready = 0;
        },

        shuffleStage: function() {
            matchData.forEach(function(player, index) {
                player.socket.emit('begin-shuffle' , index);
            });
        },

        updateReady: function() {
            ready++;
        },

        dealToBoard: function(player, amount) {
            var index = find(player);

            if (index > -1) {
                for (var i = 0; i < amount; i++) {
                    matchData[index].board.push(matchData[index].deck.pop());
                }
            }
        }
    }
}*/