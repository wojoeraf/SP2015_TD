/**
 * Created by Felix on 13.05.15.
 */


Menu.Level1 = function(game){

}
//Map und Ebene
var map;
var layer;
//1.Welle + 2.Welle
var sprite;
var sprite2;
var sprite3;
//2.Welle zusätzlich
var sprite4;
var sprite5;
var sprite6;

//Weg-Punkte
var marker=null;
var myPoint1 = new Phaser.Point(600,190);
var myPoint2 = new Phaser.Point(600,400);
var myPoint3 = new Phaser.Point(300,400);
var myPoint4 = new Phaser.Point(300,150);
var myPoint5 = new Phaser.Point(0,150);
//NextWave-Button gedrückt?
var bool = false;

var array;
//Obere Leiste (Score,XP etc..)
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
var coins = 70;
var coinText;


//Tower und zugehörige Waffen speichern
var bullets = [0,0,0,0,0,0,0,0,0];
var towers=[0,0,0,0,0,0,0,0,0,0];
var towerC=0;

//Welcher TowerButton wurde gedrückt -> unterschiedliche Tower
var towerButton=-1;

//Counter Welle 1
var counterA=0;
var counterB=0;
var counterC=0;
//Counter Welle 2
var counterD=0;
var counterE=0;
var counterF=0;
var counterG=0;
var counterH=0;
var counterI=0;
var counterArray=[counterA,counterB,counterC];
var counterArray1=[counterD,counterE,counterF,counterG,counterH,counterI];
var enemyWaveNr=0;


//PopUp

var popup;
var backButton;
var quitButton;


