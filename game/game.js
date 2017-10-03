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

// RESET
Game.prototype.reset = function(id) {

    this.playerList.forEach(function(player) {
        player.socket.emit('op-disconnect');
    });
    this.playerList = [];
    this.playerDeckList  = [];
    this.playerBoardList = [];
    this.turn = 0;
};

// ADDPLAYER
Game.prototype.addPlayer = function(socket) {

    if (this.playerList.length < this.maxPlayers) {
        logger.info('player with id %s has been added into playerList with colour %s', socket.id, this.turn);
        this.playerList.push(new Player(socket, this.turn));
        this.turn++;
    } else {
        logger.info('PlayerList already has %s players, new player was not added', this.maxPlayers);
    }
};

// STARTPLAY

Game.prototype.startPlay = function(socket) {
    this.addPlayer(socket);

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
            logger.debug('action: add-player');
            game.addPlayer(args);
            break;

        case ACTION.STARTPLAY:
            logger.debug('action: start-play');
            game.startPlay(args);
            break;
            
        default: // NONE
            break;
    }

    this.state = STATE_TABLE[event][this.state];
    logger.debug('new state is:', this.state);
    
};

module.exports = Game;