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
        if (match.getLength() < 2 && match.getPlayersID() != socket.id) {
            match.addPlayers(socket);
            logger.info('Current players: %s', match.getPlayersID());
        }

        if (match.getLength() == 2) {
            match.shuffleStage();
        }
    });

    socket.on('ready-play', function(deck) {

        deck.forEach(function(card) {
            logger.info(card);
        });

        match.updateReady(1);
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
        logger.info("key: %s, card: %s", data.cardID, JSON.stringify(allCards[data.cardID]));
        match.getData()[+!data.player].socket.emit('card-flipped', data.cardID);

    });

    socket.on('disconnect', function() {
        match.updateReady(0);
        sendToClients('title');
        match.removeAllPlayers();
        
    });

});

var sendToClients = function(emitKey, items) {
    var curMatchData = match.getData();
    for (var i = 0; i < match.getLength(); i++) {
        curMatchData[i].socket.emit(emitKey, items);
        logger.info('socket emit to %s with key %s', curMatchData[i].socket.id, emitKey, items);
    }
};


server.listen(8101, function() {
    logger.info('Server listening on port 8101');
});

function game() {

    var matchData = [];
    var ready = 0;
    var allCards = {};

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

        getLength: function() {
            return matchData.length;
        },

        getData: function() {
            return matchData;
        },

        addPlayers: function(player) {
            matchData.push({
                socket: player,
                board: [],
                deck: []
            })
        },

        setDeck: function(player, deck) {
            var index = find(player);
            if (index > -1) {
                logger.info("deck set at: %s", index);

                for (var i = 0; i < deck.length; i++) {

                    var key = String(deck[i].suit) + "-" + String(deck[i].rank);
                    matchData[index].deck.push(deck[i]);
                    allCards[key] = matchData[index].deck[i];
                    logger.debug(allCards[key] === matchData[index].deck[i]);
                }
            }
        },

        dealToBoard: function(player, amount) {
            var index = find(player);

            if (index > -1) {
                for (var i = 0; i < amount; i++) {
                    matchData[index].board.push(matchData[index].deck.pop());
                }
            }
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

        removePlayer: function(player) {

            var index = find(player);
            
            if (index > -1){
                logger.info("player removed at: %s", index);
                matchData.splice(index, 1);
            }
        },

        removeAllPlayers: function() {

            matchData = [];
        },

        shuffleStage: function() {

            matchData.forEach(function(player, index) {
                player.socket.emit('begin-shuffle' , index);
            });
        },

        updateReady: function(val) {
            ready = val ? ready + val : 0;
        },

        getReady: function() {
            return ready;
        },

        getAllCards: function() {

            return allCards;
            /*var tempArray = [];
            for (var key in allCards){
                tempArray.push({
                    key: key,
                    value: allCards[key]
                });
            };

            return tempArray;*/
        }
    }
}