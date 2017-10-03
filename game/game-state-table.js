var S = require('./game-state-consts').stateList,
    A = require('./game-state-consts').actionList;

module.exports = Object.freeze({
    // STATE TRANSITIONS
    stateTransitionTable: [
    //  IDLE, WAITPLAY, PLAY, PLAYER0, PLAYER1
        [S.IDLE, S.IDLE, S.IDLE, S.IDLE, S.IDLE], // ONPLAYERDISCONNECT
        [S.WAITPLAY, S.PLAY, S.PLAY, S.PLAYER0, S.PLAYER1] // ONQUEUE
    ],
    // ACTIONS
    transitionActionTable: [
    //  IDLE, WAITPLAY, PLAY, PLAYER0, PLAYER1
        [A.RESET, A.RESET, A.RESET, A.RESET, A.RESET], // ONPLAYERDISCONNECT
        [A.ADDPLAYER, A.STARTPLAY, A.NONE, A.NONE, A.NONE] // ONQUEUE
    ]

});
