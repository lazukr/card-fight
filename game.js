/*////////////////////////////
//
//  Object meant to keep track and handle
//  information regarding the game.
//
*/////////////////////////////

var logger = require('./logger'),
    STATE = require('./game-state-consts').stateList,
    EVENT = require('./game-state-consts').eventList,
    ACTION = require('./game-state-consts').actionList,
    STATE_TABLE = require('./game-state-table').stateTransitionTable,
    ACTION_TABLE = require('./game-state-table').transitionActionTable;

logger.level = 'debug';


var Game = function() {
    this.turn = -1;
    this.state = STATE.IDLE; 
    this.players = [];
    this.player_decks = [];
    this.player_boards = [];


};

Game.prototype.constructor = Game;
Game.prototype.addPlayer = function(socket, colour) {
    this.players.push({
        id: socket.id,
        socket: socket,
        colour: colour
    });
};

Game.prototype.update = function(event, args) {

    logger.debug('current state is:', this.state);

    // find current action to do
    switch(ACTION_TABLE[event][this.state]) {
        case ACTION.RESET:
            logger.debug('action: reset');
            break;

        case ACTION.ADDPLAYER:
            logger.debug('action: add-player');

            break;

        case ACTION.ADDDECK:
            logger.debug('action add-deck');
            break;
            
        default: // NONE
            break;
    }

    this.state = STATE_TABLE[event][this.state];
    logger.debug('new state is:', this.state);
    
};

module.exports = Game;