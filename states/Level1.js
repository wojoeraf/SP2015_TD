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
var marker=null;
var blocked = false;
var myPoint1 = new Phaser.Point(600,190);
var myPoint2 = new Phaser.Point(600,400);
var myPoint3 = new Phaser.Point(300,400);
var myPoint4 = new Phaser.Point(300,150);
var myPoint5 = new Phaser.Point(0,150);
var bool = false;
var array=[0,0,0];
var addCounter=0;


Menu.Level1.prototype = {


    preload: function(){



         this.load.tilemap('map', 'assets/tilemaps/csv/newMap.csv', null, Phaser.Tilemap.CSV);
         this.load.image('tiles', 'assets/tilemaps/tiles/grass-tiles-2-small.png');
         this.load.spritesheet('player', 'assets/sprites/spaceman.png', 16, 16);
         this.load.spritesheet('player2', 'assets/sprites/spaceman2.png',16,16);
         this.load.spritesheet('player3', 'assets/sprites/spaceman3.png', 16,16);
         this.load.spritesheet('tower', 'assets/sprites/block.png',32,32);
        this.load.spritesheet('tower1', 'assets/sprites/Tower1.png');


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
        sprite = this.add.sprite(997, 210, 'player', 1);
        sprite.animations.add('left', [8,9], 10, true);
        sprite.animations.add('right', [1,2], 10, true);
        sprite.animations.add('up', [11,12,13], 10, true);
        sprite.animations.add('down', [4,5,6], 10, true);
        sprite.speed=55;
        sprite.visible=false;
        //sprite.body.setSize(10, 14, 2, 1);
        this.physics.enable(sprite, Phaser.Physics.ARCADE);



        sprite2 = this.add.sprite(1008, 240, 'player2', 1);
        sprite2.animations.add('left', [8,9], 10, true);
        sprite2.animations.add('right', [1,2], 10, true);
        sprite2.animations.add('up', [11,12,13], 10, true);
        sprite2.animations.add('down', [4,5,6], 10, true);
        sprite2.speed=50;
        sprite2.visible=false;

        this.physics.enable(sprite2, Phaser.Physics.ARCADE);


        sprite3= this.add.sprite(1000, 190, 'player3', 1);
        sprite3.animations.add('left', [8,9], 10, true);
        sprite3.animations.add('right', [1,2], 10, true);
        sprite3.animations.add('up', [11,12,13], 10, true);
        sprite3.animations.add('down', [4,5,6], 10, true);
        sprite3.speed=80;
        sprite3.visible=false;

        this.physics.enable(sprite3, Phaser.Physics.ARCADE);

        this.add.button(850,630,'buttonPlay',this.boolF,this);
        this.add.button(150,630,'tower1',this.addTower,this);







    },


    update: function () {


        if(bool==true){

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


        if(marker!=null){
        marker.x = this.input.mousePointer.x;
        marker.y = this.input.mousePointer.y;
        }

    },


    addTower: function () {




        marker = this.add.graphics();
        marker.lineStyle(2, 0x000000, 1);
        marker.drawRect(0, 0, 32, 32);


        marker.x = this.input.mousePointer.x;
        marker.y = this.input.mousePointer.y;











    },

    nextWave : function(player,arraynumber){
        if(marker!=null){
            marker.destroy();
            marker=null;
        }
        this.physics.arcade.collide(player, layer);


        var a = array[arraynumber];


        if(player.x<990){
            player.visible=true;
        }
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





    },

    boolF : function(){
        if(bool==false){
            bool=true;
        }
        else{
            bool=false;
        }
    }







}
