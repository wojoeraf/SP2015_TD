/**
 * Created by Felix on 13.05.15.
 */


Game.Level1 = function(){
    this.handler    = new Game.Handling(this);
    this.helpers    = new Helpers.Menu();
    this.map        = null;
    this.metaLayer  = null;
    this.startPoint = null;
    this.waypoints  = null;
    this.timer      = null;
    this.mobs       = [];

    this.waves = {
        0: {1: 5},
        1: {0: 8}
    };

}

Game.Level1.prototype = {

    //render: function() {
    //    this.game.debug.body(this.mobs[0].sprite, '#aa0000', true);
    //    this.game.debug.spriteInfo(this.mobs[0].sprite, 32, 32);
    //},

    //Level specific initialisations
    init: function() {
        this.handler.init();
        this.handler.coins = 100; //Beginning coins
        this.handler.lifes = 20; //Beginning lifes
        this.handler.interestRate = 0.2;
    },


    //Load level 1 data
    preload: function(){
        //Load the map
        this.load.tilemap('map', 'assets/tilemaps/level1.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.image('tiles', 'assets/tilemaps/tiles.png');
        this.load.image('meta_tiles', 'assets/tilemaps/meta_tiles.png');
    },


    create: function () {
        //Add the map
        this.map = this.add.tilemap('map');
        this.map.addTilesetImage('tiles');
        this.map.addTilesetImage('meta_tiles');

        console.log('world width: ' + this.world.width + ', world height: ' + this.world.height);
        console.log(JSON.stringify(this.map.objects.waypoints));
        console.log(JSON.stringify(this.map.objects.waypoints[0].x));
        this.waypoints = this.map.objects.waypoints;

        this.startPoint = new Phaser.Point(this.waypoints[0].x, this.waypoints[0].y);

        // Create layers
        var baseLayer = this.map.createLayer('Base');
        var decoLayer = this.map.createLayer('Deco');
        var treeLayer = this.map.createLayer('Trees');
        this.metaLayer = this.map.createLayer('Meta');
        this.metaLayer.visible = false;

        //Draw HUD
        this.handler.helperHUD.drawHUD();

        //Next-Wave-Button und Tower-Buttons hinzufügen
        this.add.button(850, 630, 'nextWave', this.myNextWave, this);
        button1 = this.add.button(50,630,'tower1', this.buildTower, this);
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
        this.handler.waveRunning = false;
        this.timer = this.time.create(false);
        this.timer.start();
        //this.timer.loop(1000, function() {console.log(this.map.getTileWorldXY(this.input.mousePointer.x, this.input.mousePointer.y, 16, 16, 'Meta'));}, this);


        //this.mob = new Mob.WalkingMob(startX, startY, 1, this.waypoints, this);
        //this.mob.init(15, 0.5, 0.5);
    },

    update: function () {
        this.helpers.createHealthbars();

        //Wenn Next-Wave gedrückt wurde -> Enemies laufen den Weg entlang
        this.helpers.enemiesRun(this);

        //Marker -> Rechteck -> Turm platzieren
        //this.helpers.towerBuilding(this);
        this.helpers.buildTower(this);

        for (var i = 0; i < this.mobs.length; i++) {
            var outer = this;
            //console.log(this.mobs[i]);
            this.mobs[i].spawn();
            //this.mobs[i].move();
            //this.time.events.add(750, function() {outer.mobs[i].move();}, this);
        }

        //Ab hier lautstärkeregler stuff

        //Lautstärke auslesen und entsprechend anpassen
        musicVolume = $( "#popupMusic" ).slider( "option", "value" );
        this.game.sound.volume = musicVolume;

        soundVolume = $( "#popupSound" ).slider( "option", "value" );
        Audio.soundVolume = soundVolume;

        //Setting slider auf den neuen Wert setzen
        $("#sliderMusic").slider('value',musicVolume);
        $("#sliderSound").slider('value',soundVolume);
    },


    //TowerTyp 1 hinzufügen
    buildTower: function() {
        this.handler.buildTowerID = 0;
        this.handler.buildTower(0);
    },


    //TowerTyp 2 hinzufügen
    addTower2: function () {
        this.helpers.addTower2(this);
    },


    myNextWave: function() {
        console.log("Next wave pressed");

        var outer = this;

        var currentWave = this.waves[this.handler.currentWaveNumber];

        //Push all mobs of current wave in the mobs array
        for (var mobID in currentWave) {
            for (var k = 0; k < currentWave[mobID]; k++) {
                var mob = new Mob.WalkingMob(this.startPoint.x, this.startPoint.y, mobID, this.waypoints, this)
                mob.init(15, 0.5, 0.5);
                this.physics.arcade.collide(mob, this.metaLayer);
                for (var i = 0; i < this.mobs.length; i++) {
                    this.physics.arcade.collide(mob, this.mobs[i]);
                }
                this.mobs.push(mob);
            }
        }

        var counter = 0;
        this.time.events.loop(750, function() {
            if (counter < outer.mobs.length) {
                outer.mobs[counter].spawnNow = true;
                counter++;
            }
        }, this);

        this.handler.currentWaveNumber++

        //this.handler.spawnNow = true;


        //this.physics.arcade.collide(mob, 'Base');
        //this.physics.arcade.moveToXY(mob, this.waypoints[1].x, this.waypoints[1].y, 50);
        //this.physics.arcade.moveToXY(mob, this.waypoints[2].x, this.waypoints[2].y, 50);

        //this.helpers.wave1(this.waypoints[0].x, this.waypoints[0].y, this);
        //
        //for(var i = 0; i < this.waypoints.length; i++) {
        //    this.physics.arcade.moveToObject(sprites[0], this.waypoints[i].x, this.waypoints[i].y, sprites[0].speed);
        //}

    },


    //Je nach Welle -> Sprites hinzufügen (Aufruf von buildWave(EnemyTyp,Anzahl,Speed,Lifes)
    boolF : function(){

        if(Game.waveRunning!=true) {

            if (enemyWaveNr == 0) {
                var tmpCoins = this.handler.coins;
                this.handler.coins = Math.round(tmpCoins + tmpCoins * this.handler.interestRate);
                this.handler.helperHUD.updateCoins();
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

                    if((life-1)>=-1){
                        life = life-1;
                        heartsVal.destroy();
                        heartsVal = this.add.text(290,20,life);
                        if(coins-10>=0) {
                            coins = coins - 5;
                            coinsVal.destroy();
                            coinsVal = this.add.text(100, 20, coins);
                        }
                    }

                    if(life==0){
                        this.add.text(350,300,"GAME OVER");
                        Game.waveRunning=false;
                        enemyWaveNr=0;
                        life=5;
                        coins=70;
                        Game.Main.score=0;
                        diamonds=1;
                        this.state.start("MainMenu");
                    }
                    break;
                }
                break;
        }
    },

    shutDown: function() {
        this.map        = null;
        this.metaLayer  = null;
        this.waypoints  = null;
        this.timer      = null;
        this.mobs       = [];
    }

}
