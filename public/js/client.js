var Client = {}
Client.socket = io.connect();

Client.queue = function() {
    Client.socket.emit('queue');
};

Client.socket.on('disconnect', function() {
    game.state.start('title');
});
Client.socket.on('op-disconnect', function() {
    game.state.start('title', true, false, getJSONText('disconnect')['op-disconnect']);
});
