var Client = {}
Client.socket = io.connect();

Client.matchmaking = function() {
    Client.socket.emit('queue');
};

Client.socket.on('disconnect', function() {
    game.state.start('title');
});

Client.socket.on('opponent-disconnected', function() {
    game.state.start('title');
});