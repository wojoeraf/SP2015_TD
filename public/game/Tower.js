/**
 * Tower namespace
 * @namespace Tower
 */

var Tower = {
    maxLevel: 3,
    towerList: {},
    bulletList: {}
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
    this.animations = null; //Object
    this.width = null;         //Number
    this.height = null;         //Number
    this.cost = null;         //Array[Number] (for each level)
    this.speed = null;         //Array[Number] (for each level)
    this.bulletSpeed = null;    //Number
    this.range = null;         //Array[Number] (for each level)
    this.damage = null;         //Array[Number] (for each level)
    this.isAoe = null;         //Boolean
    this.isChain = null;         //Boolean
};

Tower.Model.prototype = {};

/**
 * The Tower.Builded class represents a tower which is build on the map
 * @class
 */

Tower.Builded = function (x, y, id, game) {
    this.towerID = id;                                  //The ID of the tower type.
    this.game  = game;
    this.tower = Tower.towerList[this.towerID];          //Holds a Tower.Model instance (Archer etc.)
    this.time = Date.now();                             //Timestamp of creation time
    this.sprite = null;                               //Holding the sprite of the tower in the game
    this.bullet   = null;
    this.nextFire = 0;
    this.x        = x;
    this.y        = y;
    this.sold     = false;           //Is tower sold?
    this.level = 0;          //Zero based counting
    this.target       = null;
    this.popup        = null;
    this.rangePreview = null;
};

Tower.Builded.prototype = {

    init: function () {
        this.sprite                 = this.game.add.sprite(this.x, this.y, this.tower.spriteKey);
        this.sprite.inputEnabled    = true;
        this.bullet                 = this.game.add.group();
        this.bullet.enableBody      = true;
        this.bullet.physicsBodyType = Phaser.Physics.ARCADE;
        this.bullet.createMultiple(20, 'bullet');
        this.bullet.setAll('anchor.x', 0.5);
        this.bullet.setAll('anchor.y', 0.5);
        this.bullet.setAll('outOfBoundsKill', true);
        this.bullet.setAll('checkWorldBounds', true);
        //this.sprite.anchor.set(0.5);
    },

    destroy: function () {
        this.sprite.destroy();
        this.sold = true;
    },

    findTarget: function () {
        //console.log(this.game.waveHandler.mobSpritePool.length);
        var first = -1;
        if (this.game.waveHandler.mobPool.length > 0) {
            // Find always the first mob within tower range
            var len = this.game.waveHandler.mobPool.length;
            for (var i = 0; i < len; i++) {
                if (this.game.physics.arcade.distanceBetween(this.sprite, this.game.waveHandler.mobPool[i].sprite) < this.tower.range[this.level]) {
                    first = i;
                    break;
                }
                len = this.game.waveHandler.mobPool.length;
            }
            if (first > -1) {
                //console.log(this.game.physics.arcade.distanceBetween(this.sprite, this.game.waveHandler.mobPool[first].sprite));
                this.target = this.game.waveHandler.mobPool[first].sprite;
            } else {
                this.target = null;
            }
        }
    },

    fire: function () {
        this.findTarget();
        if (this.game.time.now > this.nextFire && this.bullet.countDead() > 0 && this.target !== null) {
            //console.log('fire');
            this.nextFire = this.game.time.now + (10000 / this.tower.speed[this.level]);
            //console.log(this.nextFire);
            var bullet = this.bullet.getFirstExists(false);
            bullet.reset(this.x + (this.tower.width / 2), this.y + (this.tower.height / 2));
            //console.log(this.target);
            this.game.physics.arcade.moveToObject(bullet, this.target, this.tower.bulletSpeed, this.game.activePointer);
        }
        this.target = null;
    },

    collisionCheck: function () {
        var outer     = this;
        var len       = this.game.waveHandler.mobPool.length;
        var collision = false;
        for (var i = 0; i < len; i++) {
            collision = this.game.physics.arcade.overlap(this.bullet, this.game.waveHandler.mobPool[i].sprite, this.killBullet, null, this.game);
            if (collision) {
                this.mobHitted(this.game.waveHandler.mobPool[i], outer);
                //console.log(this.bullet);
                //this.bullet.kill();
            }
        }
    },

    killBullet: function (a, bullet) {
        bullet.kill()
    },

    mobHitted: function (mob) {
        mob.actualHealth -= this.tower.damage[this.level];
        if (mob.actualHealth <= 0) {
            this.game.handler.score += mob.mob.reward * 7;
            this.game.handler.coins += mob.mob.reward;
            this.game.handler.xp += mob.mob.reward;
        }
    },

    inputListener: function () {
        this.sprite.events.onInputDown.add(this.showPopup, this);
        this.sprite.events.onInputOver.add(this.showRange, this);
        this.sprite.events.onInputOut.add(this.hideRange, this);
        if (this.popup !== null && this.popup !== undefined) {
            this.popup.events.onInputOut.add(this.showPopup, this);
        }
    },

    showPopup: function () {
        if (this.popup === null || this.popup === undefined) {
            this.popup = this.game.add.sprite(this.game.input.mousePointer.x, this.game.input.mousePointer.y, 'towerInfo1');
        } else {
            this.popup.kill();
            this.popup = null
        }
    },

    showRange: function () {
        if (this.previewCircle === null || this.previewCircle === undefined) {
            var radius           = this.tower.range[0];
            var circ             = this.game.add.graphics(0, 0);
            circ.lineStyle(3, 0xeeeeee, 0.3);
            circ.drawEllipse(0, 0, radius, radius);
            this.previewCircle   = circ;
            this.previewCircle.x = this.x + this.tower.width / 2;
            this.previewCircle.y = this.y + this.tower.height / 2;
        }
    },

    hideRange: function () {
        if (this.previewCircle !== null && this.previewCircle !== undefined) {
            this.previewCircle.kill();
            this.previewCircle = null;
        }
    }

};


