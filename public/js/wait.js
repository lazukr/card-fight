var Wait = function(game) {};

Wait.prototype = {

    init: function() {

        // get JSON text
        var JSONText = getJSONText('wait');
        this.title = JSONText['title'];
        this.numberOfCards = 3;
        this.dxLeft = '-200';
        this.dxRight = '+200';
    },

    create: function() {

        // display text
        this.waitText = game.add.text(game.width/2, game.height/3, this.title);
        this.waitText.anchor.setTo(0.5, 0.5);


        // create card group
        this.cardGroup = new CardGroup(game);
        this.cardGroup.inputEnableChildren = false;

        // insert cards
        for(var i = this.numberOfCards; i--;) {
            var currentSuit = randomIntegerFromInterval(1 , 4);
            var currentRank = randomIntegerFromInterval(1, 13);
            this.cardGroup.add(new Card(game, 0, 0, currentSuit, currentRank, DOWN));
        }

        // center cardGroup
        this.cardGroup.x = game.width/2;
        this.cardGroup.y = game.height/2;
        this.cardGroup.collapse(Phaser.CENTER);

        // add card tween animations
        this.tweenAnimation(this.cardGroup);

        // loop the animation
        game.time.events.loop(1550, this.tweenAnimation, this, this.cardGroup);

        // tell server to queue
        Client.queue();
    },

    tweenLeft: function(card, dxLeft, dxRight) {

        var leftTween = game.add.tween(card);
        leftTween.to({x: dxLeft}, 735, "Linear");
        return leftTween;
    },

    tweenRight: function(card, dxLeft, dxRight) {
        var rightTween = game.add.tween(card);
        rightTween.to({x: dxRight}, 735, "Linear");
        return rightTween;
    },

    tweenAnimation: function(cardGroup) {
        var botCard = cardGroup.getBottom();
        var topCard = cardGroup.getTop();

        botCard.face = +!botCard.face;

        botCardTween = this.tweenLeft(botCard, this.leftDelta, this.rightDelta);
        topCardTween = this.tweenRight(topCard, this.leftDelta, this.rightDelta);

        botCardReverseTween = this.tweenRight(botCard, this.leftDelta, this.rightDelta);
        topCardReverseTween = this.tweenLeft(topCard, this.leftDelta, this.rightDelta);

        botCardTween.chain(botCardReverseTween);
        topCardTween.chain(topCardReverseTween);

        botCardTween.onComplete.add(function() {
            cardGroup.moveUp(botCard);
            cardGroup.moveUp(botCard);
        });

        botCardTween.start();
        topCardTween.start();       

    }
}