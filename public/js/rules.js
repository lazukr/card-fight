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
        this.backButton = new LabelButton(game, 75, game.height-50, 'Back', BTN_TINTS, this.back, this);
        this.nextButton = new LabelButton(game, game.width-75, game.height-50, 'Next', BTN_TINTS, this.next, this);
        this._update();
    },

    back: function() {
        if (this.page) {
            this.page--;
            this._update();
        }
    },

    next: function() {
        if (this.page != 4) {
            this.page++;
            this._update();
        } else {
            this.title();
        }
    },

    _update: function() {
        this.rulesParagraph.text = this.JSONText['' + this.page].join('\n');
        this.backButton.visible = !this.page ? false : true;
        this.nextButton.setLabel(this.page == 4 ? 'Return' : 'Next');
    },

    title: function() {
        game.state.start('title');
    }
}