function addCard(x, y, face, rank, suit) {

    var cardFace = face;
    var card = game.add.sprite(x, y, 'card');
    var cardRank = game.add.sprite(x+RANK_X, y+RANK_Y, 'ranks');
    var cardSuit = game.add.sprite(x+SUIT_X, y+SUIT_Y, 'suits');
    var tweens = [];

    card.frame = cardFace;    
    cardRank.frame = rank;
    cardSuit.frame = suit;
    cardRank.tint = suit < 3 ? 0x000000 : 0xffffff;
    
    var update = function () {
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

        getRank: function() {
            return cardRank.frame;
        },

        setSuit: function(suit) {
            cardSuit.frame = suit;
        },

        getSuit: function() {
            return cardSuit.frame;
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
            cardRank.x = newX + RANK_X;
            cardRank.y = newY + RANK_Y;
            cardSuit.x = newX + SUIT_X;
            cardSuit.y = newY + SUIT_Y;
        },

        sendToBack: function() {
            button.sendToBack();
            cardRank.sendToBack();
            cardSuit.sendToBack();
            card.sendToBack();
        },

        getTweens: function() {
            return tweens;
        },

        addTween: function(newX, newY, prevTween) {
            var distance = Phaser.Math.distance(card.x, card.y, newX, newY);
            var duration = distance / 5;

            button.visible = false;

            tweens = [
                game.add.tween(card).to({x:newX, y:newY}, duration),
                game.add.tween(cardRank).to({x:newX + RANK_X, y:newY + RANK_Y}, duration),
                game.add.tween(cardSuit).to({x:newX + SUIT_X, y:newY + SUIT_Y}, duration),
            ];

            button.x = newX;
            button.y = newY;

            if (prevTween.length > 0) {
                tweens.forEach(function(tween, index) {
                    tween.chain(prevTween[index]);
                });
            }

        },

        startTween: function() {
            tweens.forEach(function(tween) {
                tween.start();
            });
        },

        draw: function(bool) {
            card.visible = bool;
            cardRank.visible = bool;
            cardSuit.visible = bool;
            button.visible = bool;
        }
    }

}

function addDeck(x, y, offsetX, offsetY, rowSpread) {
    var deck = [];
    var posX = x;
    var posY = y;
    var offsetX = offsetX;
    var offsetY = offsetY;
    var rowSpread = rowSpread;

    var update = function() {
        deck.forEach(function(card, index) {
            card.setXY(posX + (index % rowSpread)*offsetX, posY + Math.floor(index / rowSpread)*offsetY);
            card.sendToBack();
        });
    };

    var addTween = function(x, y) {

        deck.forEach(function(card, index) {
            if (index > 0) {
                card.addTween(x, y, deck[index-1].getTweens());
            } else {
                card.addTween(x, y, []);
            }
        });
    }

    return {
        add: function(card) {
            deck.push(card);
        },

        pop: function() {
            deck.pop(card);
        },

        collapse: function(x, y, callback) {
            addTween(x, y);
            deck[0].getTweens()[0].onComplete.add(callback);
            deck[deck.length-1].startTween();
        },

        update: function() {
            update();
        },

        shuffle: function() {
            var j, x, i;
            for (i = deck.length; i; i--) {
                j = Math.floor(Math.random() * i);
                x = deck[i - 1];
                deck[i - 1] = deck[j];
                deck[j] = x;
            }
            update();
        },

        flip: function() {
            deck.reverse();
        },

        getValues: function() {
            var values = [];

            deck.forEach(function(card) {
                values.push({
                    rank: card.getRank(),
                    suit: card.getSuit()
                });
            });

            return values;
        }


    }
}