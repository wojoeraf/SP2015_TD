/**
 * Created by Felix on 09.06.2015.
 */
var Helpers = {};

Helpers.Menu = function () {
//CHAIN-TOWER Hilfsvariablen
    this.b=false;
    this.xx=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

}

Helpers.Menu.prototype = {

    wave1: function(xPoint,yPoint,callback){
        //EnemiesGesamt = 6 Stück
        enemyNumber=6;
        new Wave1(xPoint,yPoint,callback);
        bool = true;

    },
    wave2: function(xPoint,yPoint,callback){
        //EnemiesGesamt = 10 Stück
        enemyNumber=10;
        new Wave2(xPoint,yPoint,callback);
        bool = true;

    },
    wave3: function(xPoint,yPoint,callback){
        //EnemiesGesamt = 14 Stück
        enemyNumber=10;
        new Wave3(xPoint,yPoint,callback);
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
                if(diamondAction==true){
                    diamondAction=false;
                }
                bool= false;
                enemyWaveNr=enemyWaveNr+1;
            }
        }
        else{
            if(this.b==true){
                for (var yy = 0; yy <this.xx.length; yy++) {
                    if(this.xx[yy]!=0) {
                        this.xx[yy].destroy();
                    }
                    this.b=false;
                }
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
                                        var tower = new Tower1(marker.x,marker.y,callback);
                                        towers[towerC] = tower.tower;
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
                                        var tower = new Tower2(marker.x,marker.y,callback);
                                        towers[towerC] = tower.tower;
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
                                else if(towerButton==2){
                                    if((coins-70)>=0){
                                        var tower = new Tower3(marker.x,marker.y,callback);
                                        towers[towerC] = tower.tower;
                                        coins = coins - 70;
                                        coinText.destroy();
                                        coinText = callback.add.text(100, 20, coins);
                                        bullets[towerC] = callback.add.sprite(marker.x, marker.y, 'bullet3');
                                        bullets[towerC].visible = false;
                                        callback.physics.enable(towers[towerC], Phaser.Physics.ARCADE);
                                        callback.physics.enable(bullets[towerC], Phaser.Physics.ARCADE);
                                        towerC++;
                                        marker.destroy();
                                        marker = null;

                                    }
                                }
                                else if (towerButton==3){
                                    if((coins-30)>=0){
                                        var tower = new Tower4(marker.x,marker.y,callback);
                                        towers[towerC] = tower.tower;
                                        coins = coins - 30;
                                        coinText.destroy();
                                        coinText = callback.add.text(100, 20, coins);
                                        bullets[towerC] = callback.add.sprite(marker.x, marker.y, 'bullet4');
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
    addTower3: function (callback) {
        if(marker!=null){
            marker.destroy();
            marker=null;
        }
        else{
            towerButton=2;
            marker = callback.add.graphics();
            marker.lineStyle(2, 0x000000, 1);
            marker.drawRect(0, 0, 32, 32);
            marker.x = callback.input.mousePointer.x;
            marker.y = callback.input.mousePointer.y;
        }
    },
    addTower4: function (callback) {
        if(marker!=null){
            marker.destroy();
            marker=null;
        }
        else{
            towerButton=3;
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
                        var lifeVar = spriteArray[j].beginLife;
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
                                //TOWER3 = CHAIN
                                if(towers[i].typ==2) {
                                    spriteArray[j].body.bounce.set(-1.25);
                                    counterArray[j] = 0;
                                    if(diamondAction==false) {
                                        spriteArray[j].life = spriteArray[j].life - 0.33;
                                    }
                                    else{
                                        spriteArray[j].life = spriteArray[j].life - 0.7;
                                    }
                                    bullet.reset(towers[i].x, towers[i].y);
                                    bullet.visible = false;
                                    healthBars[j].scale.x = 0.033 * (spriteArray[j].life / lifeVar);
                                    if (spriteArray[j].life <= 0) {
                                        spriteArray[j].visible = false;
                                        spriteArray[j].destroy();
                                        spriteArray[j] = null;
                                        coins = coins + 10;
                                        coinText.destroy();
                                        coinText = callback.add.text(100, 20, coins);
                                        score = score + 100;
                                        scoreText.destroy();
                                        scoreText = callback.add.text(730, 20, "Score: " + score);
                                        xpBar.scale.x = xpBar.scale.x + 0.01;
                                        if (xpBar.scale.x > 0.34) {
                                            xpBar.scale.set(0.2);
                                            xpBar.scale.x = 0.0;
                                        }
                                        array[j] = 5;
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
                                                    if(spriteArray[y].life<=0){
                                                        spriteArray[y].destroy();
                                                        spriteArray[y]=null;
                                                        array[y]=5;
                                                        coins = coins + 10;
                                                        coinText.destroy();
                                                        coinText = callback.add.text(100, 20, coins);
                                                        score = score + 100;
                                                        scoreText.destroy();
                                                        scoreText = callback.add.text(730, 20, "Score: " + score);
                                                    }
                                                }
                                            }
                                        }
                                        this.b = true;
                                    }

                                }
                                //TOWER4 = SLOW
                                else if (towers[i].typ==3){
                                    //Enemies werden nicht mehr so weit abgedrängt bei einer Collision
                                    spriteArray[j].body.bounce.set(-1.25);
                                    counterArray[j]=0;
                                    if(diamondAction==false) {
                                        spriteArray[j].speed = spriteArray[j].speed - 7.5;
                                    }
                                    else{
                                        spriteArray[j].speed = spriteArray[j].speed - 15;
                                    }
                                    bullet.reset(towers[i].x, towers[i].y);
                                    bullet.visible=false;
                                    healthBars[j].scale.x=0.033*(spriteArray[j].life/lifeVar);
                                    if(spriteArray[j].speed<=0){
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
                                    if(spriteArray[j]!=null) {
                                        if (spriteArray[j].life <= 0) {
                                            spriteArray[j].visible = false;
                                            spriteArray[j].destroy();
                                            spriteArray[j] = null;
                                            coins = coins + 10;
                                            coinText.destroy();
                                            coinText = callback.add.text(100, 20, coins);
                                            score = score + 100;
                                            scoreText.destroy();
                                            scoreText = callback.add.text(730, 20, "Score: " + score);
                                            xpBar.scale.x = xpBar.scale.x + 0.01;
                                            if (xpBar.scale.x > 0.34) {
                                                xpBar.scale.set(0.2);
                                                xpBar.scale.x = 0.0;
                                            }
                                            array[j] = 5;
                                            bullet.reset(towers[i].x, towers[i].y);
                                            bullet.visible = false;
                                            healthBars[j].destroy();
                                        }
                                    }
                                }
                                //TOWER 1 und 2 = NORMAL
                                else{
                                    //Enemies werden nicht mehr so weit abgedrängt bei einer Collision
                                    spriteArray[j].body.bounce.set(-1.25);
                                    counterArray[j]=0;
                                    if(diamondAction==false) {
                                        spriteArray[j].life = spriteArray[j].life - 1;
                                    }
                                    else{
                                        spriteArray[j].life = spriteArray[j].life - 2;
                                    }
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
        popupinfoTower1.scale.x=0.8;
        popupinfoTower1.scale.y=0.8;
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
        popupinfoTower2.scale.x=0.8;
        popupinfoTower2.scale.y=0.8;
        popupinfoTower2.alpha = 0.8;
        popupinfoTower2.anchor.set(0.5);
    },
    infoTower2Delete: function(){
        popupinfoTower2.destroy();
    },

    //InfoTower3
    infoTower3: function(){
        if(popupinfoTower3!=null) {
            popupinfoTower3.destroy();
        }
        popupinfoTower3 = this.add.sprite(button3.x+40, button3.y-30, 'towerInfo3');
        popupinfoTower3.scale.x=0.8;
        popupinfoTower3.scale.y=0.8;
        popupinfoTower3.alpha = 0.8;
        popupinfoTower3.anchor.set(0.5);
    },
    infoTower3Delete: function(){
        popupinfoTower3.destroy();
    },
    //InfoTower4
    infoTower4: function(){
        if(popupinfoTower4!=null) {
            popupinfoTower4.destroy();
        }
        popupinfoTower4 = this.add.sprite(button4.x+40, button4.y-30, 'towerInfo4');
        popupinfoTower4.scale.x=0.8;
        popupinfoTower4.scale.y=0.8;
        popupinfoTower4.alpha = 0.8;
        popupinfoTower4.anchor.set(0.5);
    },
    infoTower4Delete: function(){
        popupinfoTower4.destroy();
    },
    diamondClicked : function(callback){
        if(diamonds>=1){
            diamonds=diamonds-1;
            diamondAction=true;
            diamondText.destroy();
            diamondText = callback.add.text(200,20,diamonds);
        }
    }


}