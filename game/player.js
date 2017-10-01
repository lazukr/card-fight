/*////////////////////////////
//
//  Object meant to keep of server side information
//  of players
//
*/////////////////////////////

var Player = function(socket, colour) {
    this.socket = socket;
    this.id = socket.id;
    this.colour = colour;
    this.deck = [];
    this.grave = [];
    this.field = [];

};

module.exports = Player;