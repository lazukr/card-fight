var ruleState = {

    create: function() {

        
        var rulesPage = 0;
        var rulesTitle = game.add.text(game.width/2, game.height/5, rulesText['title']);
        var rulesParagraph = game.add.text(game.width/2, game.height/5 + 20, rulesText['text'][rulesPage.toString()].join('\n'));
        rulesTitle.anchor.set(0.5, 0.5);
        rulesParagraph.anchor.set(0.5, 0);
        var navBack = 'Back';
        var navNext = 'Next';

        var update = function() {
            rulesParagraph.text = rulesText['text'][rulesPage.toString()].join('\n');
            nextButton.setText(rulesPage == 4 ? 'Return' : 'Next');
            backButton.visible(rulesPage == 0 ? false : true);
        }

        var backFunction = function() {
            if (rulesPage > 0) {
                rulesPage--;
            }
            update();
        }

        var nextFunction = function() {
            if (rulesPage < 4) {
                rulesPage++;
            } else if (rulesPage == 4) {
                game.state.start('title');
            }
            update();
        }

        var backButton = addButton(75, game.height-50, 'button', backFunction, BTN_TINT_ENBL, navBack);
        var nextButton = addButton(game.width-75, game.height-50, 'button', nextFunction, BTN_TINT_ENBL, navNext);
        update();

    }

};