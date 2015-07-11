/**
 * GameHelper Nampespace
 * @namespace GameHelper
 */

var GameHelper = {};

/**
 * HUD helper class
 * @class
 */

GameHelper.HUD = function (game) {
    this.textStyle = {font: '20px MenuFont', fill: '#eee'};
    //console.log(JSON.stringify(game));
    this.game = game;
    this.coinSprite;//     = game.add.sprite(60, 45, 'coin');
    this.diamondSprite;//  = game.add.sprite(160, 45, 'diamond');
    this.heartSprite;//    = game.add.sprite(250, 45, 'heart');
    this.xpSprite;//       = game.add.sprite(570, 45, 'xpBar');
    this.coinText;//       = game.add.text(this.coinSprite.x + 30, this.coinSprite.y, Game.Main.coins, this.textStyle);
    this.diamondText;//    = game.add.text(this.diamondSprite.x + 30, this.diamondSprite.y, player.diamonds, this.textStyle);
    this.heartText;//      = game.add.text(this.heartSprite.x + 30, this.heartSprite.y, life, this.textStyle);
    this.xpText;//         = game.add.text(500, 45, 'XP:', this.textStyle);
    this.scoreText;//      = game.add.text(800, 45, 'Score:', this.textStyle);
    this.infoText;          //Holds infos like "Not enough coins."
    this.waveText;
};

GameHelper.HUD.prototype = {

    init: function () {
        var y              = 50;
        var hOffset        = 35;
        this.coinSprite    = this.game.add.sprite(60, y - 5, 'coin');
        this.diamondSprite = this.game.add.sprite(200, y - 5, 'diamond');
        this.heartSprite   = this.game.add.sprite(300, y - 5, 'heart');
        this.xpText        = this.game.add.text(430, y, 'XP:', this.textStyle);
        this.xpSprite      = this.game.add.sprite(this.xpText.x + hOffset, y, 'xpBar');
        this.coinText      = this.game.add.text(this.coinSprite.x + hOffset, y, this.game.handler.coins, this.textStyle);
        this.diamondText   = this.game.add.text(this.diamondSprite.x + hOffset, y, player.diamonds, this.textStyle);
        this.heartText     = this.game.add.text(this.heartSprite.x + hOffset, y, this.game.handler.lifes, this.textStyle);
        this.scoreText     = this.game.add.text(820, y, 'Score:  ' + this.game.handler.score, this.textStyle);
        this.waveText      = this.game.add.text(650, y, 'Wave:  ' + this.game.handler.currentWaveNumber + ' of ' + this.game.handler.maxWaves, this.textStyle);
        this.infoText      = this.game.add.text(70, 80, '', {font: '25px MenuFont', align: 'center', fill: '#bb0000'});
        this.infoText.visible = false;
    },

    centerAnchor: function (obj) {
        obj.anchor.set(Math.round(obj.width * 0.5) / obj.width, Math.round(obj.height * 0.5) / obj.height);
    },

    drawHUD: function () {

        this.init();
        //Create group for HUD
        var HUDGroup = this.game.add.group(this.world, 'HUD');

        //Create the bar representing the hud and color it
        var hudBar = this.game.add.graphics(0, 0);
        hudBar.beginFill(0x867A69, 0.75);
        hudBar.drawRoundedRect(20, 20, canvasWidth - 40, 50, 15);

        //Add hud bar to HUD group
        HUDGroup.add(hudBar);

        this.coinSprite.scale.set(0.9);
        this.diamondSprite.scale.set(0.9);
        this.heartSprite.scale.set(0.5);
        this.xpSprite.scale.set(0, 0.2);

        this.centerAnchor(this.coinSprite);
        this.centerAnchor(this.diamondSprite);
        this.centerAnchor(this.heartSprite);
        this.centerAnchor(this.waveText);
        this.centerAnchor(this.scoreText);
        this.centerAnchor(this.xpText);
        this.centerAnchor(this.coinText);
        this.centerAnchor(this.diamondText);
        this.centerAnchor(this.heartText);
        this.centerAnchor(this.xpSprite);

        HUDGroup.add(this.coinSprite);
        HUDGroup.add(this.diamondSprite);
        HUDGroup.add(this.heartSprite);
        HUDGroup.add(this.xpSprite);
        HUDGroup.add(this.coinText);
        HUDGroup.add(this.diamondText);
        HUDGroup.add(this.heartText);
        HUDGroup.add(this.xpText);
        HUDGroup.add(this.waveText);
        HUDGroup.add(this.scoreText);

    },

    updateAll: function () {
        this.updateCoins();
        this.updateLifes();
        this.updateScore();
        this.updateWavenumber();
    },

    showInfo: function(text, duration) {
        this.infoText.text = text;
        this.infoText.visible = true;
        var outer = this;
        this.game.time.events.add(duration, function() {outer.infoText.visible = false;}, this.game);
    },

    updateCoins: function() {
        this.coinText.setText(this.game.handler.coins);
    },

    updateLifes: function() {
        this.heartText.setText(this.game.handler.lifes);
    },

    updateScore: function() {
        this.scoreText.setText('Score:  ' + this.game.handler.score);
    },

    updateWavenumber: function() {
        this.waveText.setText('Wave:  ' + this.game.handler.currentWaveNumber + ' of ' + this.game.handler.maxWaves);
    }

};



