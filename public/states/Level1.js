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
        this.myPoint1 = new Phaser.Point(590,190);
        this.myPoint2 = new Phaser.Point(590,380);
        this.myPoint3 = new Phaser.Point(270,380);
        this.myPoint4 = new Phaser.Point(270,130);
        this.myPoint5 = new Phaser.Point(0,130);
        this.start = new Phaser.Point(1000,190);
        this.pointarray=[this.start,this.myPoint1,this.myPoint2,this.myPoint3,this.myPoint4,this.myPoint5];
        //Map
        this.load.tilemap('map', 'assets/tilemaps/csv/newMap.csv', null, Phaser.Tilemap.CSV);
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
        coin = this.add.image(60,22,'coin',1);
        coin.scale.set(0.9);
        coinText=this.add.text(100,20,coins);
        diamond = this.add.sprite(160,22,'diamond');
        diamond.scale.set(0.9);
        diamonds = player.diamonds;
        diamondText = this.add.text(200,20,diamonds);
        heart= this.add.sprite(250,22,'heart');
        heart.scale.set(0.5);
        heartText = this.add.text(290,20,life);

        //Next-Wave-Button und Tower-Buttons hinzufügen
        this.add.button(850,630,'nextWave',this.boolF,this);
        button1 = this.add.button(50,630,'tower1',this.addTower,this);
        button1.events.onInputOver.add(this.helpers.infoTower1,this);
        button1.events.onInputOut.add(this.helpers.infoTower1Delete,this);

        button2 = this.add.button(200,630,'tower2Text',this.addTower2,this);
        button2.events.onInputOver.add(this.helpers.infoTower2,this);
        button2.events.onInputOut.add(this.helpers.infoTower2Delete,this);


        button5 = this.add.button(650,630,'Premium',this.diamondClicked,this);
        button5.events.onInputOver.add(this.helpers.diamondInfo,this);
        button5.events.onInputOut.add(this.helpers.diamondInfoDelete,this);
        //Popup-Button
        this.add.button(850,100,'menuB',this.popUp,this);

        //NextWave-Sperre, nur wenn auf true geändert-> nächste Enemy-Welle
        bool = false;

    },

    update: function () {

        this.helpers.createHealthbars();
        //Wenn Next-Wave gedrückt wurde -> Enemies laufen den Weg entlang
        this.helpers.enemiesRun(this);
        //Marker -> Rechteck -> Turm platzieren
        this.helpers.towerBuilding(this);

        //Ab hier lautstärkeregler stuff
/*
        //Lautstärke auslesen und entsprechend anpassen
        musicVolume = $( "#popupMusic" ).slider( "option", "value" );
        this.game.sound.volume = musicVolume;

        soundVolume = $( "#popupSound" ).slider( "option", "value" );
        Audio.soundVolume = soundVolume;

        //Setting slider auf den neuen Wert setzen
        $("#sliderMusic").slider('value',musicVolume);
        $("#sliderSound").slider('value',soundVolume);
        */
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

        if(bool!=true) {

            if (enemyWaveNr == 0) {
                //Zinssystem
                coins = Math.round(coins + coins * 0.2);
                coinText.destroy();
                coinText = this.add.text(100, 20, coins);
                this.helpers.wave1(this.start.x, this.start.y, this);

            }
            //2.Welle
            else if (enemyWaveNr == 1) {
                //Zinssystem
                coins = Math.round(coins + coins * 0.2);
                coinText.destroy();
                coinText = this.add.text(100, 20, coins);
                this.helpers.wave2(this.start.x, this.start.y, this);

            }
            else if (enemyWaveNr == 2) {
                //Zinssystem
                coins = Math.round(coins + coins * 0.2);
                coinText.destroy();
                coinText = this.add.text(100, 20, coins);
                this.helpers.wave3(this.start.x, this.start.y, this);

            }
            else if (enemyWaveNr == 3) {
                //Zinssystem
                coins = Math.round(coins + coins * 0.2);
                coinText.destroy();
                coinText = this.add.text(100, 20, coins);
                this.helpers.wave4(this.start.x, this.start.y, this);
            }
            else if (enemyWaveNr == 4) {
                //Zinssystem
                coins = Math.round(coins + coins * 0.2);
                coinText.destroy();
                coinText = this.add.text(100, 20, coins);
                this.helpers.wave5(this.start.x, this.start.y, this);
            }
            else if (enemyWaveNr == 5) {
                //Zinssystem
                coins = Math.round(coins + coins * 0.2);
                coinText.destroy();
                coinText = this.add.text(100, 20, coins);
                this.helpers.wave6(this.start.x, this.start.y, this);
            }
            else if (enemyWaveNr == 6) {
                //Zinssystem
                coins = Math.round(coins + coins * 0.2);
                coinText.destroy();
                coinText = this.add.text(100, 20, coins);
                this.helpers.wave7(this.start.x, this.start.y, this);
            }
            else if (enemyWaveNr == 7) {
                //Zinssystem
                coins = Math.round(coins + coins * 0.2);
                coinText.destroy();
                coinText = this.add.text(100, 20, coins);
                this.helpers.wave8(this.start.x, this.start.y, this);
            }
            else if (enemyWaveNr == 8) {
                //Zinssystem
                coins = Math.round(coins + coins * 0.2);
                coinText.destroy();
                coinText = this.add.text(100, 20, coins);
                this.helpers.wave9(this.start.x, this.start.y, this);
            }
            else if (enemyWaveNr == 9) {
                //Zinssystem
                coins = Math.round(coins + coins * 0.2);
                coinText.destroy();
                coinText = this.add.text(100, 20, coins);
                this.helpers.wave10(this.start.x, this.start.y, this);
            }
            else if (enemyWaveNr == 10) {
                //Zinssystem
                coins = Math.round(coins + coins * 0.2);
                coinText.destroy();
                coinText = this.add.text(100, 20, coins);
                this.helpers.wave11(this.start.x, this.start.y, this);
            }
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
                player.animations.play('down');
                if(player.y>this.myPoint2.y-2){
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
                player.animations.play('up');
                if(player.y<this.myPoint4.y+2){
                    array[arraynumber]=4;
                    break;
                }
                break;
            case 4:
                player.body.velocity.x = 0;
                player.body.velocity.y = 0;
                this.physics.arcade.moveToObject(player,this.myPoint5,player.speed,0);
                player.animations.play('left');
                if(player.x<this.myPoint5.x+0.5){
                    player.destroy();
                    array[arraynumber]=5;
                    var zahl = arraynumber;
                    healthBars[zahl].destroy();
                    if((life-1)>=-1){
                        life = life-1;
                        heartText.destroy();
                        heartText = this.add.text(290,20,life);
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
                break;
        }
    }

}
