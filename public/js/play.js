var playState = {

    init: function(decks, boards) {
        console.log(decks);
        console.log(boards);
        game.players.setDecks(decks);
        game.players.setBoards(boards);
    },


    create: function() {

        player_self = game.players.getSelf();
        player_enemy = game.players.getEnemy();

        player_self.board.setPosition(CNST_BRD.self.board_x, CNST_BRD.self.board_y);
        player_enemy.board.setPosition(CNST_BRD.enemy.board_x, CNST_BRD.enemy.board_y);

        game.players.updateDecks();


        /*for (var i = 0; i < 14; i++) {

            player_self.board.addExistingCard(player_self.deck.pop());
            player_enemy.board.addExistingCard(player_enemy.deck.pop());

        };
*/
        game.players.updateBoards(CHAINED, 1);




    }
}