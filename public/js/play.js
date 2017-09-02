var playState = {

    init: function(decks, boards) {
        game.players.setListCards();
        game.players.setDecks(decks);
        game.players.setBoards(boards);

    },

    create: function() {

        var player_self = game.players.getSelf();
        var player_enemy = game.players.getEnemy();
        
        player_self.board.setSelectable(false);
        player_enemy.board.setSelectable(false);
        player_enemy.deck.setSelectable(false);
        player_self.deck.setSelectable(false);

        game.players.updateDecks();
        game.players.updateBoards();
        
        player_self.board.setDealingMode(LOOP);
        player_enemy.board.setDealingMode(LOOP);
        
        player_self.board.setPosition(MY_BOARD_X, MY_BOARD_Y, BOARD_DX, BOARD_DY);
        player_enemy.board.setPosition(EN_BOARD_X, EN_BOARD_Y, -BOARD_DX, -BOARD_DY);

        game.players.setGameText(game.add.text(50, 50, "Flip the card on \n the top of your deck"));
        var guideText = game.players.getGameText();


        guideText.visible = false;

        var flipFunction = function() {
            guideText.text = "Wait for opponent \n to flip their card";
        };

        var topCard = player_self.deck.getTopCard();

        topCard.bindFlipCallback(function() {
            guideText.text = "Wait for opponent \n to flip their card";
            Client.checkTopCard({
                rank: topCard.getCard().rank,
                id: player_self.colour
            });
        }, this);

        game.players.updateBoards(CHAINED, 10, function() {
            guideText.visible = true;
            player_self.deck.setSelectable(true);
        });

    }
}