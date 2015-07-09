/**
 * Tower namespace
 * @namespace Tower
 */

var Tower = {
    maxLevel: 3,
    towerList: {}
};


/**
 * The Tower.Model class provides a "prototype" (parent) of all towers. Instances of this class
 * are concrete tower descriptions. The towers in game get their attributes from their
 * corresponding instance.
 * Each tower can be upgraded Tower.maxLevel times.
 * @class
 */

Tower.Model = function () {
    this.id = null;         //Number
    this.name = null;       //String
    this.spriteKey = null;  //String
    this.width = null;         //Number
    this.height = null;         //Number
    this.cost = null;         //Array[Number] (for each level)
    this.speed = null;         //Array[Number] (for each level)
    this.range = null;         //Array[Number] (for each level)
    this.damage = null;         //Array[Number] (for each level)
    this.isAoe = null;         //Boolean
    this.isChain = null;         //Boolean
};

Tower.Model.prototype = {



};

Tower.Builded = function(x, y, id, game) {
    this.towerID = id;
    this.game = game;
    this.tower = Tower.towerList[this.towerID];          //Holds a Tower.Model instance (Archer etc.)
    this.time = Date.now();                             //Timestamp of creation time
    this.sprite = null;                               //Holding the sprite of the tower in the game
    this.bullets = null;
    this.x = x;
    this.y = y;
    this.sold = false;           //Is tower sold?
    this.level = 0;          //Zero based counting
};

Tower.Builded.prototype = {

    init: function() {
        this.sprite = this.game.add.sprite(this.x, this.y, this.tower.spriteKey);
    },

    destroy: function() {
        this.sprite.destroy();
        this.sold = true;
    }

};

var Archer = new Tower.Model();
Archer.id = 0;
Archer.name = 'Archer Tower';
Archer.spriteKey = 'towerTest';
Archer.width = 64;
Archer.height = 64;
Archer.cost = [100, 135, 180];
Archer.speed = [100, 200, 300];
Archer.range = [100, 175, 250];
Archer.damage = [2, 4, 7];
Archer.isAoe = false;
Archer.isChain = false;

//this.helpers = new Helpers.Menu();
//
//this.tower=game.add.sprite(x, y, 'tower');
//this.tower.inputEnabled = true;
//this.tower.input.useHandCursor = true;
//this.tower.events.onInputDown.add(this.upgradeTower1, game);
//this.tower.x=markerX;
//this.tower.y=markerY;
//this.tower.typ = 0;
//this.tower.cost = 30;
//this.tower.speeed=300;
//this.tower.reach=200;
//this.tower.isUpgraded=false;
//this.tower.isDestroyed=false;
//this.tower.boll=false;

//Tower1.prototype = {
//
//    //Tower1 upgraden
//    upgradeTower1: function(c) {
//        if (marker == null) {
//
//            if ((this.input.mouse.button == 0)) {
//                this.helpers.popUpT(c,this);
//            }
//        }
//    }
//
//};

Tower.towerList = {
        0: Archer
    };