Menu.Level1.prototype = {



    //Alle Dateien des 1. Levels laden
    preload: function(){

         this.load.tilemap('map', 'assets/tilemaps/csv/newMap.csv', null, Phaser.Tilemap.CSV);
         this.load.image('tiles', 'assets/tilemaps/tiles/grass-tiles-2-small.png');
        //Wave 1
         this.load.spritesheet('player', 'assets/sprites/spaceman.png', 16, 16);
         this.load.spritesheet('player2', 'assets/sprites/spaceman.png',16,16);
         this.load.spritesheet('player3', 'assets/sprites/spaceman.png', 16,16);
        //Wave 2
        this.load.spritesheet('player', 'assets/sprites/spaceman.png', 16, 16);
        this.load.spritesheet('player2', 'assets/sprites/spaceman.png',16,16);
        this.load.spritesheet('player3', 'assets/sprites/spaceman.png', 16,16);
        this.load.spritesheet('player4', 'assets/sprites/spaceman.png', 16, 16);
        this.load.spritesheet('player5', 'assets/sprites/spaceman.png',16,16);
        this.load.spritesheet('player6', 'assets/sprites/spaceman.png', 16,16);

        this.load.spritesheet('tower', 'assets/sprites/block.png',32,32);
        this.load.spritesheet('tower1', 'assets/sprites/Tower1.png');
        this.load.spritesheet('tower2Text', 'assets/sprites/Tower22.png');
        this.load.spritesheet('tower2', 'assets/sprites/tower2.png',32,32);
        this.load.spritesheet('xpBar2', 'assets/sprites/xpBar2.png');
        this.load.spritesheet('heart', 'assets/sprites/heart.png');
        this.load.spritesheet('diamond','assets/sprites/diamond.png');
        this.load.spritesheet('coin', 'assets/sprites/coin1.png');
        this.load.spritesheet('bullet', 'assets/sprites/bullet.png',8,8);
        this.load.spritesheet('bullet2','assets/sprites/slime.png',14,14);

        this.load.image('background','assets/sprites/background3.png');

         },



    create: function (game) {
        //Physics-Engine laden
        this.physics.startSystem(Phaser.Physics.ARCADE);
        //Spielfeld laden
         map = this.add.tilemap('map', 64, 64);
         map.addTilesetImage('tiles');
        // SetCollision-Tiles
         map.setCollision(0);
         //  Create our layer
         layer = map.createLayer(0);
         //  Resize the world
         layer.resizeWorld();



        // Obere Leiste laden mit Daten wie Leben, Score und XP
        scoreText = this.add.text(730,20,"Score: " +score);
        this.add.text(400,20, "XP: ");
        xpBar =  this.add.image(470, 30, 'xpBar2');
        xpBar.scale.set(0.2);
        xpBar.scale.x=0.0;
        coin = this.add.image(60,22,'coin',1);
        coin.scale.set(0.9);
        coinText=this.add.text(100,20,coins);
        diamond = this.add.sprite(160,22,'diamond');
        diamond.scale.set(0.9);
        diamondText = this.add.text(200,20,diamonds);
        heart= this.add.sprite(250,22,'heart');
        heart.scale.set(0.5);
        heartText = this.add.text(290,20,life);

        //Next-Wave-Button und Tower-Buttons hinzufügen
        this.add.button(850,630,'buttonPlay',this.boolF,this);
        this.add.button(50,630,'tower1',this.addTower,this);
        this.add.button(200,630,'tower2Text',this.addTower2,this);

        //Popup-Button
        this.add.button(850,100,'buttonPlay',this.popUp,this);


    },


    update: function () {


        //Wenn Next-Wave gedrückt wurde -> Enemies laufen den Weg entlang
        if(bool==true){
            if((array[0]==5)&&(array[1]==5)&&(array[2]==5)){
                bool=false;
                enemyWaveNr=2;
            }
            //1.Welle
            if(enemyWaveNr==1){
            if(array[0]!=5){
            this.nextWave(sprite,0);
            }
            if(array[1]!=5){
                this.nextWave(sprite2,1);
            }
            if(array[2]!=5){
                this.nextWave(sprite3,2);
            }
                var spriteArray = [sprite,sprite2,sprite3];
                this.checkColl(spriteArray,counterArray);
            }

            if(bool==true){
            //2.Welle
             if(enemyWaveNr==2){
               if(array[0]!=5){
                   this.nextWave(sprite,0);
               }
               if(array[1]!=5){
                   this.nextWave(sprite2,1);
               }
               if(array[2]!=5){
                   this.nextWave(sprite3,2);
               }
               if(array[3]!=5){
                   this.nextWave(sprite4,3);
               }
               if(array[4]!=5){
                   this.nextWave(sprite5,4);
               }
               if(array[5]!=5){
                   this.nextWave(sprite6,5);
               }
               var spriteArray = [sprite,sprite2,sprite3,sprite4,sprite5,sprite6];
               this.checkColl(spriteArray,counterArray1);
             }
           }
        }
        //Marker -> Rechteck -> Turm platzieren
         if(marker!=null){
            marker.x = this.input.mousePointer.x;
            marker.y = this.input.mousePointer.y;
            try{
                //Nur auf grünen Flächen dürfen Türme gebaut werden!
            if(((map.getTile(Math.round(marker.x/64),Math.round(marker.y/64)).index)==3)||
                ((map.getTile(Math.round((marker.x-32)/64),Math.round(marker.y/64)).index)==3)||
                ((map.getTile(Math.round((marker.x+32)/64),Math.round(marker.y/64)).index)==3)||
                ((map.getTile(Math.round(marker.x/64),Math.round((marker.y-32)/64)).index)==3)||
                ((map.getTile(Math.round(marker.x/64),Math.round((marker.y+32)/64)).index)==3))
                {
                marker.lineStyle(2, 0xff0000, 1);
                marker.drawRect(0, 0, 32, 32);
            }
            else{
               marker.lineStyle(2, 0x000000, 1);
               marker.drawRect(0, 0, 32, 32);
               var c =  this.physics.arcade.collide(marker.x,marker.y, 'tower1');
            if (this.input.mousePointer.isDown==true)
            {
          if(c==false){

              //Je nach Tower -> unterschiedliche Eigenschaften (Reichweite etc..)
              if(towerButton==0){
                  if((coins-30)>=0){
                towers[towerC]=this.add.sprite(marker.x,marker.y,'tower');
                towers[towerC].typ=0;
                towers[towerC].cost=30;
                coins=coins-30;
                coinText.destroy();
                coinText=this.add.text(100,20,coins);
                bullets[towerC] = this.add.sprite(marker.x,marker.y,'bullet');
                bullets[towerC].visible=false;
                this.physics.enable(towers[towerC], Phaser.Physics.ARCADE);
                this.physics.enable(bullets[towerC], Phaser.Physics.ARCADE);
                towerC++;
                marker.destroy();
                marker=null;
                  }
                    }
               else if(towerButton==1){
                   if((coins-70)>=0){
                        towers[towerC]=this.add.sprite(marker.x,marker.y,'tower2');
                        towers[towerC].typ=1;
                        towers[towerC].cost=70;
                        coins=coins-70;
                        coinText.destroy();
                        coinText=this.add.text(100,20,coins);
                        bullets[towerC] = this.add.sprite(marker.x,marker.y,'bullet2');
                        bullets[towerC].visible=false;
                        this.physics.enable(towers[towerC], Phaser.Physics.ARCADE);
                        this.physics.enable(bullets[towerC], Phaser.Physics.ARCADE);
                        towerC++;
                        marker.destroy();
                        marker=null;
                   }
                 }
                }
            }
            }

        }
            catch(e){

            }
        }

},

    //TowerTyp 1 hinzufügen
    addTower: function () {


        if(marker!=null){
            marker.destroy();
            marker=null;
        }
        else{
        towerButton=0;
        marker = this.add.graphics();
        marker.lineStyle(2, 0x000000, 1);
        marker.drawRect(0, 0, 32, 32);
        marker.x = this.input.mousePointer.x;
        marker.y = this.input.mousePointer.y;
        }
    },

    //TowerTyp 2 hinzufügen
    addTower2: function () {

        if(marker!=null){
            marker.destroy();
            marker=null;
        }
        else{
            towerButton=1;
            marker = this.add.graphics();
            marker.lineStyle(2, 0x000000, 1);
            marker.drawRect(0, 0, 32, 32);
            marker.x = this.input.mousePointer.x;
            marker.y = this.input.mousePointer.y;
        }

    },

    //Nächste Enemy-Welle starten
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

                    if((life-1)>=-1){
                    life = life-1;
                    heartText.destroy();
                    heartText = this.add.text(290,20,life);
                    }

                    if(life==0){
                        this.add.text(350,300,"GAME OVER");
                        this.state.start("MainMenu");
                    }
                    break;
                }
                break;
        }
    },

    //Je nach Welle -> Sprites hinzufügen
    boolF : function(){

        if(enemyWaveNr==0){
            sprite = this.add.sprite(1000, 190, 'player', 1);
            sprite.animations.add('left', [8,9], 10, true);
            sprite.animations.add('right', [1,2], 10, true);
            sprite.animations.add('up', [11,12,13], 10, true);
            sprite.animations.add('down', [4,5,6], 10, true);
            sprite.speed=60;
            sprite.visible=false;
            sprite.life=5;
            this.physics.enable(sprite, Phaser.Physics.ARCADE);

            sprite2 = this.add.sprite(1040, 190, 'player2', 1);
            sprite2.animations.add('left', [8,9], 10, true);
            sprite2.animations.add('right', [1,2], 10, true);
            sprite2.animations.add('up', [11,12,13], 10, true);
            sprite2.animations.add('down', [4,5,6], 10, true);
            sprite2.speed=60;
            sprite2.visible=false;
            sprite2.life=5;
            this.physics.enable(sprite2, Phaser.Physics.ARCADE);

            sprite3= this.add.sprite(1080, 190, 'player3', 1);
            sprite3.animations.add('left', [8,9], 10, true);
            sprite3.animations.add('right', [1,2], 10, true);
            sprite3.animations.add('up', [11,12,13], 10, true);
            sprite3.animations.add('down', [4,5,6], 10, true);
            sprite3.speed=60;
            sprite3.visible=false;
            sprite3.life=5;
            this.physics.enable(sprite3, Phaser.Physics.ARCADE);

            array=[0,0,0];
            enemyWaveNr=1;
            bool = true;
        }
        //2.Welle
        else if(enemyWaveNr==2){
            sprite = this.add.sprite(1000, 190, 'player', 1);
            sprite.animations.add('left', [8,9], 10, true);
            sprite.animations.add('right', [1,2], 10, true);
            sprite.animations.add('up', [11,12,13], 10, true);
            sprite.animations.add('down', [4,5,6], 10, true);
            sprite.speed=70;
            sprite.visible=false;
            sprite.life=10;
            this.physics.enable(sprite, Phaser.Physics.ARCADE);

            sprite2 = this.add.sprite(1040, 190, 'player2', 1);
            sprite2.animations.add('left', [8,9], 10, true);
            sprite2.animations.add('right', [1,2], 10, true);
            sprite2.animations.add('up', [11,12,13], 10, true);
            sprite2.animations.add('down', [4,5,6], 10, true);
            sprite2.speed=70;
            sprite2.visible=false;
            sprite2.life=10;
            this.physics.enable(sprite2, Phaser.Physics.ARCADE);

            sprite3= this.add.sprite(1080, 190, 'player3', 1);
            sprite3.animations.add('left', [8,9], 10, true);
            sprite3.animations.add('right', [1,2], 10, true);
            sprite3.animations.add('up', [11,12,13], 10, true);
            sprite3.animations.add('down', [4,5,6], 10, true);
            sprite3.speed=70;
            sprite3.visible=false;
            sprite3.life=10;
            this.physics.enable(sprite3, Phaser.Physics.ARCADE);

            sprite4= this.add.sprite(1120, 190, 'player4', 1);
            sprite4.animations.add('left', [8,9], 10, true);
            sprite4.animations.add('right', [1,2], 10, true);
            sprite4.animations.add('up', [11,12,13], 10, true);
            sprite4.animations.add('down', [4,5,6], 10, true);
            sprite4.speed=70;
            sprite4.visible=false;
            sprite4.life=10;
            this.physics.enable(sprite4, Phaser.Physics.ARCADE);

            sprite5= this.add.sprite(1160, 190, 'player5', 1);
            sprite5.animations.add('left', [8,9], 10, true);
            sprite5.animations.add('right', [1,2], 10, true);
            sprite5.animations.add('up', [11,12,13], 10, true);
            sprite5.animations.add('down', [4,5,6], 10, true);
            sprite5.speed=70;
            sprite5.visible=false;
            sprite5.life=10;
            this.physics.enable(sprite5, Phaser.Physics.ARCADE);

            sprite6= this.add.sprite(1200, 190, 'player6', 1);
            sprite6.animations.add('left', [8,9], 10, true);
            sprite6.animations.add('right', [1,2], 10, true);
            sprite6.animations.add('up', [11,12,13], 10, true);
            sprite6.animations.add('down', [4,5,6], 10, true);
            sprite6.speed=70;
            sprite6.visible=false;
            sprite6.life=10;
            this.physics.enable(sprite6, Phaser.Physics.ARCADE);

            array=[0,0,0,0,0,0];
            enemyWaveNr=2;
            bool=true;
        }
    },

    //Collision zwischen Sprite und Bullets der Tower überprüfen
    checkColl : function(spriteArray,counterArray){
        if(bool==true){
            for(var i=0;i<towerC;i++){
                for(var j=0;j<spriteArray.length;j++){
                if(array[j]!=5){
                    var speeed;
                    var reach;
                    if(towers[i].typ==0){
                        speeed=250;
                        reach=100;
                    }
                    else if(towers[i].typ=1){
                        speeed=600;
                        reach=300;
                    }
                    if(this.physics.arcade.distanceBetween(towers[i], spriteArray[j]) < reach){
                        this.physics.enable(bullets[i], Phaser.Physics.ARCADE);
                        this.physics.enable(bullets[i],spriteArray[j] );
                        bullets[i].visible=true;
                        var bullet = bullets[i];
                        if(counterArray[j]==0){
                            bullet.reset(towers[i].x, towers[i].y);
                            counterArray[j] =1;
                        }
                        this.physics.arcade.moveToObject(bullet, spriteArray[j], speeed);
                        var col = this.physics.arcade.collide(bullet,spriteArray[j]);
                        if(col==true){
                            counterArray[j]=0;
                            spriteArray[j].life=spriteArray[j].life-1;
                            if(spriteArray[j].life<=0){

                                spriteArray[j].visible=false;
                                spriteArray[j].destroy();
                                spriteArray[j]=null;
                                coins = coins + 5;
                                coinText.destroy();
                                coinText = this.add.text(100,20,coins);
                                score = score + 100;
                                scoreText.destroy();
                                scoreText = this.add.text(730,20,"Score: " +score);
                                xpBar.scale.x=xpBar.scale.x+0.01;
                                if(xpBar.scale.x>0.34){
                                    xpBar.scale.set(0.2);
                                    xpBar.scale.x=0.0;
                                }
                                array[j]=5;
                                bullet.reset(towers[i].x, towers[i].y);
                                bullet.visible=false;

                            }
                        }

                    }

                }

            }
            }

    }





},
    //Popup-Menü öffen und je nach Button verlinken
    popUp : function(){

        this.state.pause();
        popup = this.add.sprite(this.world.centerX, this.world.centerY, 'background');
        popup.alpha = 0.8;
        popup.anchor.set(0.5);
        popup.inputEnabled = true;
        backButton= this.add.button(this.world.centerX-40 ,this.world.centerY+150,'buttonBack',this.closeWindow,this);
        quitButton = this.add.button(this.world.centerX-80, this.world.centerY+20, 'buttonPlay', this.quit,this);

    },

    closeWindow: function(){
        quitButton.destroy();
        backButton.destroy();
        popup.destroy();

    },

    quit : function(){
        this.state.clearCurrentState();
        this.state.start("MainMenu");

    }





}
