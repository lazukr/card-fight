function addCard(x, y, face, rank, suit, linked) {

    var linked = linked ? linked : false;

    var card = game.add.sprite(x, y, 'card', face);
    var cardRank = card.addChild(game.add.sprite(RANK_X, RANK_Y, 'ranks', rank));
    var cardSuit = card.addChild(game.add.sprite(SUIT_X, SUIT_Y, 'suits', suit));
    var tween;
    var curCallback;
    var curContext;
    var curRepeat;

    cardRank.tint = suit < 3 ? 0x000000 : 0xffffff;

    var update = function() {
        cardRank.visible = !!card.frame;
        cardSuit.visible = !!card.frame;

    };

    var flip = function() {
        card.frame = +!card.frame;
        update();
        if (typeof curCallback === "function") {
            console.log('callback');
            curCallback.apply(curContext);
            if (!curRepeat) {
                curCallback = null;
            }
        }
    };

    var btnFlip = function () {
        flip();
        if (linked) {
            Client.flipCard({
                player: game.players.getSelf().colour,
                rank: cardRank.frame,
                suit: cardSuit.frame,
                face: card.frame
            });
        }
    };

    var button = card.addChild(game.add.button(0, 0, 'cardButton', btnFlip, this, 1, 0, 2));

    update();

    return {
        
        x: card.x,
        y: card.y,


        setLink: function(bool) {
            linked = bool;
        },

        setFace: function(face) {
            card.frame = face;
            update();
        },

        setSelectable: function(bool) {
            button.visible = bool;
        },

        addTween: function(newX, newY, speed, prevTween) {
            var distance = Phaser.Math.distance(card.x, card.y, newX, newY);
            var duration = distance / speed;
            var buttonVisibility = button.visible;

            button.visible = false;
            tween = game.add.tween(card).to({x:newX, y:newY}, duration);
            tween.onComplete.add(function() {
                button.visible = buttonVisibility;
            });

            if (prevTween) {
                tween.chain(prevTween);
            }
        },

        getCard: function() {
            return {
                rank: cardRank.frame,
                suit: cardSuit.frame,
                face: card.frame
            };
        },

        getTween: function() {
            return tween;
        },

        bindFlipCallback: function(callback, context, repeat) {
            curCallback = callback;
            curContext = context;
            curRepeat = repeat ? repeat : false;
            console.log(typeof curCallback);
        },

        startTween: function() {
            tween.start();
            card.sendToBack();
        },

        flip: function() {
            flip();
        },

        btnFlip: function() {
            btnFlip();
        }
    }

}