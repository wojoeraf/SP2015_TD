/**
 * Created by Felix on 13.05.15.
 */


Menu.Level1 = function(game){

}
//Map und Ebene
var map;
var layer;




//Weg-Punkte
var marker=null;
var myPoint1 = new Phaser.Point(600,190);
var myPoint2 = new Phaser.Point(600,400);
var myPoint3 = new Phaser.Point(300,400);
var myPoint4 = new Phaser.Point(300,150);
var myPoint5 = new Phaser.Point(0,150);
//NextWave-Button gedrückt?
var bool = false;



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

var array = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var counterArray= [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
var enemyWaveNr=0;
var sprites = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var enemyNumber;

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

        bool = false;

    },


    update: function () {

        //Wenn Next-Wave gedrückt wurde -> Enemies laufen den Weg entlang
        if(bool==true){
                var x=false;
                for(var i=0;i<enemyNumber;i++){
                    if(array[i]!=5){
                        this.nextWave(sprites[i],i);
                        x = true;
                    }
                }
                this.checkColl(sprites,counterArray);
                if(x==false){
                    bool= false;
                    enemyWaveNr=enemyWaveNr+1;
                    coins = coins +60;
                    coinText.destroy();
                    coinText= this.add.text(100,20,coins);
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
                        bool=false;
                        enemyWaveNr=0;
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
            this.buildWave(1,3,60,5);
        }
        //2.Welle
        else if(enemyWaveNr==1){
            this.buildWave(1,5,70,7);
        }
        else if (enemyWaveNr==2){
           this.buildWave(1,8,80,10);
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
        bool=false;
        enemyWaveNr=0;
        this.state.clearCurrentState();
        this.state.start("MainMenu");

    },

    buildWave: function(spriteType,number,speed,lfs){


        enemyNumber=number;
        for(var i=0;i<number;i++){

            if(spriteType==1) {
                if(i==0) sprites[i] = this.add.sprite(1000 ,190, 'player', 1);
                else if(i==1) sprites[i] = this.add.sprite(1025, 190, 'player', 1);
                else if(i==2) sprites[i] = this.add.sprite(1050, 190, 'player', 1);
                else if(i==3) sprites[i] = this.add.sprite(1075, 190, 'player', 1);
                else if(i==4) sprites[i] = this.add.sprite(1100, 190, 'player', 1);
                else if(i==5) sprites[i] = this.add.sprite(1125, 190, 'player', 1);
                else if(i==6) sprites[i] = this.add.sprite(1150, 190, 'player', 1);
                else if(i==7) sprites[i] = this.add.sprite(1175, 190, 'player', 1);
                else if(i==8) sprites[i] = this.add.sprite(1200, 190, 'player', 1);
                else if(i==9) sprites[i] = this.add.sprite(1225, 190, 'player', 1);
                else if(i==10) sprites[i] = this.add.sprite(1250, 190, 'player', 1);
                else if(i==11) sprites[i] = this.add.sprite(1275, 190, 'player', 1);
                else if(i==12) sprites[i] = this.add.sprite(1300, 190, 'player', 1);
                sprites[i].animations.add('left', [8, 9], 10, true);
                sprites[i].animations.add('right', [1, 2], 10, true);
                sprites[i].animations.add('up', [11, 12, 13], 10, true);
                sprites[i].animations.add('down', [4, 5, 6], 10, true);
                sprites[i].speed = speed;
                sprites[i].visible = false;
                sprites[i].life = lfs;
                this.physics.enable(sprites[i], Phaser.Physics.ARCADE);
                array[i]=0;
            }
            else if (spriteType==2){


            }

        }

        bool = true;

    }





}
