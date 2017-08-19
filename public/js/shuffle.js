var shuffleState = {

    init: function(colour) {
        cardColour = colour;
    },

    create: function() {

        var shuffle = function() {
            var j, x, i;
            for (i = deck.length; i; i--) {
                j = Math.floor(Math.random() * i);
                x = deck[i - 1];
                deck[i - 1] = deck[j];
                deck[j] = x;
            }
            deck.forEach(updateCard);
        }

        var updateCard = function(item, index) {
            item.setXY(50 + (index % 13)*90, 50 + Math.floor(index / 13)*150);
            item.sendToBack();
        }

        var deck = [];

        for (var j = 0 + cardColour; j < 2 + cardColour; j++) {
            for(var i = 0; i < 13; i++) {
                deck.push(addCard(50, 50, UP, i+1, j+1));
            }
        }
        deck.forEach(updateCard);

        var shuffleButton = addButton(75, game.height - 50, 'button', shuffle, 0x00ccff, 'Shuffle');

    }
}