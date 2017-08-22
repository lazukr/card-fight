var Client = {}
Client.socket = io.connect();

Client.readyToShuffle = function() {
    Client.socket.emit('ready-shuffle');
};

Client.readyToPlay = function(deck) {
    Client.socket.emit('ready-play', deck);
};

Client.socket.on('begin-shuffle', function(colour) {

    game.state.start('shuffle', true, false, colour);
    console.log(colour);

});

Client.socket.on('waiting', function() {
    game.state.start('wait');
});

Client.socket.on('playing', function(myDeck, enemyDeck) {
    game.state.start('play', true, false, {
        myDeck: myDeck,
        enemyDeck: enemyDeck
    });
});