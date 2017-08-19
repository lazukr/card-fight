var loadState = {

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
        game.load.json('text', '/js/text.json');



    },

    create: function() {

        rulesText = game.cache.getJSON('text')['rules'];
        titleText = game.cache.getJSON('text')['title'];
        waitText = game.cache.getJSON('text')['wait'];

        game.state.start('title');
    }
};