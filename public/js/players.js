function addPlayers() {

    var players = {
        self: {
            colour: -1,
            deck: addDeck(MY_DECK_X, MY_DECK_Y, 0, 0, 1),
            board: addDeck(MY_DECK_X, MY_DECK_Y, 0, 0, 7),
            grave: addDeck(1000, 600, 0, 0, 1),
            score: 0
        },
        enemy: {
            colour: -1,
            deck: addDeck(EN_DECK_X, EN_DECK_Y, 0, 0, 1),
            board: addDeck(EN_DECK_X, EN_DECK_Y, 0, 0, 7),
            grave: addDeck(50, 600, 0, 0, 1),
            score: 0
        }
    };
    var listCards = [];
    var turn = -1;
    var gameText;

    var updateGame = function() {

        if (turn == players.self.colour) {
            players.self.board.setSelectable(true);
            players.enemy.board.setSelectable(true);
            players.self.board.setCardLink(false);
            players.self.deck.setCardLink(false);

            console.log(this);
            players.enemy.board.setFlipCallbackOnAll(function() {
                var enemy_board = players.enemy.board.getDeck();
                var values = [];
                var cards = [];
                enemy_board.forEach(function(card) {
                    var cardValues = card.getCard();
                    if (cardValues.face) {
                        values.push(cardValues);
                        cards.push(card);
                    }
                });
                console.log(values);

                if (values.length == 2) {
                    players.enemy.board.setSelectable(false);
                    if (values[0].rank == values[1].rank) {
                        console.log('you get a point');
                        //players.enemy.board.removeCardByValue(cards[0]);
                        //players.enemy.board.removeCardByValue(cards[1]);

                        Client.removeFromBoard(values);



                    } else {
                        console.log('no points');
                    }
                }



            }, this, true);


        } else {
            players.self.deck.setSelectable(false);
            players.self.board.setSelectable(false);
            players.enemy.deck.setSelectable(false);
            players.enemy.board.setSelectable(false);

        }

    }

    return {

        setListCards: function() {
            listCards.push([]);
            for (var suit = 1; suit < 5; suit++) {
                listCards.push([]);
                listCards[suit].push(null);
                for (var rank = 1; rank < 14; rank++) {
                    listCards[suit].push(addCard(0, 0, DOWN, rank, suit, true));
                }
            }
        },

        setColours: function(colour) {
            players.self.colour = colour;
            players.enemy.colour = +!colour;
        },

        setDecks: function(decks) {

            var deckLength = decks[0].length;
            var selfDeck = decks[players.self.colour];
            var enemyDeck = decks[players.enemy.colour];

            for (var i = 0; i < deckLength; i++) {
                var selfCard = listCards[selfDeck[i].suit][selfDeck[i].rank];
                var enemyCard = listCards[enemyDeck[i].suit][enemyDeck[i].rank];
                players.self.deck.addExistingCard(selfCard);
                players.enemy.deck.addExistingCard(enemyCard);
            }
        },

        setBoards: function(decks) {
            var deckLength = decks[0].length;
            var selfDeck = decks[players.self.colour];
            var enemyDeck = decks[players.enemy.colour];

            for (var i = 0; i < deckLength; i++) {
                var selfCard = listCards[selfDeck[i].suit][selfDeck[i].rank];
                var enemyCard = listCards[enemyDeck[i].suit][enemyDeck[i].rank];
                players.self.board.addExistingCard(selfCard);
                players.enemy.board.addExistingCard(enemyCard);
            }
        },

        setTurn: function(curTurn) {
            turn = curTurn;
        },

        setGameText: function(textObj) {
            gameText = textObj;
        },

        getSelf: function() {
            return players.self;
        },

        getEnemy: function() {
            return players.enemy;
        },

        getAllCards: function() {
            return listCards;
        },

        getGameText: function() {
            return gameText;
        },

        updateGameText: function(text) {
            gameText.text = text;
        },

        updateSelf: function(anim, speed, callback) {
            players.self.deck.update(anim, speed);
            players.self.board.update(anim, speed, callback);
        },

        updateEnemy: function(anim, speed, callback) {
            players.enemy.deck.update(anim, speed);
            players.enemy.board.update(anim, speed, callback);
        },

        updateDecks: function(anim, speed, callback) {
            players.enemy.deck.update(anim, speed);
            players.self.deck.update(anim, speed, callback);
        },

        updateBoards: function(anim, speed, callback) {
            players.enemy.board.update(anim, speed);
            players.self.board.update(anim, speed, callback);
        },

        beginMatch: function(first) {
            if (first == players.enemy.colour) {
                gameText.text = "It's your enemy's turn. \nYour revealed card \nwill be reshuffled \nwhile your enemy's \nwill be on top of \nthe deck face down";
            }
            else if (first == players.self.colour){
                gameText.text = "It's your turn. \nYour revealed card is \nnow face down on \ntop of the deck \n while your enemy's is \nreshuffled back \ninto their deck";
            }
            else {
                gameText.text = "Both of you \nProbably had the \nsame rank, \nBlack goes first.";
            }
            players.self.deck.getTopCard().btnFlip();
            updateGame();
        }
    }
};