/**
 * Ingame helper class
 * @class
 */

GameHelper.Ingame = function(game) {
    this.game = game;
    this.preview = {colorPositive: 0x00ee00, colorNegative: 0xff0000};
    
};

GameHelper.Ingame.prototype = {
    buildTower: function () {
        var preview = this.game.handler.towerPreview;
        var previewCirc = this.game.handler.towerPreviewCircle;
        var hasEnoughMoney = false;

        //Right mouse button = cancel (additionally esc cancels, see Game.Handling.init())
        if (preview !== null && this.game.input.mouse.button == Phaser.Mouse.MIDDLE_BUTTON) {
            preview.kill();
            previewCirc.kill()
            this.game.handler.towerPreview = null;
            this.game.handler.towerPreviewCircle = null;
        }

        if (preview === null) {

            // No tower to build so do nothing.

        } else {
            var id = this.game.handler.buildTowerID;

            hasEnoughMoney = (this.game.handler.coins - Tower.towerList[id].cost[0] >= 0) ? true : false;

            // Player wants to build a tower. So preview it
            var lx = preview.x;             //left x value
            var rx = lx + preview.width;    //right x value
            var ty = preview.y;             //top y value
            var by = ty + preview.height;   //bottom y value

            //this.helper.debugLog('x1: ' + lx + ', x2: ' + rx + ', y1: ' + ty + ', y2: ' + by);

            //Attach center of preview to mouse pointer
            preview.x = this.game.input.mousePointer.x - preview.width / 2;
            preview.y = this.game.input.mousePointer.y - preview.height / 2;
            previewCirc.x = this.game.input.mousePointer.x;
            previewCirc.y = this.game.input.mousePointer.y;
            //previewCirc.anchor.set(0.5);

            var freeSpace = this.checkForFreeSpace(lx, rx, ty, by);

            if (freeSpace === false) {

                //No space to build
                preview.tint = this.preview.colorNegative;

            } else {
                //Yes, here is place to build the tower
                preview.tint = this.preview.colorPositive;

                if (this.game.input.mousePointer.justPressed(20)) {

                    if (hasEnoughMoney && this.game.input.mousePointer.isDown) {
                        //var now = Date.now();
                        var tower = new Tower.Builded(lx, ty, this.game.handler.buildTowerID, this.game);

                        //var len = this.game.handler.currentTowers.length;
                        //if (len > 0 && now - this.game.handler.currentTowers[len-1].time < 120) {
                        //    //Last tower was build in the last frame
                        //    //so ignore this new tower
                        //} else {
                        //No tower was accidentally build in the last frame
                        //so we can add the new one
                        this.game.handler.coins -= tower.tower.cost[tower.level];
                        this.game.handler.helperHUD.updateCoins();
                        tower.init();
                        this.game.handler.currentTowers.push(tower);
                        //tower.bullet         = this.game.add.sprite(tower.x, tower.y, 'bullet3');
                        //tower.bullet.visible = false;
                        //this.game.physics.enable(tower.sprite, Phaser.Physics.ARCADE);
                        //this.game.physics.enable(tower.bullet, Phaser.Physics.ARCADE);

                        hasEnoughMoney = (this.game.handler.coins - Tower.towerList[this.game.handler.buildTowerID].cost[0] >= 0) ? true : false;
                        if (!hasEnoughMoney) {
                            //Player is out of money, so kill the preview
                            preview.kill();
                            previewCirc.kill();
                            this.game.handler.towerPreview = null;
                            this.game.handler.towerPreviewCircle = null;
                        }
                    }
                }
            }
        }
    },

    checkForFreeSpace: function (lx, rx, ty, by) {

        var freeSpace = true;

        //Check for other towers
        var tower = null;
        for (var t = 0; t < this.game.handler.currentTowers.length; t++) {
            tower = this.game.handler.currentTowers[t];
            //console.log('x1: ' + lx + ', x2: ' + rx + ', y1: ' + ty + ', y2: ' + by);
            //console.log('xt: ' + tower.x + ', yr: ' + tower.y + ', width: ' + tower.tower.width + ', height: ' + tower.tower.height);
            if (tower.sold === true) {
                continue;
            }
            else if (
                (lx >= tower.x && lx <= (tower.x + tower.tower.width) && (ty >= tower.y && ty <= tower.y + tower.tower.height))
                || (rx >= tower.x && rx <= (tower.x + tower.tower.width) && (ty >= tower.y && ty <= tower.y + tower.tower.height))
                || (lx >= tower.x && lx <= (tower.x + tower.tower.width) && (by >= tower.y && by <= tower.y + tower.tower.height))
                || (rx >= tower.x && rx <= (tower.x + tower.tower.width) && (by >= tower.y && by <= tower.y + tower.tower.height))
            ) {
                //When we are in here, another tower is overlapping
                freeSpace = false;
                return freeSpace;
            }
        }

        //var box = this.game.add.graphics(0, 0);
        //box.drawRect(0, 0, 10, 10);
        //var sprite = this.game.add.sprite(0, 0);
        //sprite.addChild(box);
        //console.log(sprite);
        //this.game.physics.enable(sprite, Phaser.Physics.ARCADE);
        //var boolean = this.game.physics.arcade.collide(sprite, 'Meta');
        //console.log(boolean);


        //Get the tiles (from the tilemap) at the corners of the preview rectangle
        var ulTile = this.game.map.getTileWorldXY(lx, ty, 16, 16, 'Meta');
        var urTile = this.game.map.getTileWorldXY(rx, ty, 16, 16, 'Meta');
        var blTile = this.game.map.getTileWorldXY(lx, by, 16, 16, 'Meta');
        var brTile = this.game.map.getTileWorldXY(rx, by, 16, 16, 'Meta');
        var ceTile = this.game.map.getTileWorldXY(lx + ((rx - lx) / 2), ty + ((by - ty) / 2), 16, 16, 'Meta');

        //this.helper.debugLog('ulTile: ' + ulTile + ', urTile: ' + urTile + ', blTile: ' + blTile + ', brTile: ' + brTile + ', ceTile: ' + ceTile);

        //Check the tiles at the corners
        if ((ulTile !== null && ulTile.properties.Collidable === "true")
            || (urTile !== null && urTile.properties.Collidable === "true")
            || (blTile !== null && blTile.properties.Collidable === "true")
            || (brTile !== null && brTile.properties.Collidable === "true")
            || (ceTile !== null && ceTile.properties.Collidable === "true")) {
            //Can't build here
            freeSpace = false;
            return freeSpace;
        }
        return freeSpace;
    }
}