/*////////////////////////////
//
//  Object meant to handle interactions
//  with cards.
//
*/////////////////////////////

var CardGroup = function(game) {

    Phaser.Group.call(this, game);

    // allows for inputs on the cards
    this.inputEnableChildren = true;

    // setting mouse interactions for the cards
    this.onChildInputDown.add(function(card) {
        card.tint = 0xFFCC88;
        card.face = +!card.face;
        //console.log(this.getAll('face', 0));
    }, this);
    this.onChildInputOver.add(function(card) {
        card.tint = 0xCCFF88;
    }, this);
    this.onChildInputOut.add(function(card) {
        card.tint = 0xFFFFFF;
    }, this);
};

CardGroup.prototype = Object.create(Phaser.Group.prototype);
CardGroup.prototype.constructor = CardGroup;

CardGroup.prototype.collapse = function() {
    this.align(-1, 1, 0, 0);
};

CardGroup.prototype.deal = function(rows, columns, cellWidth, cellHeight) {
    this.align(rows, columns, cellWidth, cellHeight);
};