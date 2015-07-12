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
    this.bulletSprite = null; //String
    this.animations = null; //Object
    this.bulletAnimations = null;  //Object
    this.width = null;         //Number
    this.height = null;         //Number
    this.cost = null;         //Array[Number] (for each level)
    this.speed = null;         //Array[Number] (for each level)
    this.bulletSpeed = null;    //Number
    this.range = null;         //Array[Number] (for each level)
    this.damage = null;         //Array[Number] (for each level)
    this.isAoe = null;         //Boolean
    this.isChain = null;         //Boolean
    this.animFrameRate = 15;
    this.scaleX        = 1;
    this.scaleY        = 1;
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
        this.sprite.scale.set(this.tower.scaleX, this.tower.scaleY);
        this.sprite.inputEnabled    = true;
        this.sprite.animations.add('up', this.tower.animations.up, this.tower.animFrameRate, true);
        this.sprite.animations.add('down', this.tower.animations.down, this.tower.animFrameRate, true);
        this.sprite.animations.add('right', this.tower.animations.right, this.tower.animFrameRate, true);
        this.sprite.animations.add('left', this.tower.animations.left, this.tower.animFrameRate, true);
        this.bullet                 = this.game.add.group();
        this.bullet.enableBody      = true;
        this.bullet.physicsBodyType = Phaser.Physics.ARCADE;
        this.bullet.createMultiple(20, this.tower.bulletSprite);
        //if (this.tower.bulletAnimations !== null) {
        //    console.log(this.bullet);
        //    this.bullet.callAll('animations.add', 'animations', 'right', this.tower.bulletAnimations.right, 20, true);
        //    this.bullet.callAll('animations.add', 'animations', 'up', this.tower.bulletAnimations.up, 20, true);
        //    this.bullet.callAll('animations.add', 'animations', 'left', this.tower.bulletAnimations.left, 20, true);
        //    this.bullet.callAll('animations.add', 'animations', 'down', this.tower.bulletAnimations.down, 20, true);
        //}
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
        var dir = '';
        this.findTarget();
        if (this.game.time.now > this.nextFire && this.bullet.countDead() > 0 && this.target !== null) {
            //console.log('fire');
            this.nextFire = this.game.time.now + (10000 / this.tower.speed[this.level]);
            //console.log(this.nextFire);
            var bullet = this.bullet.getFirstExists(false);
            bullet.reset(this.x + (this.tower.width / 2), this.y + (this.tower.height / 2));
            //console.log(this.target);
            var ang = this.game.physics.arcade.moveToObject(bullet, this.target, this.tower.bulletSpeed, this.game.activePointer);

            //animation direction:
            var angle = ang * 57.2957795 //rad to deg
            if (angle > -45 && angle < 45) {
                dir = 'right';
                if (this.tower.bulletAnimations !== null) bullet.frame = 0;
            }
            if (angle >= -135 && angle <= -45) {
                dir = 'up';
                if (this.tower.bulletAnimations !== null) bullet.frame = 1;
            }
            if ((angle >= -180 && angle < -135) || (angle > 135 && angle <= 180)) {
                dir = 'left';
                if (this.tower.bulletAnimations !== null) bullet.frame = 2;
            }
            if (angle >= 45 && angle <= 135) {
                dir = 'down';
                if (this.tower.bulletAnimations !== null) bullet.frame = 3;
            }
            //console.log(angle);

            this.sprite.animations.play(dir, null, true);


        }
        if (this.target === null) {
            if (this.sprite.events.onAnimationComplete.active === true) {
                this.sprite.animations.stop(null, true);
            }
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


/**
 * Now the tower models follow
 */

var Archer         = new Tower.Model();
Archer.id          = 0;
Archer.name        = 'Archer Tower';
Archer.spriteKey   = 'ArcherTower';
Archer.bulletSprite   = 'arrow';
Archer.bulletAnimations = {
    right: [0],
    up: [1],
    left: [2],
    down: [3]
};
Archer.animations  = {
    up: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    left: [13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25],
    down: [26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38],
    right: [39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51]
};
Archer.width       = 32;
Archer.height      = 32;
Archer.scaleX      = 0.5;
Archer.scaleY      = 0.5;
Archer.cost        = [30, 60, 100];
Archer.speed       = [15, 18, 25];
Archer.range       = [175, 200, 230];
Archer.bulletSpeed = 800;
Archer.damage      = [10, 4, 7];
Archer.isAoe       = false;
Archer.isChain     = false;
//Archer.bullet = Arrow;

var Spearman         = new Tower.Model();
Spearman.id          = 1;
Spearman.name        = 'Spearman Tower';
Spearman.spriteKey   = 'SpearmanTower';
Spearman.bulletSprite   = 'noBullet';
Spearman.animations  = {
    up: [0, 1, 2, 3, 4, 5, 6, 7],
    left: [8, 9, 10, 11, 12, 13, 14, 15],
    down: [16, 17, 18, 19, 20, 21, 22, 23],
    right: [24, 25, 26, 27, 28, 29, 30, 31]
};
Spearman.width       = 32;
Spearman.height      = 32;
Spearman.scaleX      = 0.5;
Spearman.scaleY      = 0.5;
Spearman.cost        = [50, 75, 120];
Spearman.speed       = [20, 25, 30];
Spearman.range       = [55, 70, 90];
Spearman.bulletSpeed = 2000;
Spearman.damage      = [12, 18, 28];
Spearman.isAoe       = false;
Spearman.isChain     = false;
//Spearman.bullet = Arrow;


Tower.towerList = {
    0: Archer,
    1: Spearman
};