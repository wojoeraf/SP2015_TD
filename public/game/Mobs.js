
/**
 * Mobs namespace
 * @namespace Mob
 */

var Mob = {
    mobList: {}
};

/**
 * The Mob.Model class represents provides a "prototype" (parent) of all mobs. Instances of this class
 * are concrete mob descriptions. The ingame mobs (Mob.WalkingMob) get ther attributes from their
 * corresponding instance.
 * @class
 */

Mob.Model = function() {
    this.id = null;         //Number
    this.name = null;       //String
    this.spriteKey = null;  //String
    this.animations = null; //Object
    this.speed = null;      //Number
    this.health = null;     //Number
    this.isBoss = null;     //Boolean
    this.type = null;       //String (ground, air...)
};

Mob.Model.prototype = {

};



Mob.WalkingMob = function(x, y, id, waypoints, game) {
    this.game = game;
    this.mobID = id;
    this.mob = Mob.mobList[this.mobID];         //Holds a Mob.Model instance
    this.sprite = null;                         //Holding the sprite of the mob in the game
    this.startX = x;
    this.startY = y;
    this.waypoints = waypoints;
    this.lasWP  = null;                         //Number: last waypoint on the map
    this.nextWP = null;                         //Number: Next waypoint
    this.wpReached = true;                     //Reached next waypoint? Needed for moving the mobs
    this.speedFactor = null;                    //In case mob is slowed down
    this.spawnNow = false;                     //Indicating "You can spawn"
};

Mob.WalkingMob.prototype = {

    init: function(animFrameRate, scaleX, scaleY) {
        var animRate = animFrameRate || 10;
        this.sprite = this.game.add.sprite(this.startX, this.startY, this.mob.spriteKey, 1);
        this.sprite.anchor.set(0.5, 1);
        if (scaleX !== undefined && scaleY !== undefined) {
            this.sprite.scale.set(scaleX, scaleY);
        }
        this.sprite.checkWorldBounds = true;
        this.sprite.outOfBoundsKill = true;
        this.sprite.events.onOutOfBounds.add(this.mobCameThrough, this, 10);
        this.sprite.visible = false;
        this.sprite.speed = this.mob.speed;
        this.speedFactor = 1;
        this.game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
        this.sprite.animations.add('right', this.mob.animations.right, animRate, true);
        this.sprite.animations.add('down', this.mob.animations.down, animRate, true);
        this.sprite.animations.add('left', this.mob.animations.left, animRate, true);
        this.sprite.animations.add('up', this.mob.animations.up, animRate, true);
        this.nextWP = 1;
        this.lastWP = this.waypoints.length - 1;
    },

    destroy: function() {
        this.sprite.destroy();
    },

    mobCameThrough: function() {
        this.game.handler.lifes--;
        this.game.handler.helperHUD.updateLifes();
    },

    spawn: function() {
        if (this.spawnNow === true) {
            this.sprite.visible = true;
            this.move();
        }
    },

    move: function() {
        if (this.spawnNow === true) {
            //console.log('Sprite pos: ' + this.sprite.body.x + ', ' + this.sprite.body.y + ' (' + this.sprite.y + ')');
            //console.log('Dist: (' + Math.abs(this.sprite.body.x - this.waypoints[this.nextWP].x) + ', ' + Math.abs(this.sprite.body.y - this.waypoints[this.nextWP].y) + ')');
            if (this.sprite !== undefined && this.wpReached === true && this.nextWP <= this.lastWP) {
                console.log('Walking');
                console.log('Go to: ' + this.waypoints[this.nextWP].x + ', ' + this.waypoints[this.nextWP].y);
                var speed         = this.speedFactor * this.mob.speed;
                this.sprite.speed = speed;
                var ang           = this.game.physics.arcade.moveToXY(this.sprite,
                    this.waypoints[this.nextWP].x,
                    this.waypoints[this.nextWP].y,
                    speed);
                console.log('Angle: ' + ang);

                //animation direction:
                var angle = ang * 57.2957795 //rad to deg
                var dir = '';
                if (angle > -45 && angle < 45) dir = 'right';
                if (angle > -135 && angle < -45) dir = 'up';
                if (angle > -180 && angle < -135) dir = 'left';
                if (angle > 135 && angle < 80) dir = 'left';
                if (angle > 45 && angle < 135) dir = 'down';

                this.sprite.animations.play(dir);

                this.wpReached = false;
            } else if (this.nextWP < this.lastWP
                && Math.abs(this.sprite.x - this.waypoints[this.nextWP].x) < 5
                && Math.abs(this.sprite.y - this.waypoints[this.nextWP].y) < 5
                && this.nextWP < this.waypoints.length) {
                this.wpReached = true;
                this.nextWP++;
                console.log('next WP: ' + this.nextWP);
            }
        }
    }

};

var Artil = new Mob.Model();
Artil.id = 0;
Artil.name = 'Artillery';
Artil.spriteKey = 'player';
Artil.animations = {
    right: [1,2],
    down: [4,5,6],
    left: [8,9],
    up: [11,12,13]
};
Artil.speed = 50;
Artil.health = 15;
Artil.isBoss = false;
Artil.type = 'ground';

var test = new Mob.Model();
test.id = 1;
test.name = 'test';
test.spriteKey = 'newEnemy1';
test.animations = {
    right: [143,144,145,146,147,147,148,149,150,151],
    down: [130,131,132,133,134,135,136,137,138],
    left: [117,118,119,120,121,122,123,124,125],
    up: [104,105,106,107,108,109,110,111,112]
};
test.speed = 100;
test.health = 18;
test.isBoss = false;
test.type = 'ground';

Mob.mobList = {
    0: Artil,
    1: test
};