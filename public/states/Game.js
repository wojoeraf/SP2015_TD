Menu.Game = function () {

    //  When a State is added to Phaser it automatically has the following properties set on it, even if they already exist:

    this.game;      //  a reference to the currently running game (Phaser.Game)
    this.add;       //  used to add sprites, text, groups, etc (Phaser.GameObjectFactory)
    this.camera;    //  a reference to the game camera (Phaser.Camera)
    this.cache;     //  the game cache (Phaser.Cache)
    this.input;     //  the global input manager. You can access this.input.keyboard, this.input.mouse, as well from it. (Phaser.Input)
    this.load;      //  for preloading assets (Phaser.Loader)
    this.math;      //  lots of useful common math operations (Phaser.Math)
    this.sound;     //  the sound manager - add a sound, play one, set-up markers, etc (Phaser.SoundManager)
    this.stage;     //  the game stage (Phaser.Stage)
    this.time;      //  the clock (Phaser.Time)
    this.tweens;    //  the tween manager (Phaser.TweenManager)
    this.state;     //  the state manager (Phaser.StateManager)
    this.world;     //  the game world (Phaser.World)
    this.particles; //  the particle manager (Phaser.Particles)
    this.physics;   //  the physics manager (Phaser.Physics)
    this.rnd;       //  the repeatable random number generator (Phaser.RandomDataGenerator)

    //  You can use any of these from any function within this State.
    //  But do consider them as being 'reserved words', i.e. don't create a property for your own game called "world" or you'll over-write the world reference.

};


//TODO
var map;
var layer;
Menu.Game.prototype = {


    preload: function () {


        player.lastGame.score = 0;
        player.lastGame.level = 0;



        bool = false;
        enemyWaveNr = 0;
        life = 5;
        coins = 70;
        score = 0;
        diamonds = player.diamonds;

        console.log(player.achievements);

        if (player.loggedIn && player.achievements[0] != 1){
            player.achievements = [1];
            console.log(player.achievements);

            var data = {
                name: player.name,
                achievement: player.achievements
            }

            $(function () {
                $.ajax({
                        method: 'post',
                        url: 'achievements',
                        dataType: 'JSON',
                        data: data
                    }
                ).done(function (data, status) {

                    });
            });

        }


        //Alle Tower zerstören
        for (var k = 0; k < towerC; k++) {
            if (towers[k].isDestroyed == false) {
                towers[k].destroy();
                towers[k] = 0;
            }
        }

        if (levelchooser == 1) {
            this.state.start("Level1");
        }
        else if (levelchooser == 2) {
            this.state.start("Level2");
        }
        else {
            this.state.start('Level3');
        }


    },

    update: function () {

        if (levelchooser == 1) {
            this.state.start("Level1");
        }
        else if (levelchooser == 2) {
            this.state.start("Level2");
        }
        else {
            this.state.start('Level3');
        }


    },

    quitGame: function () {

    }

};
