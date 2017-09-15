var Title = function(game) {};

Title.prototype = {

    init: function() {

        // get JSON text
        var JSONText = getJSONText('title');
        this.title = JSONText['title'];
        this.credit = JSONText['credit'];

    },

    create: function() {

        // display text
        this.titleText = game.add.text(game.width/2, game.height/3, this.title);
        this.creditText = game.add.text(25, game.height-50, this.credit);
        this.titleText.anchor.setTo(0.5, 0.5);

        // define buttons
        this.startButton = new Button(game, game.width/2, game.height/3 + 100, 'Start', this.toWait, this);
        this.rulesButton = new Button(game, game.width/2, game.height/3 + 175, 'Rules', this.toRules, this);

        // testing stuff
        this.sampleCard = new Card(game, 50, 50, SPADES, ACE, UP, false);
        this.sampleCard2 = new Card(game, 150, 50, HEARTS, TWO, DOWN, false);
        this.cardGroup = new CardGroup(game);
     
    },

    toWait: function() {
        game.state.start('wait');
    },

    toRules: function() {
        game.state.start('rules');
    }
}