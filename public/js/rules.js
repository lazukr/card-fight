var Rules = function(game) {};

Rules.prototype = {

    init: function() {

        // get JSON text
        var JSONText = getJSONText('rules');
        this.title = JSONText['title'];
        this.text = JSONText['text'];

        // define page variable
        this.page = 0;

    },

    create: function() {

        // display text
        this.rulesText = game.add.text(game.width/2, game.height/5, this.title);
        this.rulesParagraph = game.add.text(game.width/2, game.height/5 + 20, this.text[this.page].join('\n'));
        this.rulesText.anchor.setTo(0.5, 0.5);
        this.rulesParagraph.anchor.setTo(0.5, 0);

        // define buttons
        this.backButton = new Button(game, 75, game.height-50, 'Back', this.back, this);
        this.nextButton = new Button(game, game.width-75, game.height-50, 'Next', this.next, this);
        this.returnButton = new Button(game, game.width-75, game.height-50, 'Return', this.toTitle, this);
        this.pageUpdate();
    },

    back: function() {
        if (this.page) {
            this.page--;
            this.pageUpdate();
        }
    },

    next: function() {
        if (this.page < 4) {
            this.page++;
            this.pageUpdate();
        }
    },

    pageUpdate: function() {
        this.rulesParagraph.text = this.text[this.page].join('\n');
        this.backButton.visible = this.page ? true : false;
        this.nextButton.visible = this.page < 4 ? true : false;
        this.returnButton.visible = this.page == 4 ? true : false;
    },

    toTitle: function() {
        game.state.start('title');
    }
}