module.exports = Object.freeze({
    stateList: {
        IDLE: 0,
        WAITSHUFFLE: 1,
        SHUFFLE: 2,
        WAITPLAY: 3,
        PLAY: 4,
        PLAYER0: 5,
        PLAYER1: 6
    },

    eventList: {
        ONPLAYERDISCONNECT: 0,
        ONQUEUE: 1,
        ONSHUFFLECOMPLETE: 2,
        ONPLAYER0TURN: 3,
        ONPLAYER1TURN: 4
    },

    actionList: {
        NONE: 0,
        RESET: 1,
        ADDPLAYER: 2,
        ADDDECK: 3
    }
});