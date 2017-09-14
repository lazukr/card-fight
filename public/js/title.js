var Title = function(game) {};

Title.prototype = {

    create: function() {

        // get text from JSON file
        this.JSONText = getJSONText('title');

        // display text
        this.titleText = game.add.text(game.width/2, game.height/3, this.JSONText['title']);
        this.creditText = game.add.text(25, game.height-50, this.JSONText['credit']);
        this.titleText.anchor.setTo(0.5, 0.5);

        // define buttons
        this.startButton = new Button(game, game.width/2, game.height/3 + 100, 'Start', this.start, this);
        this.rulesButton = new Button(game, game.width/2, game.height/3 + 175, 'Rules', this.rules, this);

        // testing stuff
        this.sampleCard = new Card(game, 50, 50, SPADES, ACE, UP, false);
        this.sampleCard2 = new Card(game, 150, 50, HEARTS, TWO, DOWN, false);
        this.cardGroup = new CardGroup(game);

     
    },

    start: function() {
        game.state.start('wait');
    },

    rules: function() {
        game.state.start('rules');
    }
}