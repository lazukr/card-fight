var Wait = function(game) {};

Wait.prototype = {
    create: function() {

        // get JSON Text
        this.JSONText = getJSONText('wait');
        
        // define index and dots
        this.index = 0;
        this.dots = ['', '.', '..', '...'];

        // display text
        this.waitText = game.add.text(game.width/2, game.height/2, this.JSONText['title']);
        this.waitText.anchor.setTo(0.5, 0.5);

        // add event loop that appends dots onto wait text
        game.time.events.loop(Phaser.Timer.SECOND*0.5, this.wait, this);

        // tell server client is ready to move onto shuffling
        Client.readyToShuffle();
    },

    wait: function() {

        this.index = (this.index + 1) % 4;
        this.waitText.text = this.JSONText['title'] + this.dots[this.index];
    }
}