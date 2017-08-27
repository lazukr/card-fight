var Client = {}
Client.socket = io.connect();

Client.readyToShuffle = function() {
    Client.socket.emit('ready-shuffle');
};

Client.readyToPlay = function(deck) {
    Client.socket.emit('ready-play', deck);
};

Client.deal = function(amount) {
    Client.socket.emit('init-deal', amount);
};

Client.flipCard = function(data) {
    Client.socket.emit('flip-card', data);
};

Client.socket.on('card-flipped', function(cardID) {
    console.log('card-flipped');
    game.players.getAllCards()[cardID].flip();
});

Client.socket.on('begin-shuffle', function(colour) {

    game.state.start('shuffle', true, false, colour);
    console.log(colour);

});

Client.socket.on('title', function() {
    game.state.start('title');
});

Client.socket.on('playing', function(data) {
    game.state.start('play', true, false, data.decks, data.boards);
});