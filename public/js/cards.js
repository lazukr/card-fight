function addCard(x, y, face, rank, suit, linked) {
    var linked = linked ? linked : false;
    var cardFace = face;
    var card = game.add.sprite(x, y, 'card');
    var cardRank = card.addChild(game.add.sprite(RANK_X, RANK_Y, 'ranks', rank));
    var cardSuit = card.addChild(game.add.sprite(SUIT_X, SUIT_Y, 'suits', suit));
    cardRank.tint = suit < 3 ? 0x000000 : 0xffffff;
    var tween;
    var cardString = String(suit) + "-" + String(rank);


    var update = function () {
        card.frame = cardFace;
        cardRank.visible = card.frame == 1 ? true : false;
        cardSuit.visible = card.frame == 1 ? true : false;
        cardFace = cardFace == 0 ? 1 : 0;
    };

    var flip = function() {
        update();
        if (linked) {
            console.log('linked test: %s', linked);
            Client.flipCard({
                player: game.players.getSelf().colour,
                cardID: cardString
            });
        }
    }

    var button = card.addChild(game.add.button(0, 0, 'cardButton', flip, this, 1, 0, 2));
    update();

    return {

        getCard: function() {
            return {
                rank: cardRank.frame,
                suit: cardSuit.frame,
                face: card.frame
            };
        },

        setXY: function(newX, newY) {
            card.x = newX;
            card.y = newY;
            card.sendToBack();
        },

        getTween: function() {
            return tween;
        },

        addTween: function(newX, newY, speed, prevTween) {
            var distance = Phaser.Math.distance(card.x, card.y, newX, newY);
            var duration = distance / speed;

            button.visible = false;
            tween = game.add.tween(card).to({x:newX, y:newY}, duration);
            tween.onComplete.add(function() {
                button.visible = true;
            });

            if (prevTween) {
                tween.chain(prevTween);
            }
        },

        startTween: function() {
            tween.start();
            card.sendToBack();
        },

        draw: function(bool) {
            card.visible = bool;
            cardRank.visible = bool;
            cardSuit.visible = bool;
            button.visible = bool;
        },

        flip: function() {
            update();
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
    var spreadMode = ROW;

    var update = function(animation, speed) {



        var dx, dy;
        var speed = speed ? speed : 10;

        if (spreadMode == LOOP) {
            dx = function(i) {
                return offsetX*(i - (2*(i % rowSpread) + 1)*Math.floor(i/rowSpread));
            };
            dy = function(i) {
                return offsetY*Math.floor(i / rowSpread);
            };

        } else {
            dx = function(i) {
                return offsetX*(i % rowSpread);
            };
            dy = function(i) {
                return offsetY*Math.floor(i / rowSpread);
            };
        }

        if (animation) {
            deck.forEach(function(card, index) {
                if (index > 0) {
                    card.addTween(posX + dx(index), posY + dy(index), speed, deck[index-1].getTween());
                } else {
                    card.addTween(posX + dx(index), posY + dy(index), speed);
                }
            });

        } else {
            deck.forEach(function(card, index) {
                card.setXY(posX + dx(index), posY + dy(index));
            });
        }
    };

    return {
        add: function(face, rank, suit) {
            deck.push(addCard(posX, posY, face, rank, suit));
        },

        addExistingCard: function(card) {
            deck.push(card);
        },

        addCards: function(inputDeck, linked) {
            var linked = linked ? linked : false;
            for (var i = 0; i < inputDeck.length; i++) {
                deck.push(addCard(posX, posY, inputDeck[i].face, inputDeck[i].rank, inputDeck[i].suit, linked));    
            }
        },

        pop: function() {
            return deck.pop();
        },

        collapse: function(animation, callback) {
            update(animation);
            if (animation) {
                deck[0].getTween().onComplete.add(callback);
                deck[deck.length-1].startTween();
            }
        },

        deal: function(animation, speed) {
            update(animation, speed);
            if (animation) {
                deck[deck.length-1].startTween();
            }
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
            deck.forEach(function(card) {
                card.flip();
            });
        },

        getValues: function() {
            var values = [];
            deck.forEach(function(card) {
                values.push(card.getCard());
            });
            return values;
        },

        setSpread: function(spread) {
            spreadMode = spread;
        },

        setPosition: function(x, y, dx, dy) {
            posX = x;
            posY = y;
            offsetX = typeof dx === 'undefined' ? offsetX : dx;
            offsetY = typeof dy === 'undefined' ? offsetY : dy;
        },

        getCards: function() {
            return deck;
        }

    }
}