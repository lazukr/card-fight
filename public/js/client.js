var Client = {}
Client.socket = io.connect();

Client.ready = function() {
    Client.socket.emit('ready');
};

Client.socket.on('ready-reply', function(colour) {

    game.state.start('shuffle', true, false, colour);
    console.log(colour);

});