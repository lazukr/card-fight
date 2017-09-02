var shuffleState = {

    init: function(colour) {

        game.players.setColours(colour);
    },

    create: function() {

        var ready = function() {

            shuffleButton.disable();
            deck.setPosition(25, 390, 0, 0);
            deck.update(CHAINED, 10, function() {
                deck.flip();
                Client.readyToPlay(deck.getValues());
            });
            readyButton.disable();
        }

        var deck = addDeck(50, 50, 90, 165, 13);
        var selfColour = game.players.getSelf().colour;
        console.log("selfColour: %s", selfColour);

        for (var j = 0 + selfColour*2; j < 2 + selfColour*2; j++) {
            for (var i = 0; i < 13; i++) {
                deck.addNewCard(UP, i+1, j+1);
            }
        }

        deck.update();

        var shuffleButton = addButton(75, game.height - 50, 'button', deck.shuffle, BTN_TINT_ENBL, 'Shuffle');
        var readyButton = addButton(game.width - 75, game.height - 50, 'button', ready, BTN_TINT_ENBL, 'Ready');

    }
}