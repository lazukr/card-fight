module.exports = Object.freeze({
    stateList: {
        IDLE: 0,
        WAITPLAY: 1,
        PLAY: 2,
        PLAYER0: 3,
        PLAYER1: 4
    },

    eventList: {
        ONPLAYERDISCONNECT: 0,
        ONQUEUE: 1,
        ONPLAYER0TURN: 2,
        ONPLAYER1TURN: 3
    },

    actionList: {
        NONE: 0,
        RESET: 1,
        ADDPLAYER: 2
    }
});