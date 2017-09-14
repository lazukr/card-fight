var Rules = function(game) {};

Rules.prototype = {

    create: function() {

        // get JSON text
        this.JSONText = getJSONText('rules');

        // define page variable
        this.page = 0;

        // display text
        this.rulesText = game.add.text(game.width/2, game.height/5, this.JSONText['title']);
        this.rulesParagraph = game.add.text(game.width/2, game.height/5 + 20, this.JSONText['' + this.page].join('\n'));
        this.rulesText.anchor.setTo(0.5, 0.5);
        this.rulesParagraph.anchor.setTo(0.5, 0);

        // define buttons
        this.backButton = new Button(game, 75, game.height-50, 'Back', this.back, this);
        this.nextButton = new Button(game, game.width-75, game.height-50, 'Next', this.next, this);
        this.returnButton = new Button(game, game.width-75, game.height-50, 'Return', this.title, this);
        this.buttonUpdate();
    },

    back: function() {
        if (this.page) {
            this.page--;
            this.buttonUpdate();
        }
    },

    next: function() {
        if (this.page < 4) {
            this.page++;
            this.buttonUpdate();
        }
    },

    buttonUpdate: function() {
        this.rulesParagraph.text = this.JSONText['' + this.page].join('\n');
        this.backButton.visible = this.page ? true : false;
        this.nextButton.visible = this.page < 4 ? true : false;
        this.returnButton.visible = this.page == 4 ? true : false;
    },

    title: function() {
        game.state.start('title');
    }
}