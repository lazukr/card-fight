
function addDeck(x, y, dx, dy, cardsPerRow) {
    var deck = [];
    var posX = x;
    var posY = y;
    var offsetX = dx;
    var offsetY = dy;
    var cardsPerRow = cardsPerRow;
    var dealingMode = ROW;

    var update = function(animation, speed) {
        var dx, dy;
        var speed = speed ? speed : 10;

        if (dealingMode == LOOP) {
            dx = function(i) {
                return offsetX*(i - (2*(i % cardsPerRow) + 1)*Math.floor(i/cardsPerRow));
            };
            dy = function(i) {
                return offsetY*Math.floor(i / cardsPerRow);
            };

        } else {
            dx = function(i) {
                return offsetX*(i % cardsPerRow);
            };
            dy = function(i) {
                return offsetY*Math.floor(i / cardsPerRow);
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
        addNewCard: function(face, rank, suit) {
            deck.push(addCard(posX, posY, face, rank, suit));
        },

        addExistingCard: function(card) {
            deck.push(card);
        },

        addCards: function(inputDeck) {
            var linked = linked ? linked : false;
            for (var i = 0; i < inputDeck.length; i++) {
                deck.push(addCard(posX, posY, inputDeck[i].face, inputDeck[i].rank, inputDeck[i].suit));    
            }
        },

        setDealingMode: function(NewDealingMode) {
            dealingMode = NewDealingMode;
        },

        setPosition: function(newX, newY, newDX, newDY) {
            posX = newX;
            posY = newY;
            offsetX = typeof newDX === 'undefined' ? offsetX : newDX;
            offsetY = typeof newDY === 'undefined' ? offsetY : newDY;
        },

        setSelectable: function(bool) {
            deck.forEach(function(card) {
                card.setSelectable(bool);
            });
        },

        setCardLink: function(bool) {
            deck.forEach(function(card) {
                card.setLink(bool);
            });
        },

        setFlipCallbackOnAll: function(callback, context, repeat) {
            var repeat = repeat ? repeat : false;
            deck.forEach(function(card) {
                card.bindFlipCallback(callback, context, repeat);
            });
        },

        getValues: function() {
            var values = [];
            deck.forEach(function(card) {
                values.push(card.getCard());
            });
            return values;
        },

        getTopCard: function() {
            return deck[0];
        },

        getDeck: function() {
            return deck;
        },

        pop: function() {
            return deck.pop();
        },

        removeCardByValue: function(card) {
            
            for (var i = 0; i < deck.length; i++) {
                if (deck[i] === card) {
                    deck[i].setXY(1000, 600);
                    deck.splice(i, 1);
                }
            }
        
        },

        update: function(animation, speed, callback) {
            update(animation, speed);

            if (callback) {
                deck[0].getTween().onComplete.add(callback);
            }

            if (animation) {
                deck[deck.length-1].startTween();
            }
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
        }
    }
}