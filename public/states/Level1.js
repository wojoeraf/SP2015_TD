/**
 * Created by Felix on 13.05.15.
 */


Game.Level1 = function(){
    this.handler    = new Game.Handling(this);
    this.map        = null;
    this.metaLayer  = null;
    this.startPoint = null;
    this.waypoints  = null;
    this.timer      = null;
    this.debug      = 0;
    this.waveHandler = null;

    this.waves = [
        new Wave(this, 50, {1: 2}),
        new Wave(this, 75, {1: 7, 0: 3}),
        new Wave(this, 125, {1: 10, 0: 5}),
        new Wave(this, 180, {1: 15, 0: 10}),
        new Wave(this, 250, {1: 20}),
        new Wave(this, 350, {1: 50})
    ];

}

Game.Level1.prototype = {

    render: function() {
        if (this.waveHandler.mobPool.length > 0) {
            //this.game.debug.body(this.waveHandler.mobPool[0].sprite, '#aa0000', true);
            //this.game.debug.box2dBody(this.waveHandler.mobPool[0].sprite);
            //this.game.debug.pointer(this.input.activePointer);
        }
        //this.game.debug.spriteInfo(this.mobs[0].sprite, 32, 32);
        this.game.debug.text(this.time.fps || '--', 2, 14, "#ffffff");
    },

    //Level specific initialisations
    init: function() {
        //this.handler.init();
        this.handler.coins = 100; //Beginning coins
        this.handler.lifes = 20; //Beginning lifes
        this.handler.interestRate = 0.15;
        this.handler.maxWaves = this.waves.length;
        this.waveHandler = new WaveHandler(this, this.waves);
    },


    //Load level 1 data
    preload: function(){
        this.time.advancedTiming = true;
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
        this.add.button(850, 630, 'nextWave', this.handler.nextWave, this.handler);
        button1 = this.add.button(50,630,'tower1', this.buildTower, this);
        //button1.events.onInputOver.add(this.helpers.infoTower1,this);
        //button1.events.onInputOut.add(this.helpers.infoTower1Delete,this);

        //button2 = this.add.button(200,630,'tower2Text',this.addTower2,this);
        //button2.events.onInputOver.add(this.helpers.infoTower2,this);
        //button2.events.onInputOut.add(this.helpers.infoTower2Delete,this);


        //button5 = this.add.button(650,630,'Premium',this.diamondClicked,this);
        //button5.events.onInputOver.add(this.helpers.diamondInfo,this);
        //button5.events.onInputOut.add(this.helpers.diamondInfoDelete,this);
        //Popup-Button
        this.add.button(850,100,'menuB',this.popUp,this);

        //this.timer.loop(1000, function() {console.log(this.map.getTileWorldXY(this.input.mousePointer.x, this.input.mousePointer.y, 16, 16, 'Meta'));}, this);

    },

    update: function () {
        // Handle all from the gamehandler
        this.handler.handle(this);

        //this.helpers.createHealthbars();

        this.handler.helperIngame.buildTower(this);

        //cycle the waves
        this.waveHandler.cycle();

    },


    //Archer Tower build request
    buildTower: function() {
        this.handler.buildTowerID = 0;  //The ID of the archer Tower (look in the Tower.towerList)
        this.handler.buildTower(0);     //Start the building process
    },


    //Popup-Menü öffen und je nach Button verlinken
    popUp : function(){
        this.helpers.popUp(this);
    },


    diamondClicked:function(){
        this.helpers.diamondClicked(this);
    },


    shutDown: function() {
        this.map        = null;
        this.metaLayer  = null;
        this.waypoints  = null;
        this.timer      = null;
    }

}
