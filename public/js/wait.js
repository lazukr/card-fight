var waitState = {


    create: function() {

        var title = game.add.text(game.width/2, game.height/2, waitText['title']);
        var index = 0;
        var waitDots = ['', '.', '..', '...'];
        title.anchor.set(0.5, 0.5);

        var waitFunction = function() {
            index++;
            title.text = waitText['title'] + waitDots[index % waitDots.length];
        }

        Client.ready();

        game.time.events.loop(Phaser.Timer.SECOND, waitFunction, this);
    }
}