var titleState = {

    create: function() {

        var title = game.add.text(game.width/2, game.height/3, titleText['title']);
        title.anchor.set(0.5, 0.5);

        var startFunction = function() {
            game.state.start('wait');
        };
        var rulesFunction = function() {
            game.state.start('rules');
        };

        var startButton = addButton(game.width/2, game.height/3 + 100, 'button', startFunction, BTN_TINT_ENBL, 'Start');
        var rulesButton = addButton(game.width/2, game.height/3 + 175, 'button', rulesFunction, BTN_TINT_ENBL, 'Rules');

        var creditText = game.add.text(25, game.height-50, 'A game by Lazukr.');

        addCard(25, 355, UP, 1, CLUBS);
        addCard(150, 355, UP, 1, CLUBS);
        addCard(1155, 165, UP, 1, HEARTS);
        addCard(1030, 165, UP, 1, HEARTS);

        var deck = addDeck(50, 50, 90, 165, 13);

        for (var i = 0; i < 10; i++) {
            deck.add(UP, i+1, 1);
        }

        deck.update();
    }
}