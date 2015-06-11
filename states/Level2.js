/**
 * Created by Felix on 10.06.2015.
 */
Menu.Level2 = function(game){
    this.helpers = new Helpers.Menu();
}

Menu.Level2.prototype = {


    //Alle Dateien des 1. Levels laden
    preload: function(){

        this.visiblePoint=990;
        this.myPoint1 = new Phaser.Point(730,400);
        this.myPoint2 = new Phaser.Point(730,210);
        this.myPoint3 = new Phaser.Point(470,210);
        this.myPoint4 = new Phaser.Point(470,400);
        this.myPoint5 = new Phaser.Point(0,400);
        //Map
        this.load.tilemap('map', 'assets/tilemaps/csv/newMap2.csv', null, Phaser.Tilemap.CSV);
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
            this.helpers.buildWave(1,3,60,5,1000,400,this);
        }
        //2.Welle
        else if(enemyWaveNr==1){
            this.helpers.buildWave(1,5,70,5,1000,400,this);
        }
        //3.Welle
        else if (enemyWaveNr==2){
            this.helpers.buildWave(1,8,80,7,1000,400,this);
        }
        else if(enemyWaveNr==3){
            this.helpers.buildWave(1,11,80,8,1000,400,this);
        }
        else if(enemyWaveNr==4){
            this.helpers.buildWave(1,11,110,10,1000,400,this);
        }
        else if(enemyWaveNr==5){
            this.helpers.buildWave(1,8,100,20,1000,400,this);
        }
        else if(enemyWaveNr==6){
            this.helpers.buildWave(1,100,80,10,1000,400,this);
        }
    },
    //Popup-Menü öffen und je nach Button verlinken
    popUp : function(){
        this.helpers.popUp(this);
    },


    //Nächste Gegnerwelle
    nextWave : function(player,arraynumber){
        if(marker!=null){
            marker.destroy();
            marker=null;
        }
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
                if(player.x<this.myPoint5.x+0.5){
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
    }

}
