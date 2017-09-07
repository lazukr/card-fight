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
        this.startButton = new LabelButton(game, game.width/2, game.height/3 + 100, 'Start', BTN_TINTS, this.start, this);
        this.rulesButton = new LabelButton(game, game.width/2, game.height/3 + 175, 'Rules', BTN_TINTS, this.rules, this);

        // testing stuff
        this.sampleCard = new Card(game, 50, 50, SPADES, ACE, UP, false);
        this.sampleCard2 = new Card(game, 150, 50, HEARTS, TWO, DOWN, false);

        //console.log(this.sampleCard.enabled);
        this.sampleCard.enabled = false;
        this.sampleCard.enabled = true;


        this.cardGroup = new CardGroup(game);
        this.cardGroup.enableInteraction();

        for (i = 1; i < 14; i++) {
            this.cardGroup.add(new Card(game, 50+i*50, 100, HEARTS, i, UP, false));
        }

        this.cardGroup.enabled = false;
        this.cardGroup.enabled = true;

/*        var test = function() {
            console.log('test');
        };

        this.cardGroup.onChildInputDown.add(test, this);

*/
     
    },

    start: function() {
        game.state.start('wait');
    },

    rules: function() {
        game.state.start('rules');
    }
}