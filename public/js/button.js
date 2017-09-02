var LabelButton = function(game, x, y, label, tint, callback, callbackContext) {  
    Phaser.Button.call(this, game, x, y, 'button', callback, callbackContext, 1, 2, 0); 
    this.label = new Phaser.Text(game, 0, 0, label);
    this.addChild(this.label);
    this.setLabel(label);

    this.anchor.setTo(0.5, 0.5);
    this.label.anchor.setTo(0.5, 0.5);
    this.tint = tint[0];
    
    // private variable for toggling between tints
    var _tint = tint;

    // defines a property that updates inputEnabled and tint automatically
    Object.defineProperty(this, "enabled", {
        set: function(value) {
            this.inputEnabled = value;
            this.tint = _tint[+value];
        },
        get: function() {
            return this.inputEnabled;
        }
    });

    // add to game
    game.add.existing(this);
};

LabelButton.prototype = Object.create(Phaser.Button.prototype);
LabelButton.prototype.constructor = LabelButton;
LabelButton.prototype.setLabel = function(label) {    
    this.label.setText(label);
};