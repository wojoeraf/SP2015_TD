/**
 * Created by Felix on 09.06.2015.
 */




var Helpers = {};

Helpers.Menu = function (game) {
    this.game          = game;

    //CHAIN-TOWER Hilfsvariablen
    this.b             = false;
    this.xx            = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    this.fp            = new FormProcessing();
    this.helper        = new Helper.Menu(this);
    var player         = new Player();
    this.preview       = {colorPositive: 0x00ee00, colorNegative: 0xff0000};

};

Helpers.Menu.prototype = {

    centerAnchor: function (obj) {
        obj.anchor.set(Math.round(obj.width * 0.5) / obj.width, Math.round(obj.height * 0.5) / obj.height);
    },

    wave1: function (xPoint, yPoint, callback) {
        //EnemiesGesamt = 6 St�ck
        enemyNumber      = 6;
        new Wave1(xPoint, yPoint, callback);
        Game.waveRunning = true;


    },
    wave2: function (xPoint, yPoint, callback) {
        //EnemiesGesamt = 5 St�ck
        enemyNumber      = 5;
        new Wave2(xPoint, yPoint, callback);
        Game.waveRunning = true;


    },
    wave3: function (xPoint, yPoint, callback) {
        //EnemiesGesamt = 5 St�ck
        enemyNumber      = 5;
        new Wave3(xPoint, yPoint, callback);
        Game.waveRunning = true;

    },
    wave4: function (xPoint, yPoint, callback) {
        //EnemiesGesamt = 5 St�ck
        enemyNumber      = 5;
        new Wave4(xPoint, yPoint, callback);
        Game.waveRunning = true;

    },
    wave5: function (xPoint, yPoint, callback) {
        //EnemiesGesamt = 5 St�ck
        enemyNumber      = 5;
        new Wave5(xPoint, yPoint, callback);
        Game.waveRunning = true;

    },
    wave6: function (xPoint, yPoint, callback) {
        //EnemiesGesamt = 5 St�ck
        enemyNumber      = 5;
        new Wave6(xPoint, yPoint, callback);
        Game.waveRunning = true;

    },
    wave7: function (xPoint, yPoint, callback) {
        //EnemiesGesamt = 5 St�ck
        enemyNumber      = 5;
        new Wave7(xPoint, yPoint, callback);
        Game.waveRunning = true;

    },
    wave8: function (xPoint, yPoint, callback) {
        //EnemiesGesamt = 5 St�ck
        enemyNumber      = 5;
        new Wave8(xPoint, yPoint, callback);
        Game.waveRunning = true;

    },
    wave9: function (xPoint, yPoint, callback) {
        //EnemiesGesamt = 5 St�ck
        enemyNumber      = 5;
        new Wave9(xPoint, yPoint, callback);
        Game.waveRunning = true;

    },
    wave10: function (xPoint, yPoint, callback) {
        //EnemiesGesamt = 7 St�ck
        enemyNumber      = 7;
        new Wave10(xPoint, yPoint, callback);
        Game.waveRunning = true;

    },
    wave11: function (xPoint, yPoint, callback) {
        //EnemiesGesamt = 5 St�ck
        enemyNumber      = 5;
        new Wave11(xPoint, yPoint, callback);
        Game.waveRunning = true;

    },
    wave12: function (xPoint, yPoint, callback) {
        //EnemiesGesamt = 12 St�ck
        enemyNumber      = 12;
        new Wave12(xPoint, yPoint, callback);
        Game.waveRunning = true;

    },
    wave13: function (xPoint, yPoint, callback) {
        //EnemiesGesamt = 8 St�ck
        enemyNumber      = 8;
        new Wave13(xPoint, yPoint, callback);
        Game.waveRunning = true;

    },
    //Healthbars hinzuf�gen f�r jeden sprite
    createHealthbars: function () {
        if (Game.waveRunning == true) {
            for (var j = 0; j < enemyNumber; j++) {
                var healthbar = healthBars[j];
                var sprite    = sprites[j];
                if (sprite != null) {
                    healthbar.x = sprite.x + 12;
                    healthbar.y = sprite.y - 10;
                }
            }
        }
    },

    //EnemyWellen starten
    enemiesRun: function (callback) {
        if (Game.waveRunning == true) {
            var x = false;
            for (var i = 0; i < enemyNumber; i++) {
                if (array[i] != 5) {
                    callback.nextWave(sprites[i], i, callback);
                    x = true;
                }
            }
            this.checkColl(sprites, counterArray, callback);
            //Wenn x==false -> Alle Sprites sind entweder durchgelaufen oder tot -> enemyWaveNr++
            if (x == false) {
                if (diamondAction == true) {
                    diamondAction = false;
                }
                Game.waveRunning = false;
                enemyWaveNr      = enemyWaveNr + 1;
                if (levelchooser == 1) {
                    if (enemyWaveNr > 10) {
                        callback.add.text(350, 580, "You won !");
                    }
                }
                else if (levelchooser == 2) {
                    if (enemyWaveNr > 8) {
                        callback.add.text(350, 580, "You won !");
                    }
                }
                else if (levelchooser == 3) {
                    if (enemyWaveNr > 9) {
                        callback.add.text(350, 580, "You won !");
                    }
                }
            }
        }
        else {
            if (this.b == true) {
                for (var yy = 0; yy < this.xx.length; yy++) {
                    if (this.xx[yy] != 0) {
                        this.xx[yy].destroy();
                    }
                    this.b = false;
                }
            }
        }
    },



    mobsWalk: function() {

    },

    //Collision�berpr�fung
    checkColl: function (spriteArray, counterArray, callback) {
        if (Game.waveRunning == true) {
            for (var l = 0; l < towerC; l++) {
                //SpriteArray neu ordnen -> Wer ist erster?
                for (var a = 0; a < spriteArray.length; a++) {
                    var z = spriteArray.length - a - 1;
                    if ((spriteArray[z] != null)) {
                        for (var b = 1; b < spriteArray.length; b++) {
                            var zz = spriteArray.length - b - 1;
                            if (spriteArray[zz] != null) {
                                if (spriteArray[z].x > (spriteArray[zz].x + 20)) {
                                    var n           = spriteArray[zz];
                                    var arr         = array[zz];
                                    spriteArray[zz] = spriteArray[z];
                                    array[zz]       = array[z];
                                    spriteArray[z]  = n;
                                    array[z]        = arr;
                                }
                            }
                        }
                    }
                }
                for (var k = 0; k < spriteArray.length; k++) {
                    var i = towerC - l - 1;
                    var j = spriteArray.length - k - 1;

                    if (towers[i].isDestroyed == false) {
                        if (array[j] != 5) {
                            var speeed  = towers[i].speeed;
                            var reach   = towers[i].reach;
                            var lifeVar = spriteArray[j].beginLife;
                            if (callback.physics.arcade.distanceBetween(towers[i], spriteArray[j]) < reach) {
                                callback.physics.enable(bullets[i], Phaser.Physics.ARCADE);
                                callback.physics.enable(bullets[i], spriteArray[j]);
                                bullets[i].visible = true;
                                var bullet         = bullets[i];
                                if (counterArray[j] == 0) {
                                    bullet.reset(towers[i].x, towers[i].y);
                                    counterArray[j] = 1;
                                }
                                callback.physics.arcade.moveToObject(bullet, spriteArray[j], speeed);
                                var col            = callback.physics.arcade.collide(bullet, spriteArray[j]);
                                if (col == true) {
                                    //TOWER3 = CHAIN
                                    if (towers[i].typ == 2) {
                                        spriteArray[j].body.bounce.set(-1.50);
                                        counterArray[j]       = 0;
                                        if (diamondAction == false) {
                                            spriteArray[j].life = spriteArray[j].life - 0.33;
                                        }
                                        else {
                                            spriteArray[j].life = spriteArray[j].life - 0.7;
                                        }
                                        bullet.reset(towers[i].x, towers[i].y);
                                        bullet.visible        = false;
                                        healthBars[j].scale.x = 0.033 * (spriteArray[j].life / lifeVar);
                                        if (spriteArray[j].life <= 0) {
                                            spriteArray[j].visible = false;
                                            spriteArray[j].destroy();
                                            spriteArray[j]         = null;
                                            coins                  = coins + 7;
                                            coinsVal.destroy();
                                            coinsVal               = callback.add.text(100, 20, coins);
                                            Game.Main.score        = Game.Main.score + 100;
                                            scoreText.destroy();
                                            scoreText              = callback.add.text(730, 20, "Score: " + Game.Main.score);
                                            xpBar.scale.x          = xpBar.scale.x + 0.002;
                                            if (xpBar.scale.x > 0.34) {
                                                xpBar.scale.set(0.2);
                                                xpBar.scale.x = 0.0;
                                            }
                                            array[j]       = 5;
                                            bullet.reset(towers[i].x, towers[i].y);
                                            bullet.visible = false;
                                            healthBars[j].destroy();
                                        }
                                        for (var y = 0; y < spriteArray.length; y++) {
                                            if (spriteArray[y] != null) {
                                                //this.xx[y] = callback.add.sprite(spriteArray[y].x, spriteArray[y].y - 20, 'bullet3');
                                                spriteArray[y].life = spriteArray[y].life - 0.33;
                                                if (healthBars[y] != 0) {
                                                    if (healthBars[y] != null) {
                                                        healthBars[y].scale.x = 0.033 * (spriteArray[y].life / lifeVar);
                                                        if (spriteArray[y].life <= 0) {
                                                            spriteArray[y].destroy();
                                                            spriteArray[y]  = null;
                                                            array[y]        = 5;
                                                            coins           = coins + 7;
                                                            coinsVal.destroy();
                                                            coinsVal        = callback.add.text(100, 20, coins);
                                                            Game.Main.score = Game.Main.score + 100;
                                                            scoreText.destroy();
                                                            scoreText       = callback.add.text(730, 20, "Score: " + Game.Main.score);
                                                        }
                                                    }
                                                }
                                            }
                                            this.b = true;
                                        }

                                    }
                                    //TOWER4 = SLOW
                                    else if (towers[i].typ == 3) {
                                        //Enemies werden nicht mehr so weit abgedr�ngt bei einer Collision
                                        spriteArray[j].body.bounce.set(-1.50);
                                        counterArray[j]       = 0;
                                        if (diamondAction == false) {
                                            spriteArray[j].speed = spriteArray[j].speed - 7.5;
                                        }
                                        else {
                                            spriteArray[j].speed = spriteArray[j].speed - 15;
                                        }
                                        bullet.reset(towers[i].x, towers[i].y);
                                        bullet.visible        = false;
                                        healthBars[j].scale.x = 0.033 * (spriteArray[j].life / lifeVar);
                                        if (spriteArray[j].speed <= 0) {
                                            spriteArray[j].visible = false;
                                            spriteArray[j].destroy();
                                            spriteArray[j]         = null;
                                            coins                  = coins + 7;
                                            coinsVal.destroy();
                                            coinsVal               = callback.add.text(100, 20, coins);
                                            Game.Main.score        = Game.Main.score + 100;
                                            scoreText.destroy();
                                            scoreText              = callback.add.text(730, 20, "Score: " + Game.Main.score);
                                            xpBar.scale.x          = xpBar.scale.x + 0.002;
                                            if (xpBar.scale.x > 0.34) {
                                                xpBar.scale.set(0.2);
                                                xpBar.scale.x = 0.0;
                                            }
                                            array[j]       = 5;
                                            bullet.reset(towers[i].x, towers[i].y);
                                            bullet.visible = false;
                                            healthBars[j].destroy();
                                        }
                                        if (spriteArray[j] != null) {
                                            if (spriteArray[j].life <= 0) {
                                                spriteArray[j].visible = false;
                                                spriteArray[j].destroy();
                                                spriteArray[j]         = null;
                                                coins                  = coins + 7;
                                                coinsVal.destroy();
                                                coinsVal               = callback.add.text(100, 20, coins);
                                                Game.Main.score        = Game.Main.score + 100;
                                                scoreText.destroy();
                                                scoreText              = callback.add.text(730, 20, "Score: " + Game.Main.score);
                                                xpBar.scale.x          = xpBar.scale.x + 0.002;
                                                if (xpBar.scale.x > 0.34) {
                                                    xpBar.scale.set(0.2);
                                                    xpBar.scale.x = 0.0;
                                                }
                                                array[j]       = 5;
                                                bullet.reset(towers[i].x, towers[i].y);
                                                bullet.visible = false;
                                                healthBars[j].destroy();
                                            }
                                        }
                                    }
                                    //TOWER 1 und 2 = NORMAL
                                    else {
                                        //Enemies werden nicht mehr so weit abgedr�ngt bei einer Collision
                                        spriteArray[j].body.bounce.set(-1.50);
                                        counterArray[j]       = 0;
                                        if (diamondAction == false) {
                                            spriteArray[j].life = spriteArray[j].life - 1;
                                        }
                                        else {
                                            spriteArray[j].life = spriteArray[j].life - 2;
                                        }
                                        bullet.reset(towers[i].x, towers[i].y);
                                        bullet.visible        = false;
                                        healthBars[j].scale.x = 0.033 * (spriteArray[j].life / lifeVar);
                                        if (spriteArray[j].life <= 0) {
                                            spriteArray[j].visible = false;
                                            spriteArray[j].destroy();
                                            spriteArray[j]         = null;
                                            coins                  = coins + 7;
                                            coinsVal.destroy();
                                            coinsVal               = callback.add.text(100, 20, coins);
                                            Game.Main.score        = Game.Main.score + 100;
                                            console.log('Score: ' + Game.Main.score);
                                            scoreText.destroy();
                                            scoreText              = callback.add.text(730, 20, "Score: " + Game.Main.score);
                                            xpBar.scale.x          = xpBar.scale.x + 0.002;
                                            if (xpBar.scale.x > 0.34) {
                                                xpBar.scale.set(0.2);
                                                xpBar.scale.x = 0.0;
                                            }
                                            array[j]       = 5;
                                            bullet.reset(towers[i].x, towers[i].y);
                                            bullet.visible = false;
                                            healthBars[j].destroy();
                                        }
                                    }

                                }
                            }
                        }
                    }
                }

            }

        }
    },

    //PopUp-Fenster
    popUp: function (callback) {

        if (popup != undefined) {
            this.closeWindow();
        }


        callback.paused = true;
        callback.state.pause();

        this.fp.showPopup();

        popup              = callback.add.sprite(callback.world.centerX, callback.world.centerY, 'background');
        popup.alpha        = 0.8;
        popup.anchor.set(0.5);
        popup.inputEnabled = true;
        backButton         = callback.add.button(callback.world.centerX - 97, callback.world.centerY + 150, 'Return', this.closeWindow, this);
        quitButton         = callback.add.button(callback.world.centerX - 107, callback.world.centerY + 60, 'Quit', this.quit, callback);

    },

    closeWindow: function () {

        this.fp.hidePopup();

        quitButton.destroy();
        backButton.destroy();
        popup.destroy();

    },

    quit: function () {

        var fp = new FormProcessing();
        fp.hidePopup();

        Game.waveRunning = false;
        enemyWaveNr      = 0;
        for (var k = 0; k < towerC; k++) {
            towers[k] = 0;
        }
        this.state.clearCurrentState();
        this.state.start("MainMenu", true);

    },

    //InfoTower1
    infoTower1: function () {
        if (popupinfoTower1 != null) {
            popupinfoTower1.destroy();
        }
        popupinfoTower1         = this.add.sprite(button1.x + 40, button1.y - 30, 'towerInfo1');
        popupinfoTower1.scale.x = 0.8;
        popupinfoTower1.scale.y = 0.8;
        popupinfoTower1.alpha   = 0.8;
        popupinfoTower1.anchor.set(0.5);
    },
    infoTower1Delete: function () {
        popupinfoTower1.destroy();
    },

    //InfoTower2
    infoTower2: function () {
        if (popupinfoTower2 != null) {
            popupinfoTower2.destroy();
        }
        popupinfoTower2         = this.add.sprite(button2.x + 40, button2.y - 30, 'towerInfo2');
        popupinfoTower2.scale.x = 0.8;
        popupinfoTower2.scale.y = 0.8;
        popupinfoTower2.alpha   = 0.8;
        popupinfoTower2.anchor.set(0.5);
    },
    infoTower2Delete: function () {
        popupinfoTower2.destroy();
    },

    //InfoTower3
    infoTower3: function () {
        if (popupinfoTower3 != null) {
            popupinfoTower3.destroy();
        }
        popupinfoTower3         = this.add.sprite(button3.x + 40, button3.y - 30, 'towerInfo3');
        popupinfoTower3.scale.x = 0.8;
        popupinfoTower3.scale.y = 0.8;
        popupinfoTower3.alpha   = 0.8;
        popupinfoTower3.anchor.set(0.5);
    },
    infoTower3Delete: function () {
        popupinfoTower3.destroy();
    },
    //InfoTower4
    infoTower4: function () {
        if (popupinfoTower4 != null) {
            popupinfoTower4.destroy();
        }
        popupinfoTower4         = this.add.sprite(button4.x + 40, button4.y - 30, 'towerInfo4');
        popupinfoTower4.scale.x = 0.8;
        popupinfoTower4.scale.y = 0.8;
        popupinfoTower4.alpha   = 0.8;
        popupinfoTower4.anchor.set(0.5);
    },
    infoTower4Delete: function () {
        popupinfoTower4.destroy();
    },
    diamondClicked: function (callback) {
        if (player.diamonds >= 1) {
            diamonds      = player.diamonds - 1;
            diamondAction = true;
            diamondsVal.destroy();
            diamondsVal   = callback.add.text(200, 20, diamonds);
        }
        if (diamondInfo != null) {
            diamondInfo.destroy();
        }
    },

    diamondInfo: function () {
        if (diamondInfo != null) {
            diamondInfo.destroy();
        }
        diamondInfo         = this.add.sprite(button5.x + 40, button5.y - 30, 'DiamondInfo');
        diamondInfo.scale.x = 0.7;
        diamondInfo.scale.y = 0.7;
        diamondInfo.alpha   = 0.8;
        diamondInfo.anchor.set(0.5);
    },
    diamondInfoDelete: function () {
        diamondInfo.destroy();
    },
    popUpT: function (c, callback) {
        if (popup != undefined) {
            popup.destroy();
        }
        if (deleteButton != undefined) {
            deleteButton.destroy();
            upgradeButton.destroy();
            exitButton.destroy();
        }
        towerB                = c;
        popup                 = callback.add.sprite(c.x + 60, c.y - 50, 'backgroundT');
        popup.alpha           = 0.8;
        popup.anchor.set(0.5);
        popup.scale.x         = 0.6;
        popup.inputEnabled    = true;
        upgradeButton         = callback.add.button(c.x + 30, c.y - 90, 'UpgradeT', this.upgradeTower1, callback);
        upgradeButton.events.onInputOver.add(this.upgradeTowerInfo1, callback);
        upgradeButton.events.onInputOut.add(this.upgradeTowerInfoDelete, callback);
        upgradeButton.scale.x = 0.8;
        upgradeButton.scale.y = 0.8;
        deleteButton          = callback.add.button(c.x + 30, c.y - 40, 'Sell', this.deleteTower, callback);
        deleteButton.scale.x  = 0.8;
        deleteButton.scale.y  = 0.8;
        exitButton            = callback.add.button(c.x + 90, c.y - 100, 'Exit', this.deleteAll, callback);
        exitButton.scale.x    = 0.3;
        exitButton.scale.y    = 0.3;

    },
    popUpT2: function (c, callback) {
        if (popup != undefined) {
            popup.destroy();
        }
        if (deleteButton != undefined) {
            deleteButton.destroy();
            upgradeButton.destroy();
            exitButton.destroy();
        }
        towerB                = c;
        popup                 = callback.add.sprite(c.x + 60, c.y - 50, 'backgroundT');
        popup.alpha           = 0.8;
        popup.anchor.set(0.5);
        popup.scale.x         = 0.6;
        popup.inputEnabled    = true;
        upgradeButton         = callback.add.button(c.x + 30, c.y - 90, 'UpgradeT', this.upgradeTower2, callback);
        upgradeButton.events.onInputOver.add(this.upgradeTowerInfo2, callback);
        upgradeButton.events.onInputOut.add(this.upgradeTowerInfoDelete, callback);
        upgradeButton.scale.x = 0.8;
        upgradeButton.scale.y = 0.8;
        deleteButton          = callback.add.button(c.x + 30, c.y - 40, 'Sell', this.deleteTower, callback);
        deleteButton.scale.x  = 0.8;
        deleteButton.scale.y  = 0.8;
        exitButton            = callback.add.button(c.x + 90, c.y - 100, 'Exit', this.deleteAll, callback);
        exitButton.scale.x    = 0.3;
        exitButton.scale.y    = 0.3;

    },
    popUpT3: function (c, callback) {
        if (popup != undefined) {
            popup.destroy();
        }
        if (deleteButton != undefined) {
            deleteButton.destroy();
            upgradeButton.destroy();
            exitButton.destroy();
        }
        towerB                = c;
        popup                 = callback.add.sprite(c.x + 60, c.y - 50, 'backgroundT');
        popup.alpha           = 0.8;
        popup.anchor.set(0.5);
        popup.scale.x         = 0.6;
        popup.inputEnabled    = true;
        upgradeButton         = callback.add.button(c.x + 30, c.y - 90, 'UpgradeT', this.upgradeTower3, callback);
        upgradeButton.events.onInputOver.add(this.upgradeTowerInfo3, callback);
        upgradeButton.events.onInputOut.add(this.upgradeTowerInfoDelete, callback);
        upgradeButton.scale.x = 0.8;
        upgradeButton.scale.y = 0.8;
        deleteButton          = callback.add.button(c.x + 30, c.y - 40, 'Sell', this.deleteTower, callback);
        deleteButton.scale.x  = 0.8;
        deleteButton.scale.y  = 0.8;
        exitButton            = callback.add.button(c.x + 90, c.y - 100, 'Exit', this.deleteAll, callback);
        exitButton.scale.x    = 0.3;
        exitButton.scale.y    = 0.3;

    },
    popUpT4: function (c, callback) {
        if (popup != undefined) {
            popup.destroy();
        }
        if (deleteButton != undefined) {
            deleteButton.destroy();
            upgradeButton.destroy();
            exitButton.destroy();
        }
        towerB                = c;
        popup                 = callback.add.sprite(c.x + 60, c.y - 50, 'backgroundT');
        popup.alpha           = 0.8;
        popup.anchor.set(0.5);
        popup.scale.x         = 0.6;
        popup.inputEnabled    = true;
        upgradeButton         = callback.add.button(c.x + 30, c.y - 90, 'UpgradeT', this.upgradeTower4, callback);
        upgradeButton.events.onInputOver.add(this.upgradeTowerInfo4, callback);
        upgradeButton.events.onInputOut.add(this.upgradeTowerInfoDelete, callback);
        upgradeButton.scale.x = 0.8;
        upgradeButton.scale.y = 0.8;
        deleteButton          = callback.add.button(c.x + 30, c.y - 40, 'Sell', this.deleteTower, callback);
        deleteButton.scale.x  = 0.8;
        deleteButton.scale.y  = 0.8;
        exitButton            = callback.add.button(c.x + 90, c.y - 100, 'Exit', this.deleteAll, callback);
        exitButton.scale.x    = 0.3;
        exitButton.scale.y    = 0.3;

    },
    upgradeTower1: function () {
        var c = towerB;
        if (c.speeed != 450) {
            //1.Update
            if (c.isUpgraded == false) {
                if ((Game.Main.score > 500) && (coins >= 25)) {
                    c.speeed     = 350;
                    c.reach      = 250;
                    c.isUpgraded = true;
                    coins        = coins - 25;
                    coinsVal.destroy();
                    coinsVal     = this.add.text(100, 20, coins);
                }

            }
            else if (c.isUpgraded == true) {
                if ((Game.Main.score > 1000) && (coins >= 50)) {
                    c.speeed = 450;
                    c.reach  = 300;
                    coins    = coins - 50;
                    coinsVal.destroy();
                    coinsVal = this.add.text(100, 20, coins);
                }
            }

        }
        popup.destroy();
        popupinfoTower1U.destroy();
        deleteButton.destroy();
        upgradeButton.destroy();
        exitButton.destroy();

    },
    upgradeTower2: function () {
        var c = towerB;
        if (c.speeed != 650) {
            //1.Update
            if (c.isUpgraded == false) {
                if ((Game.Main.score > 1000) && (coins >= 50)) {
                    c.speeed     = 550;
                    c.reach      = 300;
                    c.isUpgraded = true;
                    coins        = coins - 50;
                    coinsVal.destroy();
                    coinsVal     = this.add.text(100, 20, coins);
                }

            }
            else if (c.isUpgraded == true) {
                if ((Game.Main.score > 2000) && (coins >= 100)) {
                    c.speeed = 650;
                    c.reach  = 350;
                    coins    = coins - 100;
                    coinsVal.destroy();
                    coinsVal = this.add.text(100, 20, coins);
                }
            }

        }
        popup.destroy();
        popupinfoTower1U.destroy();
        deleteButton.destroy();
        upgradeButton.destroy();
        exitButton.destroy();

    },
    upgradeTower3: function () {
        var c = towerB;
        if (c.speeed != 400) {
            //1.Update
            if (c.isUpgraded == false) {
                if ((Game.Main.score > 1000) && (coins >= 50)) {
                    c.speeed     = 320;
                    c.reach      = 220;
                    c.isUpgraded = true;
                    coins        = coins - 50;
                    coinsVal.destroy();
                    coinsVal     = this.add.text(100, 20, coins);
                }

            }
            else if (c.isUpgraded == true) {
                if ((Game.Main.score > 2000) && (coins >= 100)) {
                    c.speeed = 400;
                    c.reach  = 270;
                    coins    = coins - 100;
                    coinsVal.destroy();
                    coinsVal = this.add.text(100, 20, coins);
                }
            }

        }
        popup.destroy();
        popupinfoTower1U.destroy();
        deleteButton.destroy();
        upgradeButton.destroy();
        exitButton.destroy();

    },
    upgradeTower4: function () {
        var c = towerB;
        if (c.speeed != 300) {
            //1.Update
            if (c.isUpgraded == false) {
                if ((Game.Main.score > 500) && (coins >= 25)) {
                    c.speeed     = 230;
                    c.reach      = 200;
                    c.isUpgraded = true;
                    coins        = coins - 25;
                    coinsVal.destroy();
                    coinsVal     = this.add.text(100, 20, coins);
                }

            }
            else if (c.isUpgraded == true) {
                if ((Game.Main.score > 1000) && (coins >= 50)) {
                    c.speeed = 300;
                    c.reach  = 230;
                    coins    = coins - 50;
                    coinsVal.destroy();
                    coinsVal = this.add.text(100, 20, coins);
                }
            }

        }
        popup.destroy();
        popupinfoTower1U.destroy();
        deleteButton.destroy();
        upgradeButton.destroy();
        exitButton.destroy();

    },
    upgradeTowerInfoDelete: function () {
        popupinfoTower1U.destroy();
    },
    deletePopUp: function () {
        popup.destroy();
        if (popupinfoTower1U != undefined) {
            popupinfoTower1U.destroy();
        }
        deleteButton.destroy();
        upgradeButton.destroy();
    },
    deleteTower: function () {
        popup.destroy();
        deleteButton.destroy();
        upgradeButton.destroy();
        exitButton.destroy();
        coins              = Math.round(coins + towerB.cost * (0.66));
        coinsVal.destroy();
        coinsVal           = this.add.text(100, 20, coins);
        towerB.isDestroyed = true;
        towerB.destroy();

    },

    deleteAll: function () {
        popup.destroy();
        deleteButton.destroy();
        upgradeButton.destroy();
        exitButton.destroy();
    },

    upgradeTowerInfo1: function () {
        var c = towerB;
        if (c.speeed != 450) {
            // popupinfoTower1U.destroy();
            if (c.isUpgraded == false) {
                if ((Game.Main.score > 500) && (coins >= 25)) {
                    popupinfoTower1U = this.add.sprite(upgradeButton.x + 80, upgradeButton.y - 30, 'tower1Upgrade1');
                }
                else {
                    popupinfoTower1U = this.add.sprite(upgradeButton.x + 80, upgradeButton.y - 30, 'tower1Upgrade1F');
                }

            }
            else if (c.isUpgraded == true) {
                if ((Game.Main.score > 1000) && (coins >= 50)) {
                    popupinfoTower1U = this.add.sprite(upgradeButton.x + 80, upgradeButton.y - 30, 'tower1Upgrade2');
                }
                else {
                    popupinfoTower1U = this.add.sprite(upgradeButton.x + 80, upgradeButton.y - 30, 'tower1Upgrade2F');
                }


            }
        }
        popupinfoTower1U.scale.x = 0.7;
        popupinfoTower1U.scale.y = 0.7;
        popupinfoTower1U.alpha   = 0.8;
        popupinfoTower1U.anchor.set(0.2);

    },

    upgradeTowerInfo2: function () {
        var c = towerB;
        if (c.speeed != 650) {
            // popupinfoTower1U.destroy();
            if (c.isUpgraded == false) {
                if ((Game.Main.score > 1000) && (coins >= 50)) {
                    popupinfoTower1U = this.add.sprite(upgradeButton.x + 80, upgradeButton.y - 30, 'tower2Upgrade1');
                }
                else {
                    popupinfoTower1U = this.add.sprite(upgradeButton.x + 80, upgradeButton.y - 30, 'tower2Upgrade1F');
                }

            }
            else if (c.isUpgraded == true) {
                if ((Game.Main.score > 2000) && (coins >= 100)) {
                    popupinfoTower1U = this.add.sprite(upgradeButton.x + 80, upgradeButton.y - 30, 'tower2Upgrade2');
                }
                else {
                    popupinfoTower1U = this.add.sprite(upgradeButton.x + 80, upgradeButton.y - 30, 'tower2Upgrade2F');
                }


            }
        }
        popupinfoTower1U.scale.x = 0.7;
        popupinfoTower1U.scale.y = 0.7;
        popupinfoTower1U.alpha   = 0.8;
        popupinfoTower1U.anchor.set(0.2);

    },

    upgradeTowerInfo3: function () {
        var c = towerB;
        if (c.speeed != 400) {
            // popupinfoTower1U.destroy();
            if (c.isUpgraded == false) {
                if ((Game.Main.score > 1000) && (coins >= 50)) {
                    popupinfoTower1U = this.add.sprite(upgradeButton.x + 80, upgradeButton.y - 30, 'tower3Upgrade1');
                }
                else {
                    popupinfoTower1U = this.add.sprite(upgradeButton.x + 80, upgradeButton.y - 30, 'tower3Upgrade1F');
                }

            }
            else if (c.isUpgraded == true) {
                if ((Game.Main.score > 2000) && (coins >= 100)) {
                    popupinfoTower1U = this.add.sprite(upgradeButton.x + 80, upgradeButton.y - 30, 'tower3Upgrade2');
                }
                else {
                    popupinfoTower1U = this.add.sprite(upgradeButton.x + 80, upgradeButton.y - 30, 'tower3Upgrade2F');
                }


            }
        }
        popupinfoTower1U.scale.x = 0.7;
        popupinfoTower1U.scale.y = 0.7;
        popupinfoTower1U.alpha   = 0.8;
        popupinfoTower1U.anchor.set(0.2);

    },
    upgradeTowerInfo4: function () {
        var c = towerB;
        if (c.speeed != 300) {
            // popupinfoTower1U.destroy();
            if (c.isUpgraded == false) {
                if ((Game.Main.score > 500) && (coins >= 25)) {
                    popupinfoTower1U = this.add.sprite(upgradeButton.x + 80, upgradeButton.y - 30, 'tower4Upgrade1');
                }
                else {
                    popupinfoTower1U = this.add.sprite(upgradeButton.x + 80, upgradeButton.y - 30, 'tower4Upgrade1F');
                }

            }
            else if (c.isUpgraded == true) {
                if ((Game.Main.score > 1000) && (coins >= 50)) {
                    popupinfoTower1U = this.add.sprite(upgradeButton.x + 80, upgradeButton.y - 30, 'tower4Upgrade2');
                }
                else {
                    popupinfoTower1U = this.add.sprite(upgradeButton.x + 80, upgradeButton.y - 30, 'tower4Upgrade2F');
                }


            }
        }
        popupinfoTower1U.scale.x = 0.7;
        popupinfoTower1U.scale.y = 0.7;
        popupinfoTower1U.alpha   = 0.8;
        popupinfoTower1U.anchor.set(0.2);

    }

};
