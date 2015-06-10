/**
 * Created by Felix on 13.05.15.
 */


Menu.Level1 = function(game){
    this.helpers = new Helpers.Menu();
}

Menu.Level1.prototype = {


    //Alle Dateien des 1. Levels laden
    preload: function(){

        this.visiblePoint=990;
        this.myPoint1 = new Phaser.Point(600,190);
        this.myPoint2 = new Phaser.Point(600,400);
        this.myPoint3 = new Phaser.Point(300,400);
        this.myPoint4 = new Phaser.Point(300,150);
        this.myPoint5 = new Phaser.Point(0,150);
        //Map
        this.load.tilemap('map', 'assets/tilemaps/csv/newMap.csv', null, Phaser.Tilemap.CSV);
        this.load.image('tiles', 'assets/tilemaps/tiles/grass-tiles-2-small.png');
        //Enemies
        this.load.spritesheet('player', 'assets/sprites/spaceman.png', 16, 16);
        //Towers
        this.load.spritesheet('tower', 'assets/sprites/block.png',32,32);
        this.load.spritesheet('tower1', 'assets/sprites/Tower1.png');
        this.load.spritesheet('tower2Text', 'assets/sprites/Tower22.png');
        this.load.spritesheet('tower2', 'assets/sprites/tower2.png',32,32);
        //Bullets
        this.load.spritesheet('bullet', 'assets/sprites/bullet.png',8,8);
        this.load.spritesheet('bullet2','assets/sprites/slime.png',14,14);
        //Elemente obere Leiste
        this.load.spritesheet('xpBar2', 'assets/sprites/xpBar2.png');
        this.load.spritesheet('heart', 'assets/sprites/heart.png');
        this.load.spritesheet('diamond','assets/sprites/diamond.png');
        this.load.spritesheet('coin', 'assets/sprites/coin1.png');
        //Hintergrund Popup-Menü
        this.load.image('background','assets/sprites/background3.png');
        this.load.image('towerInfo1','assets/sprites/towerInfos1.png');
        this.load.image('towerInfo2','assets/sprites/towerInfos2.png');
        this.load.image('tower1Upgrade1','assets/sprites/Upgrade1.png');
        this.load.image('tower1Upgrade2','assets/sprites/Upgrade2.png');
        this.load.image('tower2Upgrade1','assets/sprites/Upgrade1-2.png');
        this.load.image('tower2Upgrade2','assets/sprites/Upgrade2-2.png');
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
        button1 = this.add.button(50,630,'tower1',this.addTower,this);
        button1.events.onInputOver.add(this.helpers.infoTower1,this);
        button1.events.onInputOut.add(this.helpers.infoTower1Delete,this);

        button2 = this.add.button(200,630,'tower2Text',this.addTower2,this);
        button2.events.onInputOver.add(this.helpers.infoTower2,this);
        button2.events.onInputOut.add(this.helpers.infoTower2Delete,this);

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
    //Je nach Welle -> Sprites hinzufügen (Aufruf von buildWave(EnemyTyp,Anzahl,Speed,Lifes)
    boolF : function(){

        if(enemyWaveNr==0){
            this.helpers.buildWave(1,3,60,5,this);
        }
        //2.Welle
        else if(enemyWaveNr==1){
            this.helpers.buildWave(1,5,70,5,this);
        }
        //3.Welle
        else if (enemyWaveNr==2){
           this.helpers.buildWave(1,8,80,7,this);
        }
        else if(enemyWaveNr==3){
            this.helpers.buildWave(1,11,80,8,this);
        }
        else if(enemyWaveNr==4){
            this.helpers.buildWave(1,11,110,10,this);
        }
        else if(enemyWaveNr==5){
            this.helpers.buildWave(1,8,100,20,this);
        }
        else if(enemyWaveNr==6){
            this.helpers.buildWave(1,100,80,10,this);
        }
    },
    //Popup-Menü öffen und je nach Button verlinken
    popUp : function(){
        this.helpers.popUp(this);
    },


}
