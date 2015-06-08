/**
 * Created by Felix on 13.05.15.
 */


Menu.Level1 = function(game){

}
//Map und Ebene
var map;
var layer;

//marker=Turmauswahlrechteck
var marker=null;

//Weg-Punkte
var myPoint1 = new Phaser.Point(600,190);
var myPoint2 = new Phaser.Point(600,400);
var myPoint3 = new Phaser.Point(300,400);
var myPoint4 = new Phaser.Point(300,150);
var myPoint5 = new Phaser.Point(0,150);

//NextWave-Button gedrückt?
var bool = false;

//Obere Leiste (Score,XP etc..)
var score = 1;
var scoreText;
var xpBar;
var life = 5;
var heart;
var heartText;
var diamond;
var diamonds=10;
var diamondText;
var coin;
var coins = 70;
var coinText;

//Tower und zugehörige Waffen speichern
var bullets = [0,0,0,0,0,0,0,0,0];
var towers=[0,0,0,0,0,0,0,0,0,0];
//Tower-Counter
var towerC=0;

//Welcher TowerButton wurde gedrückt -> unterschiedliche Tower
var towerButton=-1;

//Hilfsarrays für nextWave und checkCol
var array = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var counterArray= [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var sprites = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var healthBars = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var enemyWaveNr=0;
var enemyNumber;

//PopUp-Menü
var popup;
var backButton;
var quitButton;

var button1;
var popupinfoTower1;
var button2;
var popupinfoTower2;

var lifeVar=0;

Menu.Level1.prototype = {

    //Alle Dateien des 1. Levels laden
    preload: function(){

        //Map
        this.load.tilemap('map', 'assets/tilemaps/csv/newMap.csv', null, Phaser.Tilemap.CSV);
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
        button1.events.onInputOver.add(this.infoTower1,this);
        button1.events.onInputOut.add(this.infoTower1Delete,this);

        button2 = this.add.button(200,630,'tower2Text',this.addTower2,this);
        button2.events.onInputOver.add(this.infoTower2,this);
        button2.events.onInputOut.add(this.infoTower2Delete,this);

        //Popup-Button
        this.add.button(850,100,'buttonPlay',this.popUp,this);

        //NextWave-Sperre, nur wenn auf true geändert-> nächste Enemy-Welle
        bool = false;

    },


    update: function () {


        if(bool==true){
        for(var j=0;j<enemyNumber;j++) {
            var healthbar = healthBars[j];
            var sprite = sprites[j];
            //console.log(sprite.x);
            //console.log(sprite.y);
            if(sprite!=null) {
                healthbar.x = sprite.x;
                healthbar.y = sprite.y - 10;
            }
        }
        }
        //Wenn Next-Wave gedrückt wurde -> Enemies laufen den Weg entlang
        if(bool==true){
                var x=false;
                for(var i=0;i<enemyNumber;i++){
                    if(array[i]!=5){
                        this.nextWave(sprites[i],i);
                        x = true;
                    }
                }
                this.checkColl(sprites,counterArray);
                //Wenn x==false -> Alle Sprites sind entweder durchgelaufen oder tot -> enemyWaveNr++
                if(x==false){
                    bool= false;
                    enemyWaveNr=enemyWaveNr+1;
                    //coins = coins +15;
                    //coinText.destroy();
                    //coinText= this.add.text(100,20,coins);
                }
        }
        //Marker -> Rechteck -> Turm platzieren
         if(marker!=null){
            marker.x = this.input.mousePointer.x;
            marker.y = this.input.mousePointer.y;
            try{
                //Nur auf grünen Flächen dürfen Türme gebaut werden!
            if(((map.getTile(Math.round(marker.x/64),Math.round(marker.y/64)).index)==3)||
                ((map.getTile(Math.round((marker.x-32)/64),Math.round(marker.y/64)).index)==3)||
                ((map.getTile(Math.round(marker.x/64),Math.round((marker.y-32)/64)).index)==3))
                {
                    marker.lineStyle(2, 0xff0000, 1);
                    marker.drawRect(0, 0, 32, 32);
                    //Mitte -> Towerauswahl rückgängig
                    if(this.input.mouse.button==1){
                        marker.destroy();
                        marker = null;
                    }
            }
            //Keine Towers in der oberen Leiste und in der Towerauswahlleiste!
            else if((marker.y<50)||(marker.y>600)){
                    marker.lineStyle(2, 0xff0000, 1);
                    marker.drawRect(0, 0, 32, 32);
                    //Mitte -> Towerauswahl rückgängig
                    if (this.input.mouse.button == 1) {
                        marker.destroy();
                        marker = null;
                    }
            }
            else{
                marker.lineStyle(2, 0x000000, 1);
                marker.drawRect(0, 0, 32, 32);
                var c =  this.physics.arcade.collide(marker.x,marker.y, 'tower1');
                if (this.input.mousePointer.isDown==true) {

                    //Welcher Button 0=Links,1=Mitte
                    //Links -> Tower platzieren
                    if (this.input.mouse.button == 0) {

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
                                    towers[towerC] = this.add.sprite(marker.x, marker.y, 'tower');
                                    towers[towerC].x=marker.x;
                                    towers[towerC].y=marker.y;
                                    towers[towerC].typ = 0;
                                    towers[towerC].cost = 30;
                                    coins = coins - 30;
                                    coinText.destroy();
                                    coinText = this.add.text(100, 20, coins);
                                    bullets[towerC] = this.add.sprite(marker.x, marker.y, 'bullet');
                                    bullets[towerC].visible = false;
                                    this.physics.enable(towers[towerC], Phaser.Physics.ARCADE);
                                    this.physics.enable(bullets[towerC], Phaser.Physics.ARCADE);
                                    towerC++;
                                    marker.destroy();
                                    marker = null;
                                }
                            }
                            //Tower 2
                            else if (towerButton == 1) {
                                if ((coins - 70) >= 0) {
                                    towers[towerC] = this.add.sprite(marker.x, marker.y, 'tower2');
                                    towers[towerC].x=marker.x;
                                    towers[towerC].y=marker.y;
                                    towers[towerC].typ = 1;
                                    towers[towerC].cost = 70;
                                    coins = coins - 70;
                                    coinText.destroy();
                                    coinText = this.add.text(100, 20, coins);
                                    bullets[towerC] = this.add.sprite(marker.x, marker.y, 'bullet2');
                                    bullets[towerC].visible = false;
                                    this.physics.enable(towers[towerC], Phaser.Physics.ARCADE);
                                    this.physics.enable(bullets[towerC], Phaser.Physics.ARCADE);
                                    towerC++;
                                    marker.destroy();
                                    marker = null;
                                }
                            }
                        }
                    }
                    //Mitte -> Towerauswahl rückgängig
                    else if(this.input.mouse.button==1){
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
    //TowerTyp 1 hinzufügen
    addTower: function () {
        if(marker!=null){
            marker.destroy();
            marker=null;
        }
        else{
        towerButton=0;
        marker = this.add.graphics();
        marker.lineStyle(2, 0x000000, 1);
        marker.drawRect(0, 0, 32, 32);
        marker.x = this.input.mousePointer.x;
        marker.y = this.input.mousePointer.y;
        }
    },
    //TowerTyp 2 hinzufügen
    addTower2: function () {
        if(marker!=null){
            marker.destroy();
            marker=null;
        }
        else{
            towerButton=1;
            marker = this.add.graphics();
            marker.lineStyle(2, 0x000000, 1);
            marker.drawRect(0, 0, 32, 32);
            marker.x = this.input.mousePointer.x;
            marker.y = this.input.mousePointer.y;
        }
    },

    //Nächste Enemy-Welle starten
    nextWave : function(player,arraynumber){
        if(marker!=null){
            marker.destroy();
            marker=null;
        }
        this.physics.arcade.collide(player, layer);
        var a = array[arraynumber];
        if(player.x<990){
            player.visible=true;
       }

        switch(a){
            case 0:
                this.physics.arcade.moveToObject(player,myPoint1,player.speed,0);
                player.animations.play('left');
                if(player.x<myPoint1.x+2){
                    array[arraynumber] = 1;
                    break;
                }
                break;

            case 1:
                player.body.velocity.x = 0;
                player.body.velocity.y = 0;
                this.physics.arcade.moveToObject(player,myPoint2,player.speed,0);
                player.animations.play('down');
                if(player.y>myPoint2.y-2){
                    array[arraynumber] = 2;
                    break;
                }
                break;
            case 2:
                player.body.velocity.x = 0;
                player.body.velocity.y = 0;
                this.physics.arcade.moveToObject(player,myPoint3,player.speed,0);
                player.animations.play('left');
                if(player.x<myPoint3.x+2){
                    array[arraynumber]=3;
                    break;
                }
                break;
            case 3:
                player.body.velocity.x = 0;
                player.body.velocity.y = 0;
                this.physics.arcade.moveToObject(player,myPoint4,player.speed,0);
                player.animations.play('up');
                if(player.y<myPoint4.y+2){
                    array[arraynumber]=4;
                    break;
                }
                break;
            case 4:
                player.body.velocity.x = 0;
                player.body.velocity.y = 0;
                this.physics.arcade.moveToObject(player,myPoint5,player.speed,0);
                player.animations.play('left');
                if(player.x<myPoint5.x+0.5){
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
    },

    //Je nach Welle -> Sprites hinzufügen (Aufruf von buildWave(EnemyTyp,Anzahl,Speed,Lifes)
    boolF : function(){

        if(enemyWaveNr==0){
            this.buildWave(1,3,60,5);
        }
        //2.Welle
        else if(enemyWaveNr==1){
            this.buildWave(1,5,70,5);
        }
        //3.Welle
        else if (enemyWaveNr==2){
           this.buildWave(1,8,80,7);
        }
        else if(enemyWaveNr==3){
            this.buildWave(1,11,80,8);
        }
        else if(enemyWaveNr==4){
            this.buildWave(1,11,110,10);
        }
        else if(enemyWaveNr==5){
            this.buildWave(1,8,100,20);
        }
        else if(enemyWaveNr==6){
            this.buildWave(1,100,80,10);
        }
    },

    //Collision zwischen Sprite und Bullets der Tower überprüfen
    checkColl : function(spriteArray,counterArray){
        if(bool==true){
            for(var l=0;l<towerC;l++){
                for(var k=0;k<spriteArray.length;k++){
                    var i = towerC-l-1;
                    var j = spriteArray.length-k-1;
                if(array[j]!=5){
                    var speeed;
                    var reach;
                    if(towers[i].typ==0){
                        speeed=200;
                        reach=100;
                    }
                    else if(towers[i].typ=1){
                        speeed=600;
                        reach=250;
                    }
                    if(this.physics.arcade.distanceBetween(towers[i], spriteArray[j]) < reach){
                        this.physics.enable(bullets[i], Phaser.Physics.ARCADE);
                        this.physics.enable(bullets[i],spriteArray[j] );
                        bullets[i].visible=true;
                        var bullet = bullets[i];
                        if(counterArray[j]==0){
                            bullet.reset(towers[i].x, towers[i].y);
                            counterArray[j] =1;
                        }
                        this.physics.arcade.moveToObject(bullet, spriteArray[j], speeed);
                        var col = this.physics.arcade.collide(bullet,spriteArray[j]);

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
                                coinText = this.add.text(100,20,coins);
                                score = score + 100;
                                scoreText.destroy();
                                scoreText = this.add.text(730,20,"Score: " +score);
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
    //Popup-Menü öffen und je nach Button verlinken
    popUp : function(){

        this.state.pause();
        popup = this.add.sprite(this.world.centerX, this.world.centerY, 'background');
        popup.alpha = 0.8;
        popup.anchor.set(0.5);
        popup.inputEnabled = true;
        backButton= this.add.button(this.world.centerX-40 ,this.world.centerY+150,'buttonBack',this.closeWindow,this);
        quitButton = this.add.button(this.world.centerX-80, this.world.centerY+20, 'buttonPlay', this.quit,this);

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

    //Enemy-Welle erzeugen
    buildWave: function(spriteType,number,speed,lfs){
        lifeVar=lfs;
        enemyNumber=number;
        for(var i=0;i<number;i++){
            //Enemy-Typ 1
            if(spriteType==1) {
                var positionX=(1000+25*i);
                sprites[i] = this.add.sprite(positionX, 190, 'player', 1);
                healthBars[i] =this.add.sprite(positionX,180,'xpBar2',1);
                sprites[i].animations.add('left', [8, 9], 10, true);
                sprites[i].animations.add('right', [1, 2], 10, true);
                sprites[i].animations.add('up', [11, 12, 13], 10, true);
                sprites[i].animations.add('down', [4, 5, 6], 10, true);
                sprites[i].speed = speed;
                sprites[i].visible = false;
                sprites[i].life = lfs;
                healthBars[i].scale.set(0.05);
                healthBars[i].scale.x=0.033;
                this.physics.enable(sprites[i], Phaser.Physics.ARCADE);
                array[i]=0;
            }
            //Enemy-Typ 2
            else if (spriteType==2){

            }
        }
        bool = true;
    }

}
