/**
 * Created by Felix on 13.05.15.
 */


Menu.Level1 = function(game){

}

var map;
var layer;
Menu.Level1.prototype = {


    preload: function(){



         this.load.tilemap('map', 'assets/tilemaps/csv/newMap.csv', null, Phaser.Tilemap.CSV);
         this.load.image('tiles', 'assets/tilemaps/tiles/grass-tiles-2-small.png');


         },



    create: function () {



         map = this.add.tilemap('map', 64, 64);
         map.addTilesetImage('tiles');
         //  Create our layer
         layer = map.createLayer(0);

         //  Resize the world
         layer.resizeWorld();








    },

    update: function () {

        //TODO


        //  Honestly, just about anything could go here. It's YOUR game after all. Eat your heart out!

    },

    addTower: function () {





    }




}