/**
 * Created by Felix on 13.05.15.
 */


Menu.Level1 = function(game){



}

var map;
var layer;
var sprite;
var sprite2;
var sprite3;
var marker=null;
var myPoint1 = new Phaser.Point(600,190);
var myPoint2 = new Phaser.Point(600,400);
var myPoint3 = new Phaser.Point(300,400);
var myPoint4 = new Phaser.Point(300,150);
var myPoint5 = new Phaser.Point(0,150);
var bool = false;
var array=[0,0,0];
var score = 1;
var scoreText;
var xpBar;
var life = 5;
var heart;
var heartText;
var diamond;
var diamonds=10;
var diamondText;
var coin;
var coins = 100;
var coinText;

Menu.Level1.prototype = {


    preload: function(){



         this.load.tilemap('map', 'assets/tilemaps/csv/newMap.csv', null, Phaser.Tilemap.CSV);
         this.load.image('tiles', 'assets/tilemaps/tiles/grass-tiles-2-small.png');
         this.load.spritesheet('player', 'assets/sprites/spaceman.png', 16, 16);
         this.load.spritesheet('player2', 'assets/sprites/spaceman2.png',16,16);
         this.load.spritesheet('player3', 'assets/sprites/spaceman3.png', 16,16);
         this.load.spritesheet('tower', 'assets/sprites/block.png',32,32);
         this.load.spritesheet('tower1', 'assets/sprites/Tower1.png');
         this.load.spritesheet('xpBar2', 'assets/sprites/xpBar2.png');
         this.load.spritesheet('heart', 'assets/sprites/heart.png');
        this.load.spritesheet('diamond','assets/sprites/diamond.png');
        this.load.spritesheet('coin', 'assets/sprites/coin1.png');

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



        scoreText = this.add.text(800,20,"Score: " +score);



        this.add.text(400,20, "XP: ");
        xpBar =  this.add.image(470, 30, 'xpBar2');
        xpBar.scale.set(0.2);
        xpBar.scale.x=0.1;


        coin = this.add.image(60,22,'coin',1);
        coin.scale.set(0.9);
        coinText=this.add.text(100,20,coins);


        diamond = this.add.sprite(160,22,'diamond');
        diamond.scale.set(0.9);
        diamondText = this.add.text(200,20,diamonds);




        heart= this.add.sprite(250,22,'heart');
        heart.scale.set(0.5);
        heartText = this.add.text(290,20,life);




        this.add.button(850,630,'buttonPlay',this.boolF,this);
        this.add.button(50,630,'tower1',this.addTower,this);



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
            var c =  this.physics.arcade.collide(marker.x,marker.y, 'tower1');

            if (this.input.mousePointer.isDown==true)
            {


                if(c==false){

                this.add.sprite(marker.x,marker.y,'tower');
                marker.destroy();
                marker=null;

                }

            }

        }

    },


    addTower: function () {

        if(marker!=null){


            marker.destroy();
            marker=null;


        }
        else{


        marker = this.add.graphics();
        marker.lineStyle(2, 0x000000, 1);
        marker.drawRect(0, 0, 32, 32);


        marker.x = this.input.mousePointer.x;
        marker.y = this.input.mousePointer.y;

        }









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
                   // score = score + 100;
                   // scoreText.destroy();
                   // scoreText = this.add.text(880,20,"Score: " +score);
                   xpBar.scale.x=xpBar.scale.x+0.01;

                    if((life-1)>=0){
                    life = life-1;
                    heartText.destroy();
                    heartText = this.add.text(290,20,life);
                    }

                    if(life==0){
                        this.add.text(350,300,"GAME OVER");
                        //this.state.start('GameOverMenu');
                    }
                    break;
                }
                break;


        }





    },

    boolF : function(){


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
            array=[0,0,0];



            bool = true;
        }









}
