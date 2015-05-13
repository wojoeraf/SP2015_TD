/**
 * Created by Felix on 13.05.15.
 */


Menu.Level1 = function(game){

}

var map;
var layer;
var player;
var cursors;
var counter=0;
Menu.Level1.prototype = {


    preload: function(){



         this.load.tilemap('map', 'assets/tilemaps/csv/newMap.csv', null, Phaser.Tilemap.CSV);
         this.load.image('tiles', 'assets/tilemaps/tiles/grass-tiles-2-small.png');

        this.load.spritesheet('player','assets/sprites/stormlord-dragon96x64.png',96,64);


         },



    create: function () {



         map = this.add.tilemap('map', 64, 64);
         map.addTilesetImage('tiles');
         map.setCollision(0);
         //  Create our layer
         layer = map.createLayer(0);
         //  Resize the world
         layer.resizeWorld();

        player = this.add.sprite(900, 190, 'player',7);

        player.animations.add('left',[8,9],10,true);
        player.animations.add('right',[8,9],10,true);
        player.animations.add('up',[8,9],10,true);
        player.animations.add('down',[8,9],10,true);
        this.physics.enable(player, Phaser.Physics.ARCADE);

        player.body.setSize(2, 3, 2, 1);
        cursors = this.input.keyboard.createCursorKeys();


    },

    update: function () {
        var coll =this.physics.arcade.collide(player, layer);

        player.body.velocity.set(0);
        counter=counter+1;

        if(counter<170){
            player.body.velocity.x = -100;
            player.play('left');
        }
        else{
            if(counter<280){
                player.body.velocity.y=100;
                player.play('down');
            }
            else{

                if(counter<470){
                    player.body.velocity.x=-100;
                    player.play('left');
                }
                else{
                    if(counter<630){
                        player.body.velocity.y=-100;
                        player.play("up");
                    }
                    else{
                        player.body.velocity.x=-100;
                        player.play("left");
                    }
                }

            }
        }




    },

    addTower: function () {





    }





}