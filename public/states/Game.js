/**
 * Main game state, starts the appropriate levels
 */
Game.Main = function () {};

Game.Main.prototype = {

    create: function(){
        //Update the Camera bounds to match the game world.
        this.physics.setBoundsToWorld();

        if (Menu.levelSelector === 1) this.state.start("Level1");
        if (Menu.levelSelector === 2) this.state.start("Level2");
        if (Menu.levelSelector === 3) this.state.start('Level3');
    }
};


/**
 * Game handling state. Kind of mediator.
 */

Game.Handling = function (lvl) {

    this.lvl            = lvl;
    this.helperIngame   = new GameHelper.Ingame(this.lvl);
    this.helperHUD      = new GameHelper.HUD(this.lvl);
    this.coins          = 0;
    this.lifes          = 0;
    this.xp             = 0;
    this.score          = 0;
    this.interestRate   = 0;
    this.spawnNow       = false;
    this.currentWaveNumber = 0;
    this.maxWaves       = null;
    this.waveRunning    = false;        // Determines whether there is a wave running at the moment
    this.waveHandler    = null;
    this.towerPreview   = null;         // Variable holds tower preview rectangle in case of tower building process
    this.towerPreviewCircle = null;
    this.buildTowerID    = null;            //Id of the requested tower to build
    this.currentTowers  = [];           // Holds the towers build in one level

};


Game.Handling.prototype = {

    init: function() {
        // Add ESC key in order to cancel actions.
        this.lvl.input.keyboard.addKeyCapture(Phaser.Keyboard.ESC);
        var esc = this.lvl.input.keyboard.addKey(Phaser.Keyboard.ESC);

        esc.onDown.add(function() {
            //cancel tower buildung action
            console.log(this.currentTowers);
            if(this.towerPreview !== null) {
                this.towerPreview.kill();
                this.towerPreview = null;}

            //hide tower popups
            for (var i = 0; i < this.currentTowers.length; i++) {
                if (this.currentTowers[i].popup === null || this.currentTowers[i].popup === undefined) {
                    //Nothing here
                } else {
                    this.currentTowers[i].popup.kill();
                    this.currentTowers[i].popup = null;
                }
            }
        }, this);
    },


    handle: function() {
        this.helperHUD.updateAll();
        this.soundMenu();
        this.towerHandling();
    },


    buildTower: function() {
        if (this.towerPreview !== null) {
            this.towerPreview.kill();
            this.towerPreview = null;
        }

        //Does the player have enough coins?
        var hasEnoughMoney = (this.coins - Tower.towerList[this.buildTowerID].cost[0] >= 0) ? true : false;
        if (!hasEnoughMoney) {
            this.helperHUD.showInfo('Not enough coins', 3000);
        } else {
            var towerID = this.buildTowerID;

            //Create preview rectangle
            var box = this.lvl.add.graphics(0, 0);
            box.beginFill(0xffffff, 0.7);
            var width  = Tower.towerList[towerID].width;
            var height = Tower.towerList[towerID].height;

            box.drawRect(0, 0, width, height);
            this.towerPreview = box;

            //Draw a circle around the preview (for range of tower)
            var radius = Tower.towerList[towerID].range[0];
            var circ = this.lvl.add.graphics(0, 0);
            circ.beginFill(0xffffff, 0.15);
            circ.drawEllipse(0, 0, radius, radius);
            this.towerPreviewCircle = circ;

            /* Now the buildTower function of the helper class takes over
            *  See GameHelper.Ingame class.
            * */
        }
    },


    towerHandling: function () {
        for (var i = 0; i < this.currentTowers.length; i++) {
            this.currentTowers[i].fire();
            this.currentTowers[i].collisionCheck();
            this.currentTowers[i].inputListener();
        }
    },


    nextWave: function () {
        if (this.currentWaveNumber >= this.maxWaves) {
            //No more waves
            //if not game over: Player won.
        } else {
            this.lvl.waves[this.currentWaveNumber].init();
            this.lvl.waves[this.currentWaveNumber].start();
            this.currentWaveNumber++;
            this.coins += Math.round(this.interestRate * this.coins);
            this.score += this.lvl.waves[this.currentWaveNumber].reward;
            //this.helperHUD.updateWavenumber();
            //this.helperHUD.updateCoins();
        }
    },


    checkGameOver: function () {
        //TODO
    },


    soundMenu: function () {
        //Get volume
        Audio.musicVolume = $( "#popupMusic" ).slider( "option", "value" );
        Audio.soundVolume = $( "#popupSound" ).slider( "option", "value" );
        this.lvl.sound.volume = Audio.musicVolume;

        //Set sliders
        $("#sliderMusic").slider('value', Audio.musicVolume);
        $("#sliderSound").slider('value',Audio.soundVolume);
    }
};
