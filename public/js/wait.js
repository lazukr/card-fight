var waitState = {


    create: function() {

        var title = game.add.text(game.width/2, game.height/2, waitText['title']);
        var index = 0;
        var waitDots = ['', '.', '..', '...'];
        title.anchor.set(0.5, 0.5);

        var waitFunction = function() {
            index = (index + 1) % waitDots.length;
            title.text = waitText['title'] + waitDots[index];
        }

        Client.readyToShuffle();

        game.time.events.loop(Phaser.Timer.SECOND*0.5, waitFunction, this);
    }
}