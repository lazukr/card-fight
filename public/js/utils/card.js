/*////////////////////////////
//
//  Object meant to store the information
//  of a card.
//
*/////////////////////////////

var Card = function(suit, rank, face, sprite) {

    suit = suit || 0;
    rank = rank || 0;
    face = face || 0;

    if (typeof sprite === 'undefined') {
        sprite = null;
    }

    var _suit = suit;
    var _rank = rank;
    var _sprite = sprite;
    var _face = face;

    Object.defineProperties(this, {
        "suit": {
            writeable: false,
            get: function() {
                return _suit;
            }
        },

        "rank": {
            writeable: false,
            get: function() {
                return _rank;
            }
        },

        "face": {
            set: function(value) {
                _face = value;
                if(_sprite) {
                    _sprite.frame = _face;
                }
            },

            get: function() {
                return _face;
            }
        }
    });
};

Card.prototype.constructor = Card;