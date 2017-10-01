var Load = function(game) {};

Load.prototype = {
    preload: function() {
        console.log('loading files...');
        var loading = game.add.text(game.width/2, game.height/2, "Loading...");
        loading.anchor.set(0.5, 0.5);
        game.stage.backgroundColor = '#aec6cf';

        game.load.spritesheet('ranks', '/assets/ranks.png', 42, 54);
        game.load.spritesheet('suits', '/assets/suits.png', 42, 54);
        game.load.spritesheet('card', '/assets/card.png', 100, 140);
        game.load.spritesheet('cardButton', '/assets/cardButton.png', 100, 140);
        game.load.spritesheet('button', '/assets/button.png', 100, 50);
        game.load.json('text', '/js/utils/text.json');
    },

    create: function() {
        game.state.start('title');
    }
};