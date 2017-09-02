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
        if (match.getData().length < 2 && match.getPlayersID() != socket.id) {
            match.addPlayers(socket);
            logger.info('Current players: %s', match.getPlayersID());
        }

        if (match.getData().length == 2) {
            match.shuffleStage();
        }
    });

    socket.on('ready-play', function(deck) {

        deck.forEach(function(card) {
            logger.info(card);
        });

        match.updateReady();
        match.setDeck(socket, deck);

        tempCards = match.getAllCards();

        for (var key in tempCards) {
            logger.info("key: %s, data: %s", key, JSON.stringify(tempCards[key]));
        }

        match.dealToBoard(socket, 14);
        logger.info("ready: %s", match.getReady());

        if(match.getReady() == 2) {
            var decks = match.getDecks();
            var boards = match.getBoards();
            sendToClients('playing', {
                decks: decks,
                boards: boards
            });
        }
    });

    socket.on('flip-card', function(data) {
        var allCards = match.getAllCards();
        allCards[data.suit][data.rank].face = data.face;
        match.getData()[+!data.player].socket.emit('card-flipped', allCards[data.suit][data.rank]);
    });

    socket.on('check-card', function(data) {

        var checkCards = match.getCheckCards();

        checkCards.push({
            id: data.id,
            rank: data.rank
        });
        logger.info(checkCards);

        if (checkCards.length == 2) {
            var card1 = checkCards[0].rank;
            var card2 = checkCards[1].rank;
            var turn = -1;
            var first = -1;

            if (card1 > card2) {
                logger.debug(card1>card2);
                turn = checkCards[0].id;
                first = 0;
            } else if (card2 < card1) {
                logger.debug(card1<card2);
                turn = checkCards[1].id;
                first = 1;
            } else {
                logger.debug('test');
                turn = 0;
            }
            match.setTurn(turn);
            sendToClients('initial-turn', {
                turn: turn,
                first: first
            });
        }

    });

    socket.on('remove-from-board', function(data) {

        var board = match.getData()[+!data.player].board;
        var grave = match.getData()[+!data.player].board

        for (var i = 0; i < board.length; i++) {
            if(board[i] === data.values[0] || board[i] === data.values[1]) {
                board.splice(i, 1);
                grave.push(allCards[board[i].suit][board[i].rank]);
            }
        }

        match.dealToBoard(socket, 2);

        sendToClients('board-update', data.values);

    });

    socket.on('disconnect', function() {
        sendToClients('title');
        match.reset();
    });

});

var sendToClients = function(emitKey, items) {
    var curMatchData = match.getData();
    for (var i = 0; i < curMatchData.length; i++) {
        curMatchData[i].socket.emit(emitKey, items);
        logger.info('socket emit to %s with key %s', curMatchData[i].socket.id, emitKey, items);
    }
};


server.listen(8101, function() {
    logger.info('Server listening on port 8101');
});

function game() {
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
}