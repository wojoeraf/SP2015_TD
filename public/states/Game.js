Game.Main = function () {

    this.helper         = new Helpers.Menu();
    this.coins          = 0;
    this.lifes          = 0;
    this.xp             = 0;
    this.score          = 0;
    this.waveRunning    = false;        // Determines whether there is a wave running at the moment
    this.towerPreview   = null;         // Variable holds tower preview rectangle in case of tower building process

};


Game.Main.prototype = {

    preload: function(){

        this.physics.setBoundsToWorld();

        enemyWaveNr = 0;

        console.log('Score: ' + this.score);

        //Alle Tower zerstören
        for (var k = 0; k < towerC; k++) {
            if (towers[k].isDestroyed == false) {
                towers[k].destroy();
                towers[k]=0;
            }
        }

        if(levelchooser==1){
            this.state.start("Level1");
        }
        else if(levelchooser==2){
            this.state.start("Level2");
        }
        else {
            this.state.start('Level3');
        }
    },


    update: function () {
        if(levelchooser==1){
            this.state.start("Level1");
        }
        else if(levelchooser==2){
            this.state.start("Level2");
        }
        else {
            this.state.start('Level3');
        }
    },

    buildTower: function(game) {
        //Create preview rectangle, initial green
        var box = game.add.graphics(0, 0);
        //box.lineStyle(1, 0x222, 0.7);
        box.beginFill(0x00ee00, 0.5);

        var towerID = 0;

        var width   = Tower.towerList[towerID].width;
        var height  = Tower.towerList[towerID].height;

        box.drawRoundedRect(0, 0, width, height, 5);
        this.towerPreview = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y);
        this.towerPreview.addChild(box);
        this.helper.centerAnchor(this.towerPreview);
    },

    quitGame: function () {

    }

};





Game.Handling = function (game) {

    this.game           = game;
    this.helper         = new Helpers.Menu();
    this.helperHUD      = new Helper.HUD(this.game);
    this.coins          = 0;
    this.lifes          = 0;
    this.xp             = 0;
    this.score          = 0;
    this.spawnNow       = false;
    this.currentWaveNumber = 0;
    this.waveRunning    = false;        // Determines whether there is a wave running at the moment
    this.towerPreview   = null;         // Variable holds tower preview rectangle in case of tower building process
    this.currentTowers  = [];           // Holds the towers build in one level

};


Game.Handling.prototype = {

    init: function() {

        this.coins          = 0;
        this.lifes          = 0;
        this.xp             = 0;
        this.score          = 0;
        this.interestRate   = 0;
        this.waveRunning    = false;
        this.towerPreview   = null;
        this.currentTowers  = [];
        this.buildTowerID    = null;            //Id of the requested tower to build

        // Add ESC key in order to cancel actions.
        this.game.input.keyboard.addKeyCapture(Phaser.Keyboard.ESC);
        var esc = this.game.input.keyboard.addKey(Phaser.Keyboard.ESC);

        esc.onDown.add(function() {
            //cancel tower buildung action
            console.log(this.currentTowers);
            if(this.towerPreview !== null) {
                this.towerPreview.kill();
                this.towerPreview = null;}
        }, this);
    },

    buildTower: function() {
        if (this.towerPreview !== null) {
            this.towerPreview.kill();
            this.towerPreview = null;
        }

        //Has the player enough coins?
        var hasEnoughMoney = (this.coins - Tower.towerList[this.buildTowerID].cost[0] >= 0) ? true : false;
        if (!hasEnoughMoney) {
            this.helperHUD.showInfo('Not enough coins', 3000);
        } else {
            //Create preview rectangle
            var box = this.game.add.graphics(0, 0);
            box.beginFill(0xffffff, 0.7);

            var towerID = this.buildTowerID;
            var width  = Tower.towerList[towerID].width;
            var height = Tower.towerList[towerID].height;

            box.drawRect(0, 0, width, height);
            this.towerPreview = box;
        }
    },
};
