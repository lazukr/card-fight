var Client = {}
Client.socket = io.connect();

Client.readyToShuffle = function() {
    Client.socket.emit('ready-shuffle');
};

Client.readyToPlay = function(deck) {
    Client.socket.emit('ready-play', deck);
};

Client.flipCard = function(data) {
    Client.socket.emit('flip-card', data);
};

Client.checkTopCard = function(data) {
    Client.socket.emit('check-card', data);
};

Client.removeFromBoard = function(values) {
    thisPlayer = game.players.getSelf().colour;
    Client.socket.emit('remove-from-board', {
        values: values,
        player: thisPlayer
    });
};

Client.socket.on('board-update', function(data) {
    console.log(data);
    var allCards = game.players.getAllCards();
    var card1 = allCards[data[0].suit][data[0].rank];
    var card2 = allCards[data[1].suit][data[1].rank];

    


});

Client.socket.on('card-flipped', function(data) {
    game.players.getAllCards()[data.suit][data.rank].setFace(data.face);
});

Client.socket.on('begin-shuffle', function(colour) {
    game.state.start('shuffle', true, false, colour);
});

Client.socket.on('title', function() {
    game.state.start('title');
});

Client.socket.on('playing', function(data) {
    game.state.start('play', true, false, data.decks, data.boards);
});

Client.socket.on('initial-turn', function(data) {
    game.players.setTurn(data.turn);
    game.players.beginMatch(data.first);
});