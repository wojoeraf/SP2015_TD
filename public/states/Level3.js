/**
 * Created by Felix on 19.06.2015.
 */


Menu.Level3 = function(game){
    this.helpers = new Helpers.Menu();
}

Menu.Level3.prototype = {


    //Alle Dateien des 1. Levels laden
    preload: function(){

        this.visiblePoint=990;
        this.myPoint1 = new Phaser.Point(860,530);
        this.myPoint2 = new Phaser.Point(860,215);
        this.myPoint3 = new Phaser.Point(350,215);
        this.myPoint4 = new Phaser.Point(350,350);
        this.myPoint5 = new Phaser.Point(100,350);
        this.myPoint6 = new Phaser.Point(100,280);
        this.myPoint7 = new Phaser.Point(0,280);
        this.start = new Phaser.Point(1000,530);
        //Map
        this.load.tilemap('map', 'assets/tilemaps/csv/newMap3.csv', null, Phaser.Tilemap.CSV);
        this.load.image('tiles', 'assets/tilemaps/tiles/grass-tiles-2-small.png');
    },

    create: function (game) {

        //Physics-Engine laden
        this.physics.startSystem(Phaser.Physics.ARCADE);
        //Spielfeld laden
        map = this.add.tilemap('map', 64, 64);
        map.addTilesetImage('tiles');
        //  Create our layer
        layer = map.createLayer(0);
        //  Resize the world
        layer.resizeWorld();


        //Verfügbare Leben
        life = 5;

        // Obere Leiste laden mit Daten wie Leben, Score und XP
        scoreText = this.add.text(730,20,"Score: " +score);
        this.add.text(400,20, "XP: ");
        xpBar =  this.add.image(470, 30, 'xpBar2');
        xpBar.scale.set(0.2);
        xpBar.scale.x=0.0;
        coins=70;
        coin = this.add.image(60,22,'coin',1);
        coin.scale.set(0.9);
        coinText=this.add.text(100,20,coins);
        diamond = this.add.sprite(160,22,'diamond');
        diamond.scale.set(0.9);
        diamondText = this.add.text(200,20,diamonds);
        diamondButton=this.add.button(160,22,'diamond',this.diamondClicked,this);
        diamondButton.scale.set(0.9);
        heart= this.add.sprite(250,22,'heart');
        heart.scale.set(0.5);
        heartText = this.add.text(290,20,life);

        //Next-Wave-Button und Tower-Buttons hinzufügen
        this.add.button(850,630,'buttonPlay',this.boolF,this);
        button1 = this.add.button(50,630,'tower1',this.addTower,this);
        button1.events.onInputOver.add(this.helpers.infoTower1,this);
        button1.events.onInputOut.add(this.helpers.infoTower1Delete,this);

        button2 = this.add.button(200,630,'tower2Text',this.addTower2,this);
        button2.events.onInputOver.add(this.helpers.infoTower2,this);
        button2.events.onInputOut.add(this.helpers.infoTower2Delete,this);

        //NEW-Button3
        button3 = this.add.button(350,630,'tower3Text',this.addTower3,this);
        button3.events.onInputOver.add(this.helpers.infoTower3,this);
        button3.events.onInputOut.add(this.helpers.infoTower3Delete,this);

        //NEW-Button4
        button4 = this.add.button(500,630,'tower4Text',this.addTower4,this);
        button4.events.onInputOver.add(this.helpers.infoTower4,this);
        button4.events.onInputOut.add(this.helpers.infoTower4Delete,this);



        //Popup-Button
        this.add.button(850,100,'buttonPlay',this.popUp,this);
        //NextWave-Sperre, nur wenn auf true geändert-> nächste Enemy-Welle
        bool = false;

    },

    update: function () {

        this.helpers.createHealthbars();
        //Wenn Next-Wave gedrückt wurde -> Enemies laufen den Weg entlang
        this.helpers.enemiesRun(this);
        //Marker -> Rechteck -> Turm platzieren
        this.helpers.towerBuilding(this);
    },
    //TowerTyp 1 hinzufügen
    addTower: function () {
        this.helpers.addTower(this);
    },
    //TowerTyp 2 hinzufügen
    addTower2: function () {
        this.helpers.addTower2(this);
    },
    addTower3 : function(){
        this.helpers.addTower3(this);
    },
    addTower4: function(){
        this.helpers.addTower4(this);
    },
    //Je nach Welle -> Sprites hinzufügen (Aufruf von buildWave(EnemyTyp,Anzahl,Speed,Lifes)
    boolF : function(){


        if(enemyWaveNr==0){
            this.helpers.wave1(this.start.x,this.start.y,this);
        }
        //2.Welle
        else if(enemyWaveNr==1){
            this.helpers.wave2(this.start.x,this.start.y,this);
        }
        else if(enemyWaveNr==2){
            this.helpers.wave3(this.start.x,this.start.y,this);
        }
        else if(enemyWaveNr==3){
            this.helpers.wave3(this.start.x,this.start.y,this);
        }
    },
    //Popup-Menü öffen und je nach Button verlinken
    popUp : function(){
        this.helpers.popUp(this);
    },

    diamondClicked:function(){
        this.helpers.diamondClicked(this);
    },


    //Nächste Gegnerwelle
    nextWave : function(player,arraynumber){
        this.physics.arcade.collide(player, layer);
        var a = array[arraynumber];
        if(player.x<this.visiblePoint){
            player.visible=true;
        }

        switch(a){
            case 0:
                this.physics.arcade.moveToObject(player,this.myPoint1,player.speed,0);
                player.animations.play('left');
                if(player.x<this.myPoint1.x+2){
                    array[arraynumber] = 1;
                    break;
                }
                break;

            case 1:
                player.body.velocity.x = 0;
                player.body.velocity.y = 0;
                this.physics.arcade.moveToObject(player,this.myPoint2,player.speed,0);
                player.animations.play('up');
                if(player.y<this.myPoint2.y+2){
                    array[arraynumber] = 2;
                    break;
                }
                break;
            case 2:
                player.body.velocity.x = 0;
                player.body.velocity.y = 0;
                this.physics.arcade.moveToObject(player,this.myPoint3,player.speed,0);
                player.animations.play('left');
                if(player.x<this.myPoint3.x+2){
                    array[arraynumber]=3;
                    break;
                }
                break;
            case 3:
                player.body.velocity.x = 0;
                player.body.velocity.y = 0;
                this.physics.arcade.moveToObject(player,this.myPoint4,player.speed,0);
                player.animations.play('down');
                if(player.y>this.myPoint4.y-2){
                    array[arraynumber]=4;
                    break;
                }
                break;
            case 4:
                player.body.velocity.x = 0;
                player.body.velocity.y = 0;
                this.physics.arcade.moveToObject(player,this.myPoint5,player.speed,0);
                player.animations.play('left');
                if(player.x<this.myPoint5.x+2){
                    array[arraynumber]=6;
                    break;
                }
                break;
            case 6:
                player.body.velocity.x = 0;
                player.body.velocity.y = 0;
                this.physics.arcade.moveToObject(player,this.myPoint6,player.speed,0);
                player.animations.play('up');
                if(player.y<this.myPoint6.y+2){
                    array[arraynumber] = 7;
                    break;
                }
                break;

            case 7:
                player.body.velocity.x = 0;
                player.body.velocity.y = 0;
                this.physics.arcade.moveToObject(player,this.myPoint7,player.speed,0);
                player.animations.play('left');
                if(player.x<this.myPoint7.x+0.5){
                    player.destroy();
                    array[arraynumber]=5;

                    if((life-1)>=-1){
                        life = life-1;
                        heartText.destroy();
                        heartText = this.add.text(290,20,life);
                        if(coins-10>=0) {
                            coins = coins - 10;
                            coinText.destroy();
                            coinText = this.add.text(100, 20, coins);
                        }
                    }

                    if(life==0){
                        this.add.text(350,300,"GAME OVER");
                        bool=false;
                        enemyWaveNr=0;
                        life=5;
                        coins=70;
                        score=0;
                        diamonds=1;
                        this.state.start("MainMenu");
                    }
                    break;
                }

        }
    }

}
