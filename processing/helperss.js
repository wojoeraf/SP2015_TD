/**
 * Created by Felix on 09.06.2015.
 */
var Helpers = {};

Helpers.Menu = function () {

}

Helpers.Menu.prototype = {


    //EnemyWellen erzeugen
    buildWave: function(spriteType,number,speed,lfs,xPoint,yPoint,callback){
        lifeVar=lfs;
        enemyNumber=number;
        for(var i=0;i<number;i++){
            //Enemy-Typ 1
            if(spriteType==1) {
                var positionX=(xPoint+25*i);
                sprites[i] = callback.add.sprite(positionX, yPoint, 'player', 1);
                healthBars[i] =callback.add.sprite(positionX,yPoint-10,'xpBar2',1);
                sprites[i].animations.add('left', [8, 9], 10, true);
                sprites[i].animations.add('right', [1, 2], 10, true);
                sprites[i].animations.add('up', [11, 12, 13], 10, true);
                sprites[i].animations.add('down', [4, 5, 6], 10, true);
                sprites[i].speed = speed;
                sprites[i].visible = false;
                sprites[i].life = lfs;
                healthBars[i].scale.set(0.05);
                healthBars[i].scale.x=0.033;
                callback.physics.enable(sprites[i], Phaser.Physics.ARCADE);
                array[i]=0;
            }
            //Enemy-Typ 2
            else if (spriteType==2){

            }
        }
        bool = true;
    },

    //Healthbars hinzufügen für jeden sprite
    createHealthbars: function(){

        if(bool==true){
            for(var j=0;j<enemyNumber;j++) {
                var healthbar = healthBars[j];
                var sprite = sprites[j];
                if(sprite!=null) {
                    healthbar.x = sprite.x;
                    healthbar.y = sprite.y - 10;
                }
            }
        }
    },

    //EnemyWellen starten
    enemiesRun: function(callback){
        if(bool==true){
            var x=false;
            for(var i=0;i<enemyNumber;i++){
                if(array[i]!=5){
                    callback.nextWave(sprites[i],i,callback);
                    x = true;
                }
            }
            this.checkColl(sprites,counterArray,callback);
            //Wenn x==false -> Alle Sprites sind entweder durchgelaufen oder tot -> enemyWaveNr++
            if(x==false){
                bool= false;
                enemyWaveNr=enemyWaveNr+1;
            }
        }
    },

    //TowerBuildingfunktion
    towerBuilding: function(callback){
        if(marker!=null){
            marker.x = callback.input.mousePointer.x;
            marker.y = callback.input.mousePointer.y;
            try{
                //Nur auf grünen Flächen dürfen Türme gebaut werden!
                if(((map.getTile(Math.round(marker.x/64),Math.round(marker.y/64)).index)==3)||
                    ((map.getTile(Math.round((marker.x-32)/64),Math.round(marker.y/64)).index)==3)||
                    ((map.getTile(Math.round(marker.x/64),Math.round((marker.y-32)/64)).index)==3))
                {
                    marker.lineStyle(2, 0xff0000, 1);
                    marker.drawRect(0, 0, 32, 32);
                    //Mitte -> Towerauswahl rückgängig
                    if(callback.input.mouse.button==1){
                        marker.destroy();
                        marker = null;
                    }
                }
                //Keine Towers in der oberen Leiste und in der Towerauswahlleiste!
                else if((marker.y<50)||(marker.y>600)){
                    marker.lineStyle(2, 0xff0000, 1);
                    marker.drawRect(0, 0, 32, 32);
                    //Mitte -> Towerauswahl rückgängig
                    if (callback.input.mouse.button == 1) {
                        marker.destroy();
                        marker = null;
                    }
                }
                else{
                    marker.lineStyle(2, 0x000000, 1);
                    marker.drawRect(0, 0, 32, 32);
                    var c =  callback.physics.arcade.collide(marker.x,marker.y, 'tower1');
                    if (callback.input.mousePointer.isDown==true) {

                        //Welcher Button 0=Links,1=Mitte
                        //Links -> Tower platzieren
                        if (callback.input.mouse.button == 0) {

                            //Tower auf Tower platzieren nicht möglich machen
                            for(var k=0;k<towerC;k++){
                                if((marker.x+32>towers[k].x)&&(marker.x<towers[k].x+32)&&((marker.y+32>towers[k].y)&&(marker.y<towers[k].y+32))){
                                    marker.lineStyle(2, 0xff0000, 1);
                                    marker.drawRect(0, 0, 32, 32);
                                    c=true;
                                }
                            }

                            if (c == false) {
                                //Je nach Tower -> unterschiedliche Eigenschaften (Reichweite etc..)
                                //Tower 1
                                if (towerButton == 0) {
                                    if ((coins - 30) >= 0) {
                                        var c = towerC;
                                        towers[towerC] = callback.add.sprite(marker.x, marker.y, 'tower');
                                        towers[towerC].inputEnabled = true;
                                        towers[towerC].input.useHandCursor = true;
                                        towers[towerC].events.onInputDown.add(this.upgradeTower1, callback);
                                        towers[towerC].events.onInputOver.add(this.upgradeTower1Info,callback);
                                        towers[towerC].events.onInputOut.add(this.upgradeTower1InfoDelete,callback);
                                        towers[towerC].x=marker.x;
                                        towers[towerC].y=marker.y;
                                        towers[towerC].typ = 0;
                                        towers[towerC].cost = 30;
                                        towers[towerC].speeed=200;
                                        towers[towerC].reach=100;
                                        towers[towerC].isUpgraded=false;
                                        coins = coins - 30;
                                        coinText.destroy();
                                        coinText = callback.add.text(100, 20, coins);
                                        bullets[towerC] = callback.add.sprite(marker.x, marker.y, 'bullet');
                                        bullets[towerC].visible = false;
                                        callback.physics.enable(towers[towerC], Phaser.Physics.ARCADE);
                                        callback.physics.enable(bullets[towerC], Phaser.Physics.ARCADE);
                                        towerC++;
                                        marker.destroy();
                                        marker = null;
                                    }
                                }
                                //Tower 2
                                else if (towerButton == 1) {
                                    if ((coins - 70) >= 0) {
                                        towers[towerC] = callback.add.sprite(marker.x, marker.y, 'tower2');
                                        towers[towerC].inputEnabled = true;
                                        towers[towerC].input.useHandCursor = true;
                                        towers[towerC].events.onInputDown.add(this.upgradeTower2, callback);
                                        towers[towerC].events.onInputOver.add(this.upgradeTower2Info,callback);
                                        towers[towerC].events.onInputOut.add(this.upgradeTower2InfoDelete,callback);
                                        towers[towerC].x=marker.x;
                                        towers[towerC].y=marker.y;
                                        towers[towerC].typ = 1;
                                        towers[towerC].cost = 70;
                                        towers[towerC].speeed=600;
                                        towers[towerC].reach=250;
                                        towers[towerC].isUpgraded=false;
                                        coins = coins - 70;
                                        coinText.destroy();
                                        coinText = callback.add.text(100, 20, coins);
                                        bullets[towerC] = callback.add.sprite(marker.x, marker.y, 'bullet2');
                                        bullets[towerC].visible = false;
                                        callback.physics.enable(towers[towerC], Phaser.Physics.ARCADE);
                                        callback.physics.enable(bullets[towerC], Phaser.Physics.ARCADE);
                                        towerC++;
                                        marker.destroy();
                                        marker = null;
                                    }
                                }
                            }
                        }
                        //Mitte -> Towerauswahl rückgängig
                        else if(callback.input.mouse.button==1){
                            marker.destroy();
                            marker = null;
                        }
                    }
                }

            }
            catch(e){

            }
        }

    },

    //1.Tower hinzufügen
    addTower: function (callback) {
        if(marker!=null){
            marker.destroy();
            marker=null;
        }
        else{
            towerButton=0;
            marker = callback.add.graphics();
            marker.lineStyle(2, 0x000000, 1);
            marker.drawRect(0, 0, 32, 32);
            marker.x = callback.input.mousePointer.x;
            marker.y = callback.input.mousePointer.y;
        }
    },
    //2.Tower hinzufügen
    addTower2: function (callback) {
        if(marker!=null){
            marker.destroy();
            marker=null;
        }
        else{
            towerButton=1;
            marker = callback.add.graphics();
            marker.lineStyle(2, 0x000000, 1);
            marker.drawRect(0, 0, 32, 32);
            marker.x = callback.input.mousePointer.x;
            marker.y = callback.input.mousePointer.y;
        }
    },
    //Collisionüberprüfung
    checkColl : function(spriteArray,counterArray,callback){
        if(bool==true){
            for(var l=0;l<towerC;l++){
                for(var k=0;k<spriteArray.length;k++){
                    var i = towerC-l-1;
                    var j = spriteArray.length-k-1;
                    if(array[j]!=5){
                        var speeed = towers[i].speeed;
                        var reach = towers[i].reach;
                        if(callback.physics.arcade.distanceBetween(towers[i], spriteArray[j]) < reach){
                            callback.physics.enable(bullets[i], Phaser.Physics.ARCADE);
                            callback.physics.enable(bullets[i],spriteArray[j] );
                            bullets[i].visible=true;
                            var bullet = bullets[i];
                            if(counterArray[j]==0){
                                bullet.reset(towers[i].x, towers[i].y);
                                counterArray[j] =1;
                            }
                            callback.physics.arcade.moveToObject(bullet, spriteArray[j], speeed);
                            var col = callback.physics.arcade.collide(bullet,spriteArray[j]);

                            if(col==true){
                                //Enemies werden nicht mehr so weit abgedrängt bei einer Collision
                                spriteArray[j].body.bounce.set(-1.25);
                                counterArray[j]=0;
                                spriteArray[j].life=spriteArray[j].life-1;
                                bullet.reset(towers[i].x, towers[i].y);
                                bullet.visible=false;
                                healthBars[j].scale.x=0.033*(spriteArray[j].life/lifeVar);
                                if(spriteArray[j].life<=0){
                                    spriteArray[j].visible=false;
                                    spriteArray[j].destroy();
                                    spriteArray[j]=null;
                                    coins = coins + 10;
                                    coinText.destroy();
                                    coinText = callback.add.text(100,20,coins);
                                    score = score + 100;
                                    scoreText.destroy();
                                    scoreText = callback.add.text(730,20,"Score: " +score);
                                    xpBar.scale.x=xpBar.scale.x+0.01;
                                    if(xpBar.scale.x>0.34){
                                        xpBar.scale.set(0.2);
                                        xpBar.scale.x=0.0;
                                    }
                                    array[j]=5;
                                    bullet.reset(towers[i].x, towers[i].y);
                                    bullet.visible=false;
                                    healthBars[j].destroy();
                                }
                            }
                        }
                    }
                }
            }
        }
    },

    //PopUp-Fenster
    popUp : function(callback){
        callback.state.pause();
        popup = callback.add.sprite(callback.world.centerX, callback.world.centerY, 'background');
        popup.alpha = 0.8;
        popup.anchor.set(0.5);
        popup.inputEnabled = true;
        backButton= callback.add.button(callback.world.centerX-40 ,callback.world.centerY+150,'buttonBack',this.closeWindow,this);
        quitButton = callback.add.button(callback.world.centerX-80, callback.world.centerY+20, 'buttonPlay', this.quit,callback);

    },

    closeWindow: function(){
        quitButton.destroy();
        backButton.destroy();
        popup.destroy();

    },

    quit : function(){
        bool=false;
        enemyWaveNr=0;
        for(var k=0;k<towerC;k++){
            towers[k] = 0;
        }
        this.state.clearCurrentState();
        this.state.start("MainMenu");

    },

    //InfoTower1
    infoTower1: function(){
        if(popupinfoTower1!=null) {
            popupinfoTower1.destroy();
        }
        popupinfoTower1 = this.add.sprite(button1.x+40, button1.y-30, 'towerInfo1');
        popupinfoTower1.alpha = 0.8;
        popupinfoTower1.anchor.set(0.5);
    },
    infoTower1Delete: function(){
        popupinfoTower1.destroy();
    },

    //InfoTower2
    infoTower2: function(){
        if(popupinfoTower2!=null) {
            popupinfoTower2.destroy();
        }
        popupinfoTower2 = this.add.sprite(button2.x+40, button2.y-30, 'towerInfo2');
        popupinfoTower2.alpha = 0.8;
        popupinfoTower2.anchor.set(0.5);
    },
    infoTower2Delete: function(){
        popupinfoTower2.destroy();
    },

    //Tower1 upgraden
    upgradeTower1: function(c){
        if(marker==null) {
            //Schon 2 Upgrades?
            if(c.speeed!=400) {
                //1.Update
                if (c.isUpgraded == false) {
                    if ((score > 1000) && (coins >= 100)) {
                        c.speeed = 300;
                        c.reach = 200;
                        c.isUpgraded = true;
                        coins = coins - 100;
                        coinText.destroy();
                        coinText = this.add.text(100, 20, coins);
                    }
                }
                else if (c.isUpgraded == true) {
                    if ((score > 2000) && (coins >= 200)) {
                        c.speeed = 450;
                        c.reach = 350;
                        coins = coins - 200;
                        coinText.destroy();
                        coinText = this.add.text(100, 20, coins);
                    }
                }
            }
        }
    },
    //Tower1 Upgrade-Infos
    upgradeTower1Info : function(c){

        if(c.speeed!=450) {
            if (popupinfoTower1U != null) {
                popupinfoTower1U.destroy();
            }

            if (c.isUpgraded == false) {
                popupinfoTower1U = this.add.sprite(c.x + 40, c.y - 40, 'tower1Upgrade1');
            }
            else {
                popupinfoTower1U = this.add.sprite(c.x + 40, c.y - 40, 'tower1Upgrade2');
            }
            popupinfoTower1U.scale.x = 0.7;
            popupinfoTower1U.scale.y = 0.7;
            popupinfoTower1U.alpha = 0.8;
            popupinfoTower1U.anchor.set(0.2);
        }
        else{
            if (popupinfoTower1U != null) {
                popupinfoTower1U.destroy();
            }
        }
    },
    upgradeTower1InfoDelete: function(){
        popupinfoTower1U.destroy();
    },

    //Tower2 upgraden
    upgradeTower2: function(c){
        if(marker==null) {
            //Schon 2 Upgrades?
            if(c.speeed!=800) {
                //1.Update
                if (c.isUpgraded == false) {
                    if ((score > 3000) && (coins >= 300)) {
                        c.speeed = 650;
                        c.reach = 300;
                        c.isUpgraded = true;
                        coins = coins - 100;
                        coinText.destroy();
                        coinText = this.add.text(100, 20, coins);
                    }
                }
                else if (c.isUpgraded == true) {
                    if ((score > 4000) && (coins >= 400)) {
                        c.speeed = 800;
                        c.reach = 450;
                        coins = coins - 200;
                        coinText.destroy();
                        coinText = this.add.text(100, 20, coins);
                    }
                }
            }
        }
    },
    //Tower2 Upgrade Infos
    upgradeTower2Info : function(c){
        if(c.speeed!=800) {
            if (popupinfoTower2U != null) {
                popupinfoTower2U.destroy();
            }

            if (c.isUpgraded == false) {
                popupinfoTower2U = this.add.sprite(c.x + 40, c.y - 40, 'tower2Upgrade1');
            }
            else {
                popupinfoTower2U = this.add.sprite(c.x + 40, c.y - 40, 'tower2Upgrade2');
            }
            popupinfoTower2U.scale.x = 0.7;
            popupinfoTower2U.scale.y = 0.7;
            popupinfoTower2U.alpha = 0.8;
            popupinfoTower2U.anchor.set(0.2);
        }
        else{
            if (popupinfoTower2U != null) {
                popupinfoTower2U.destroy();
            }
        }
    },
    upgradeTower2InfoDelete: function(){
        popupinfoTower2U.destroy();
    },



}