/**
 * Created by Felix on 13.05.15.
 */


Menu.Level1 = function(game){
    this.helpers = new Helpers.Menu();
}

Menu.Level1.prototype = {


    //Alle Dateien des 1. Levels laden
    preload: function () {

        this.visiblePoint = 990;
        this.myPoint1 = new Phaser.Point(590, 190);
        this.myPoint2 = new Phaser.Point(590, 380);
        this.myPoint3 = new Phaser.Point(270, 380);
        this.myPoint4 = new Phaser.Point(270, 130);
        this.myPoint5 = new Phaser.Point(0, 130);
        this.start = new Phaser.Point(1000, 190);
        //Map
        //this.load.tilemap('map', 'assets/tilemaps/csv/newMap.csv', null, Phaser.Tilemap.CSV);
        //this.load.image('tiles', 'assets/tilemaps/tiles/grass-tiles-2-small.png');

        this.load.tilemap('map', 'assets/tilemaps/level1.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.image('tiles', 'assets/tilemaps/tiles.png');
        this.load.image('meta_tiles', 'assets/tilemaps/meta_tiles.png');

    },

    create: function (game) {

        player.lastGame.level = 1;

        //Physics-Engine laden
        this.physics.startSystem(Phaser.Physics.ARCADE);
        //Spielfeld laden
        // map = this.add.tilemap('map', 16, 16);
        map = this.add.tilemap('map');
        map.addTilesetImage('tiles');
        map.addTilesetImage('meta_tiles');

        console.log('world width: ' + this.world.width + ', world height: ' + this.world.height);
        //console.log(JSON.stringify(map.objects.waypoints));
        //console.log(JSON.stringify(map.objects.waypoints[0].x));

        //  Create our layer

        var baseLayer = map.createLayer('Base');
        var decoLayer = map.createLayer('Deco');
        var treeLayer = map.createLayer('Trees');
        var metaLayer = map.createLayer('Meta');
        metaLayer.visible = false;


        //Verfügbare Leben
        life = 5;
        //Create HUD group
        var HUD = this.add.group(this.world, 'HUD');

        //Create the bar representing the hud and colr it
        var hudBar = this.add.graphics(0, 0);
        hudBar.beginFill(0x867A69, 0.75);
        hudBar.drawRoundedRect(20, 20, canvasWidth - 40, 50, 15);

        //Add hud bar to HUD group
        HUD.add(hudBar);
        var hudTextStyle = {font: '20px MenuFont', fill: '#eee'};

        //Create coin, diamond, heart images and XP and score text and add to HUD Group
        coin = this.add.image(60, 45, 'coin', 1);
        diamond = this.add.sprite(160, 45, 'diamond');
        heart = this.add.sprite(250, 45, 'heart');
        var xpText = this.add.text(500, 45, 'XP:', hudTextStyle);
        scoreText = this.add.text(800, 45, 'Score:', hudTextStyle);
        coin.scale.set(0.9);
        diamond.scale.set(0.9);
        heart.scale.set(0.5);
        coin.anchor.set(0.5);
        diamond.anchor.set(0.5);
        heart.anchor.set(0.5);
        scoreText.anchor.set(0.5);
        xpText.anchor.set(0.5);
        HUD.add(coin);
        HUD.add(diamond);
        HUD.add(heart);
        HUD.add(xpText);
        HUD.add(scoreText);

        //Create values
        coinsVal = this.add.text(coin.x + 30, coin.y, coins, hudTextStyle);
        diamondsVal = this.add.text(diamond.x + 30, diamond.y, player.diamonds, hudTextStyle);
        heartsVal = this.add.text(heart.x + 30, heart.y, life, hudTextStyle);
        xpBar = this.add.image(570, 45, 'xpBar2');

        xpBar.scale.set(0, 0.2);
        coinsVal.anchor.set(0.5);
        diamondsVal.anchor.set(0.5);
        heartsVal.anchor.set(0.5);
        xpBar.anchor.set(0.5);

        HUD.add(coinsVal);
        HUD.add(diamondsVal);
        HUD.add(heartsVal);
        HUD.add(xpBar);

        //Next-Wave-Button und Tower-Buttons hinzufügen
        this.add.button(850, 630, 'nextWave', this.boolF, this);
        button1 = this.add.button(50, 630, 'tower1', this.addTower, this);
        button1.events.onInputOver.add(this.helpers.infoTower1, this);
        button1.events.onInputOut.add(this.helpers.infoTower1Delete, this);

        button2 = this.add.button(200, 630, 'tower2Text', this.addTower2, this);
        button2.events.onInputOver.add(this.helpers.infoTower2, this);
        button2.events.onInputOut.add(this.helpers.infoTower2Delete, this);


        button5 = this.add.button(650, 630, 'Premium', this.diamondClicked, this);
        button5.events.onInputOver.add(this.helpers.diamondInfo, this);
        button5.events.onInputOut.add(this.helpers.diamondInfoDelete, this);
        //Popup-Button
        this.add.button(850, 100, 'menuB', this.popUp, this);

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

        //Lautstärke auslesen und entsprechend anpassen
        musicVolume = $("#popupMusic").slider("option", "value");
        this.game.sound.volume = musicVolume;

        soundVolume = $("#popupSound").slider("option", "value");
        Audio.soundVolume = soundVolume;

        //Setting slider auf den neuen Wert setzen
        $("#sliderMusic").slider('value', musicVolume);
        $("#sliderSound").slider('value', soundVolume);
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
    boolF: function () {

        if (bool != true) {

            if (enemyWaveNr == 0) {
                //Zinssystem
                coins = Math.round(coins + coins * 0.2);
                coinsVal.destroy();
                coinsVal = this.add.text(100, 20, coins);
                this.helpers.wave1(this.start.x, this.start.y, this);

            }
            //2.Welle
            else if (enemyWaveNr == 1) {
                //Zinssystem
                coins = Math.round(coins + coins * 0.2);
                coinsVal.destroy();
                coinsVal = this.add.text(100, 20, coins);
                this.helpers.wave2(this.start.x, this.start.y, this);

            }
            else if (enemyWaveNr == 2) {
                //Zinssystem
                coins = Math.round(coins + coins * 0.2);
                coinsVal.destroy();
                coinsVal = this.add.text(100, 20, coins);
                this.helpers.wave3(this.start.x, this.start.y, this);

            }
            else if (enemyWaveNr == 3) {
                //Zinssystem
                coins = Math.round(coins + coins * 0.2);
                coinsVal.destroy();
                coinsVal = this.add.text(100, 20, coins);
                this.helpers.wave4(this.start.x, this.start.y, this);
            }
            else if (enemyWaveNr == 4) {
                //Zinssystem
                coins = Math.round(coins + coins * 0.2);
                coinsVal.destroy();
                coinsVal = this.add.text(100, 20, coins);
                this.helpers.wave5(this.start.x, this.start.y, this);
            }
            else if (enemyWaveNr == 5) {
                //Zinssystem
                coins = Math.round(coins + coins * 0.2);
                coinsVal.destroy();
                coinsVal = this.add.text(100, 20, coins);
                this.helpers.wave6(this.start.x, this.start.y, this);
            }
            else if (enemyWaveNr == 6) {
                //Zinssystem
                coins = Math.round(coins + coins * 0.2);
                coinsVal.destroy();
                coinsVal = this.add.text(100, 20, coins);
                this.helpers.wave7(this.start.x, this.start.y, this);
            }
            else if (enemyWaveNr == 7) {
                //Zinssystem
                coins = Math.round(coins + coins * 0.2);
                coinsVal.destroy();
                coinsVal = this.add.text(100, 20, coins);
                this.helpers.wave8(this.start.x, this.start.y, this);
            }
            else if (enemyWaveNr == 8) {
                //Zinssystem
                coins = Math.round(coins + coins * 0.2);
                coinsVal.destroy();
                coinsVal = this.add.text(100, 20, coins);
                this.helpers.wave9(this.start.x, this.start.y, this);
            }
            else if (enemyWaveNr == 9) {
                //Zinssystem
                coins = Math.round(coins + coins * 0.2);
                coinsVal.destroy();
                coinsVal = this.add.text(100, 20, coins);
                this.helpers.wave10(this.start.x, this.start.y, this);
            }
            else if (enemyWaveNr == 10) {
                //Zinssystem
                coins = Math.round(coins + coins * 0.2);
                coinsVal.destroy();
                coinsVal = this.add.text(100, 20, coins);
                this.helpers.wave11(this.start.x, this.start.y, this);
            }
        }
    },
    //Popup-Menü öffen und je nach Button verlinken
    popUp: function () {
        this.helpers.popUp(this);
    },

    diamondClicked:function(){
        this.helpers.diamondClicked(this);
    },


    //Nächste Gegnerwelle
    nextWave: function (player, arraynumber) {

        this.physics.arcade.collide(player, layer);
        // a hat mit dem korrekten ablaufen der Wegpunkte zu tun.
        var a = array[arraynumber];
        if (player.x < this.visiblePoint) {
            player.visible = true;
        }

        switch (a) {
            case 0:
                this.physics.arcade.moveToObject(player, this.myPoint1, player.speed, 0);
                player.animations.play('left');
                if (player.x < this.myPoint1.x + 2) {
                    array[arraynumber] = 1;
                    break;
                }
                break;

            case 1:
                player.body.velocity.x = 0;
                player.body.velocity.y = 0;
                this.physics.arcade.moveToObject(player, this.myPoint2, player.speed, 0);
                player.animations.play('down');
                if (player.y > this.myPoint2.y - 2) {
                    array[arraynumber] = 2;
                    break;
                }
                break;
            case 2:
                player.body.velocity.x = 0;
                player.body.velocity.y = 0;
                this.physics.arcade.moveToObject(player, this.myPoint3, player.speed, 0);
                player.animations.play('left');
                if (player.x < this.myPoint3.x + 2) {
                    array[arraynumber] = 3;
                    break;
                }
                break;
            case 3:
                player.body.velocity.x = 0;
                player.body.velocity.y = 0;
                this.physics.arcade.moveToObject(player, this.myPoint4, player.speed, 0);
                player.animations.play('up');
                if (player.y < this.myPoint4.y + 2) {
                    array[arraynumber] = 4;
                    break;
                }
                break;
            case 4:
                player.body.velocity.x = 0;
                player.body.velocity.y = 0;
                this.physics.arcade.moveToObject(player, this.myPoint5, player.speed, 0);
                player.animations.play('left');
                if (player.x < this.myPoint5.x + 0.5) {
                    player.destroy();
                    array[arraynumber] = 5;
                    var zahl = arraynumber;
                    healthBars[zahl].destroy();
                    if ((life - 1) >= -1) {
                        life = life - 1;
                        heartsVal.destroy();
                        heartsVal = this.add.text(290, 20, life);
                    }

                    if (life == 0) {
                        //Spieler stirbt


                        this.add.text(350, 300, "GAME OVER");
                        bool = false;
                        enemyWaveNr = 0;
                        life = 5;
                        coins = 70;
                        score = 0;
                        diamonds = player.diamonds;
                        this.state.start("MainMenu");
                    }
                    break;
                }
                break;
        }
    }
}