///**
// * The Tower.Bullet class represents bullet types, which every tower need to have exact one.
// * @class
// */
//
//Tower.BulletModel = function() {
//    this.id = null;
//    this.spriteKey = null;
//    this.animations = null;     //Object holding the animations
//    this.scaleX = 1;
//    this.scaleY = 1;
//    this.speed = null;
//};
//
//Tower.Bullet = function (x, y, id, game) {
//    this.bulletID = id;       //The ID of the bullet type
//    this.game = game;
//    this.sprite = null;
//    this.bullet = Tower.bulletList[this.bulletID];
//    this.x = x;              //Origin (tower center)
//    this.y = y;              //Origin (tower center)
//    this.target = null;
//};
//
//Tower.Bullet.prototype = {
//    init: function () {
//        this.sprite = this.game.add.sprite(this.x, this.y, this.tower.spriteKey);
//        this.sprite.anchor.set(0.5);
//        this.sprite.scale.set(this.bullet.scaleX, this.bullet.scaleY);
//        this.sprite.checkWorldBounds = true;
//        this.sprite.outOfBoundsKill = true;
//        //this.sprite.events.onOutOfBounds.add(this.mobCameThrough, this, 10);
//        this.sprite.visible = false;
//        this.sprite.speed = this.bullet.speed;
//        this.game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
//        this.sprite.body.immovable = true;
//        //this.sprite.animations.add('right', this.mob.animations.right, this.mob.animFrameRate, true);
//    },
//
//    fire: function () {
//        if (target === undefined || target === null) {
//            //No target, so cannot fire.
//        } else {
//            this.game.physics.moveTo(this.sprite, this.target.sprite, this.bullet.speed);
//        }
//    }
//};
//
//var Arrow = new Tower.BulletModel();
//Arrow.id = 0;
//Arrow.spriteKey = 'bullet';
//Arrow.speed = 100;
//Arrow.animations = {
//
//};
//
//Tower.bulletList = {
//    0: Arrow
//};


/**
 * Now the tower models follow
 */

var Archer         = new Tower.Model();
Archer.id          = 0;
Archer.name        = 'Archer Tower';
Archer.spriteKey   = 'towerTest';
Archer.width       = 64;
Archer.height      = 64;
Archer.cost        = [100, 135, 180];
Archer.speed       = [20, 20, 30];
Archer.range       = [200, 275, 350];
Archer.bulletSpeed = 800;
Archer.damage      = [10, 4, 7];
Archer.isAoe       = false;
Archer.isChain     = false;
//Archer.bullet = Arrow;

Tower.towerList = {
    0: Archer
};