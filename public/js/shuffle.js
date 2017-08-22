var shuffleState = {

    init: function(colour) {
        cardColour = colour;
    },

    create: function() {

        var ready = function() {

            shuffleButton.disable();
            deck.collapse(25, 390, function() {
                Client.readyToPlay(deck.getValues());
            });
            readyButton.disable();
        }

        var deck = addDeck(50, 50, 90, 165, 13);

        for (var j = 0 + cardColour; j < 2 + cardColour; j++) {
            for (var i = 0; i < 13; i++) {
                deck.add(addCard(0, 0, UP, i+1, j+1));
            }
        }

        deck.update();

        var shuffleButton = addButton(75, game.height - 50, 'button', deck.shuffle, BTN_TINT_ENBL, 'Shuffle');
        var readyButton = addButton(game.width - 75, game.height - 50, 'button', ready, BTN_TINT_ENBL, 'Ready');

    }
}