/*////////////////////////////
//
//  Object meant to display buttons that
//  the user can interact with
//
*/////////////////////////////


var Button = function(game, x, y, label, callback, callbackContext) {  
    Phaser.Button.call(this, game, x, y, 'button', callback, callbackContext, 1, 2, 0); 
    this.label = new Phaser.Text(game, 0, 0, label);
    this.addChild(this.label);

    this.anchor.setTo(0.5, 0.5);
    this.label.anchor.setTo(0.5, 0.5);
    this.tint = BTN_TINTS[0];

    // defines a property that updates inputEnabled and tint automatically
    Object.defineProperty(this, "enabled", {
        set: function(value) {
            this.inputEnabled = value;
            this.tint = BTN_TINTS[+!value];
        },
        get: function() {
            return this.inputEnabled;
        }
    });

    // add to game
    game.add.existing(this);
};

Button.prototype = Object.create(Phaser.Button.prototype);
Button.prototype.constructor = Button;
