/*////////////////////////////
//
//  Object meant to display the information
//  of a card.
//
*/////////////////////////////

var CardSprite = function(game, x, y, suit, rank, face) {

    x = x || 0;
    y = y || 0;
    suit = suit || 0;
    rank = rank || 0;
    face = face || 0;

    Phaser.Sprite.call(this, game, x, y, 'card');

    // create children
    var _suit = new Phaser.Sprite(game, SUIT_X, SUIT_Y, 'suits', suit);
    var _rank = new Phaser.Sprite(game, RANK_X, RANK_Y, 'ranks', rank);
    
    // add children
    this.addChild(_suit);
    this.addChild(_rank);

    Object.defineProperties(this, {
        "rank": {
            writeable: false,
            get: function() {
                return _rank.frame;
            }
        },

        "suit": {
            writeable: false,
            get: function() {
                return _suit.frame;
            }
        },

        "face": {
            set: function(value) {
                this.frame = value;
                _suit.visible = !!value;
                _rank.visible = !!value;
            },

            get: function() {
                return this.frame;
            }
        },

        "data": {
            get: function() {
                return {
                    rank: _rank.frame,
                    suit: _suit.frame,
                    face: this.frame
                }
            }
        }
    });

    // set tint of card based on suit (black for 1, 2; red for 3, 4)
    _rank.tint = suit < 3 ? 0x000000 : 0xffffff;
    this.face = face;

    // add to existing game 
    game.add.existing(this);
};

CardSprite.prototype = Object.create(Phaser.Sprite.prototype);
CardSprite.prototype.constructor = CardSprite;