/**
 * Created by Felix on 13.05.15.
 */


Menu.Level1 = function(game){
    this.score=0;



}

var map;
var layer;
var pathfinder;
var cursors;
var sprite;
var marker;
var blocked = false;

Menu.Level1.prototype = {


    preload: function(){



         this.load.tilemap('map', 'assets/tilemaps/csv/newMap.csv', null, Phaser.Tilemap.CSV);
         this.load.image('tiles', 'assets/tilemaps/tiles/grass-tiles-2-small.png');
         this.load.spritesheet('player', 'assets/sprites/spaceman.png', 16, 16);
         },



    create: function (game) {


        this.physics.startSystem(Phaser.Physics.ARCADE);

        //Load Map
         map = this.add.tilemap('map', 64, 64);
         map.addTilesetImage('tiles');
        // SetCollision-Tiles
         map.setCollision(0);
         //  Create our layer
         layer = map.createLayer(0);
         //  Resize the world
         layer.resizeWorld();

        //Define walkable Tilesets
        var walkables = [3];



        //Pathfinder -> ADD
        pathfinder = game.plugins.add(Phaser.Plugin.PathFinderPlugin);
        pathfinder.setGrid(map.layers[0].data, walkables);


        //Add Enemy
        sprite = this.add.sprite(900, 190, 'player', 1);
        sprite.animations.add('left', [8,9], 10, true);
        sprite.animations.add('right', [1,2], 10, true);
        sprite.animations.add('up', [11,12,13], 10, true);
        sprite.animations.add('down', [4,5,6], 10, true);
        //sprite.body.setSize(10, 14, 2, 1);
        this.physics.enable(sprite, Phaser.Physics.ARCADE);

        cursors = this.input.keyboard.createCursorKeys();

        marker = this.add.graphics();
        marker.lineStyle(2, 0x000000, 1);
        marker.drawRect(0, 0, 32, 32);

        this.findPathTo(0,5);


    },

    update: function () {


        this.physics.arcade.collide(sprite, layer);

        sprite.body.velocity.x = 0;
        sprite.body.velocity.y = 0;
        sprite.body.angularVelocity = 0;

        if (cursors.left.isDown)
        {
            sprite.body.velocity.x = -200;
        }
        else if (cursors.right.isDown)
        {
            sprite.body.velocity.x = 200;
        }

        else if (cursors.up.isDown)
        {
            sprite.body.velocity.y=-200;
        }
        else if(cursors.down.isDown){
            sprite.body.velocity.y=200;
        }


        marker.x = layer.getTileX(this.input.activePointer.worldX) * 32;
        marker.y = layer.getTileY(this.input.activePointer.worldY) * 32;


        if (this.input.mousePointer.isDown)
        {
            blocked = true;
            this.findPathTo(layer.getTileX(marker.x), layer.getTileY(marker.y));
        }


    },


    addTower: function (x,y) {


    },

 findPathTo: function(tilex, tiley) {

    pathfinder.setCallbackFunction(function(path) {
        path = path || [];
        for(var i = 0, ilen = path.length; i < ilen; i++) {
            map.putTile(46, path[i].x, path[i].y);
        }
        blocked = false;
    });

    pathfinder.preparePathCalculation([0,0], [tilex,tiley]);
    pathfinder.calculatePath();

 }





}