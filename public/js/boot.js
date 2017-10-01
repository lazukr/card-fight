var Boot = function(game) {};

Boot.prototype = {
    create: function() {
        game.state.start('load');
    }
};