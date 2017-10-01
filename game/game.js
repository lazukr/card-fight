/*////////////////////////////
//
//  Object meant to keep track and handle
//  information regarding the game.
//
*/////////////////////////////

var logger = require('../logger'),
    STATE = require('./game-state-consts').stateList,
    EVENT = require('./game-state-consts').eventList,
    ACTION = require('./game-state-consts').actionList,
    STATE_TABLE = require('./game-state-table').stateTransitionTable,
    ACTION_TABLE = require('./game-state-table').transitionActionTable,
    Player = require('./player');

logger.level = 'debug';


var Game = function() {
    var _turn = 0;
    this.maxPlayers = 2;
    this.state = STATE.IDLE; 
    this.playerList = [];
    this.playerDeckList = [];
    this.playerBoardList = [];

    Object.defineProperties(this, {
        "turn": {
            writeable: false,

            get: function() {
                return _turn;
            },

            set: function(value) {
                _turn = value % 2;
            }
        }
    });


};

Game.prototype.constructor = Game;

Game.prototype.addPlayer = function(socket, colour) {
    logger.debug('action: add-player');

    logger.debug('print current player list');
    this.playerList.forEach(function(player) {
        logger.debug(player.id);
    });

    if (this.playerList.length < this.maxPlayers) {
        this.playerList.push(new Player(socket, colour));
        game.turn++;
    } else {
        logger.debug('already at %s, did not add new player', this.maxPlayers);
        return;
    }

    logger.debug(this.playerList.length);

};

Game.prototype.reset = function(id) {

    this.playerList.forEach(function(player) {
        player.socket.emit('op-disconnect');
    });
    this.playerList = [];
    this.playerDeckList  = [];
    this.playerBoardList = [];
    game.turn = 0;
};

Game.prototype.update = function(event, args) {

    logger.debug('current state is:', this.state);

    // find current action to do
    switch(ACTION_TABLE[event][this.state]) {
        case ACTION.RESET:
            logger.debug('action: reset');
            game.reset(args);
            break;

        case ACTION.ADDPLAYER:
            game.addPlayer(args, game.turn);
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