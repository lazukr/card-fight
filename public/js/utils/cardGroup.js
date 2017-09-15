/*////////////////////////////
//
//  Object meant to handle interactions
//  of cards.
//
*/////////////////////////////

var CardGroup = function(game) {

    Phaser.Group.call(this, game);

    // allows for inputs on the cards
    this.inputEnableChildren = true;

    // setting mouse interactions for the cards
    this.onChildInputDown.add(function(card) {
        card.tint = 0xFFAAAA;
        card.face = +!card.face;
        //console.log(this.getAll('face', 0));
    }, this);
    this.onChildInputOver.add(function(card) {
        card.tint = 0xAAFFAA;
    }, this);
    this.onChildInputOut.add(function(card) {
        card.tint = 0xFFFFFF;
    }, this);
};

CardGroup.prototype = Object.create(Phaser.Group.prototype);
CardGroup.prototype.constructor = CardGroup;

CardGroup.prototype.collapse = function(position) {
    if (position === 'undefined') {
        position = Phaser.TOP_LEFT;
    }
    this.align(-1, 1, 0, 0, position);
};

CardGroup.prototype.deal = function(rows, columns, cellWidth, cellHeight) {
    this.align(rows, columns, cellWidth, cellHeight);
};