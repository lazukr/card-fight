function addPlayers() {

    var players = {
        self: {
            colour: -1,
            deck: addDeck(CNST_BRD.self.deck_x, CNST_BRD.self.deck_y, 0, 0, 1),
            board: addDeck(CNST_BRD.self.deck_x, CNST_BRD.self.deck_y, 105, 145, 7)
        },
        enemy: {
            colour: -1,
            deck: addDeck(CNST_BRD.enemy.deck_x, CNST_BRD.enemy.deck_y, 0, 0, 1),
            board: addDeck(CNST_BRD.enemy.deck_x, CNST_BRD.enemy.deck_y, -105, -145, 7)
        }
    };

    var allCards = {};

    var addToAllCards = function(deck) {
        for (var i = 0; i < deck.length; i++) {
            console.log(deck[i].getCard().suit);
            var key = String(deck[i].getCard().suit) + "-" + String(deck[i].getCard().rank);
            allCards[key] = deck[i];
            //console.log(allCards[key] === players.self.deck.getCards()[i]);
        }
    };

    return {

        getSelf: function() {
            return players.self;
        },

        getEnemy: function() {
            return players.enemy;
        },

        getPlayers: function() {
            return players;
        },

        setColours: function(colour) {
            players.self.colour = colour;
            players.enemy.colour = +!colour;
        },

        setDecks: function(decks) {
            players.self.deck.addCards(decks[players.self.colour], true);
            players.enemy.deck.addCards(decks[players.enemy.colour], true);
            addToAllCards(players.self.deck.getCards());
            addToAllCards(players.enemy.deck.getCards());
        },

        setBoards: function(boards) {
            players.self.board.addCards(boards[players.self.colour], true);
            players.enemy.board.addCards(boards[players.enemy.colour], true);
            addToAllCards(players.self.board.getCards());
            addToAllCards(players.enemy.board.getCards());
            players.self.board.setSpread(LOOP);
            players.enemy.board.setSpread(LOOP);
        },

        updateSelf: function(anim, speed) {
            players.self.deck.update(anim, speed);
            players.self.board.update(anim, speed);
        },

        updateEnemy: function(anim, speed) {
            players.enemy.deck.update(anim, speed);
            players.enemy.board.update(anim, speed);
        },

        updateDecks: function(anim, speed) {
            players.enemy.deck.update(anim, speed);
            players.self.deck.update(anim, speed);
        },

        updateBoards: function(anim, speed) {
            players.enemy.board.deal(anim, speed);
            players.self.board.deal(anim, speed);
        },

        getAllCards: function() {
            return allCards;
        }

    }

};