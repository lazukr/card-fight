function addButton(x, y, type, callback, tint, text) {

    var button = game.add.button(x, y, type, callback, this, 1, 2, 0);
    var text = game.add.text(x, y, text);

    button.anchor.set(0.5, 0.5);
    text.anchor.set(0.5, 0.5);

    return {

        setText: function(newText) {
            text.text = newText;
        },

        visible: function(bool) {
            button.visible = bool;
            text.visible = bool;
        }
    }
}