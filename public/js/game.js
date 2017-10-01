var game = new Phaser.Game(1280, 720, Phaser.AUTO, 'game', {
    create: create,
    preload: preload
});

function preload() {
    game.stage.disableVisibilityChange = true;
    game.config.setForceTimeOut = true;
};

function create() {

    game.state.add('boot', Boot);
    game.state.add('load', Load);
    game.state.add('rules', Rules);
    game.state.add('shuffle', Shuffle);
    game.state.add('play', Play);
    game.state.add('wait', Wait);
    game.state.add('title', Title);

    game.state.start('boot');
};