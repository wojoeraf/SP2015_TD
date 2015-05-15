/**
 * Created by Felix on 13.05.15.
 */


Menu.Level1 = function(game){
    this.score=0;


}

var map;
var layer;
var pathfinder;
var cursors;
var sprite;
var sprite2;
var sprite3;
var marker;
var blocked = false;
var myPoint1 = new Phaser.Point(600,190);
var myPoint2 = new Phaser.Point(600,400);
var myPoint3 = new Phaser.Point(300,400);
var myPoint4 = new Phaser.Point(300,150);
var myPoint5 = new Phaser.Point(0,150);
var bool = false;
var array=[0,0,0];

Menu.Level1.prototype = {


    preload: function(){



         this.load.tilemap('map', 'assets/tilemaps/csv/newMap.csv', null, Phaser.Tilemap.CSV);
         this.load.image('tiles', 'assets/tilemaps/tiles/grass-tiles-2-small.png');
         this.load.spritesheet('player', 'assets/sprites/spaceman.png', 16, 16);
         this.load.spritesheet('player2', 'assets/sprites/spaceman2.png',16,16);
         this.load.spritesheet('player3', 'assets/sprites/spaceman3.png', 16,16);
         this.load.spritesheet('tower', 'assets/sprites/block.png',32,32);
         },



    create: function (game) {


        this.physics.startSystem(Phaser.Physics.ARCADE);

        //Load Map
         map = this.add.tilemap('map', 64, 64);
         map.addTilesetImage('tiles');
        // SetCollision-Tiles
         map.setCollision(0);
         //  Create our layer
         layer = map.createLayer(0);
         //  Resize the world
         layer.resizeWorld();

        //Define walkable Tilesets
        var walkables = [3];



        //Pathfinder -> ADD
        pathfinder = game.plugins.add(Phaser.Plugin.PathFinderPlugin);
        pathfinder.setGrid(map.layers[0].data, walkables);


        //Add Enemies
        sprite = this.add.sprite(900, 190, 'player', 1);
        sprite.animations.add('left', [8,9], 10, true);
        sprite.animations.add('right', [1,2], 10, true);
        sprite.animations.add('up', [11,12,13], 10, true);
        sprite.animations.add('down', [4,5,6], 10, true);
        sprite.speed=50;
        //sprite.body.setSize(10, 14, 2, 1);
        this.physics.enable(sprite, Phaser.Physics.ARCADE);



        sprite2 = this.add.sprite(850, 190, 'player2', 1);
        sprite2.animations.add('left', [8,9], 10, true);
        sprite2.animations.add('right', [1,2], 10, true);
        sprite2.animations.add('up', [11,12,13], 10, true);
        sprite2.animations.add('down', [4,5,6], 10, true);
        sprite2.speed=50;

        this.physics.enable(sprite2, Phaser.Physics.ARCADE);


        sprite3= this.add.sprite(1000, 190, 'player3', 1);
        sprite3.animations.add('left', [8,9], 10, true);
        sprite3.animations.add('right', [1,2], 10, true);
        sprite3.animations.add('up', [11,12,13], 10, true);
        sprite3.animations.add('down', [4,5,6], 10, true);
        sprite3.speed=80;

        this.physics.enable(sprite3, Phaser.Physics.ARCADE);


        marker = this.add.graphics();
        marker.lineStyle(2, 0x000000, 1);
        marker.drawRect(0, 0, 32, 32);


        bool=true;

    },


    update: function () {



        if(bool==true){
        this.physics.arcade.collide(sprite, layer);
        this.physics.arcade.collide(sprite2, layer);

            if(array[0]!=5){
            this.nextWave(sprite,0);

            }
            if(array[1]!=5){
                this.nextWave(sprite2,1);

            }
            if(array[2]!=5){
                this.nextWave(sprite3,2);
            }



        }


        marker.x = this.input.mousePointer.x;//layer.getTileX(this.input.activePointer.worldX) * 32;
        marker.y = this.input.mousePointer.y;//layer.getTileY(this.input.activePointer.worldY) * 32;


        if (this.input.mousePointer.isDown)
        {

            var col = this.physics.arcade.collide(this.input.mousePointer, layer);

                this.addTower(marker.x,marker.y);


        }
    },


    addTower: function (x,y) {

         this.add.sprite(x,y,'tower');

    },

 findPathTo: function(tilex, tiley) {

    pathfinder.setCallbackFunction(function(path) {
        path = path || [];
        for(var i = 0, ilen = path.length; i < ilen; i++) {
            map.putTile(46, path[i].x, path[i].y);
        }
        blocked = false;
    });

    pathfinder.preparePathCalculation([0,0], [tilex,tiley]);
    pathfinder.calculatePath();

 },

    nextWave : function(player,arraynumber){
        this.physics.arcade.collide(player, layer);


        var a = array[arraynumber];

        switch(a){
            case 0:
                this.physics.arcade.moveToObject(player,myPoint1,player.speed,0);
                player.animations.play('left');
                if(player.x<myPoint1.x+2){
                    array[arraynumber] = 1;
                    break;
                }
                break;

            case 1:
                player.body.velocity.x = 0;
                player.body.velocity.y = 0;
                this.physics.arcade.moveToObject(player,myPoint2,player.speed,0);
                player.animations.play('down');
                if(player.y>myPoint2.y-2){
                    array[arraynumber] = 2;
                    break;
                }
                break;


            case 2:
                player.body.velocity.x = 0;
                player.body.velocity.y = 0;
                this.physics.arcade.moveToObject(player,myPoint3,player.speed,0);
                player.animations.play('left');
                if(player.x<myPoint3.x+2){
                    array[arraynumber]=3;
                    break;
                }
                break;
            case 3:
                player.body.velocity.x = 0;
                player.body.velocity.y = 0;
                this.physics.arcade.moveToObject(player,myPoint4,player.speed,0);
                player.animations.play('up');
                if(player.y<myPoint4.y+2){
                    array[arraynumber]=4;
                    break;
                }
                break;

            case 4:
                player.body.velocity.x = 0;
                player.body.velocity.y = 0;
                this.physics.arcade.moveToObject(player,myPoint5,player.speed,0);
                player.animations.play('left');
                if(player.x<myPoint5.x+0.5){
                    player.destroy();
                    array[arraynumber]=5;
                    break;
                }
                break;


        }





        /*
        if(player.x==myPoint1.x){

            player.body.velocity.x = 0;
            player.body.velocity.y = 0;
            this.physics.arcade.moveToObject(player,myPoint2,60,0);
        }
        else if(player.y>myPoint1.y){
            player.body.velocity.x = 0;
            player.body.velocity.y = 0;
            this.physics.arcade.moveToObject(player,myPoint2,60,0);
            console.log(player.x);
            console.log("1");

            if(player.y>myPoint2.y-1){
                player.body.velocity.x = 0;
                player.body.velocity.y = 0;
                this.physics.arcade.moveToObject(player,myPoint3,60,0);

              if(player.x<myPoint3.x+2){
                 player.body.velocity.x = 0;
                 player.body.velocity.y = 0;
                  this.physics.arcade.moveToObject(player,myPoint4,60,0);

              }

            }

        }

            //alert('test condition');

         //this.physics.arcade.moveToObject(sprite,myPoint2,60,0);
         //player.animations.play('down');

*/

    }





}
