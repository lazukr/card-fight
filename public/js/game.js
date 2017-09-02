var game = new Phaser.Game(1280, 720, Phaser.AUTO, 'game', {
    create: create,
    preload: preload
});

function preload() {
    game.stage.disableVisibilityChange = true;
};

function create() {

    game.state.add('boot', bootState);
    game.state.add('load', loadState);
    game.state.add('rules', Rules);
    game.state.add('shuffle', shuffleState);
    game.state.add('play', playState);
    game.state.add('wait', Wait);
    game.state.add('title', Title);
    game.state.start('boot');

    //game.players = addPlayers();
};