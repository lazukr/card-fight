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

    },

    start: function() {
        game.state.start('wait');
    },

    rules: function() {
        game.state.start('rules');
    }
}