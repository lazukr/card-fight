/*////////////////////////////
//
//  Object meant to hold information
//  regarding a player
//
*/////////////////////////////

var Player = function(game, socket, colour) {
    this.socket = socket;
    this.id = socket.id;
    this.colour = colour;
    this.deck = new CardGroup(game);
    this.board = new CardGroup(game);
    this.grave = new CardGroup(game);
};

Player.prototype.constructor = Player;
Player.prototype.draw = function(numberOfCards) {

    

};
