var titleState = {

    create: function() {

        var title = game.add.text(game.width/2, game.height/3, titleText['title']);
        title.anchor.set(0.5, 0.5);

        var startFunction = function() {

            game.state.start('rules');

        }

        var startButton = addButton(game.width/2, game.height/3 + 100, 'button', startFunction, BTN_TINT_ENBL, 'Start');

        var creditText = game.add.text(25, game.height-50, 'A game by Lazukr.');

        for(var i = 0; i < 13; i++) {
            var sprite = addCard(50+60*i, game.height/2+50, DOWN, i+1, SPADES);
        }

    }
}