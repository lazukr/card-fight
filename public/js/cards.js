function addCard(x, y, face, rank, suit) {

    var cardFace = face;
    var card = game.add.sprite(x, y, 'card');
    var cardRank = game.add.sprite(x+29, y+15, 'ranks');
    var cardSuit = game.add.sprite(x+29, y+71, 'suits');

    card.frame = cardFace;    
    cardRank.frame = rank;
    cardSuit.frame = suit;
    cardRank.tint = suit < 3 ? 0x000000 : 0xffffff;
    
    update = function () {
        card.frame = cardFace;
        cardRank.visible = card.frame == 1 ? true : false;
        cardSuit.visible = card.frame == 1 ? true : false;
        cardFace = cardFace == 0 ? 1 : 0;
    };

    var button = game.add.button(x, y, 'cardButton', update, this, 1, 0, 2);
    update();

    return {

        setRank: function(rank) {
            cardRank.frame = rank;
        },

        setSuit: function(suit) {
            cardSuit.frame = suit;
        },

        unknownify: function() {
            cardRank.frame = UNKNOWN;
            cardSuit.frame = UNKNOWN;
        },

        setXY: function(newX, newY) {
            card.x = newX;
            card.y = newY;
            button.x = newX;
            button.y = newY;
            cardRank.x = newX + 29;
            cardRank.y = newY + 15;
            cardSuit.x = newX + 29;
            cardSuit.y = newY + 71;
        },

        sendToBack: function() {
            button.sendToBack();
            cardRank.sendToBack();
            cardSuit.sendToBack();
            card.sendToBack();
        }
    }

}

