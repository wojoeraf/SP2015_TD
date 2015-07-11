
/**
 * The WaveHandler class handles the movement of all waves in the level.
 * @class
 */

WaveHandler = function(lvl, waves) {
    this.lvl = lvl;
    this.waves = waves;
    //this.mobPool = this.lvl.add.group();
    this.mobPool = [];
    //console.log(this.mobPool.visible);
    //this.mobPool.x = 500;
    //this.mobPool.y = 500;
};

WaveHandler.prototype = {

    addMobToPool: function(mobSprite) {
        this.mobPool.addChild(mobSprite);
    },

    removeMobFromPool: function(mobSprite) {
        this.mobPool.remove(mobSprite, true);
    },

    sortMobPool: function () {
        this.mobPool.sort(function(a, b) {
            return a.mob.distance - b.mob.distance;
        });
    },

    cycle: function() {
        //if (this.mobPool.getChildAt[0] !== undefined)
        //    console.log(this.mobPool.getChildAt[0].body.x + ', ' +  this.mobPool.getChildAt[0].body.y);
        //console.log(this.mobPool);
        var len = this.mobPool.length;

        for(var i = 0; i < len; i++) {
            if (this.mobPool[i].isAlive()) {
                this.mobPool[i].move();
            } else {
                this.mobPool.splice(i, 1);
                len--;
                this.sortMobPool();
            }
        }

        //for(var i = 0; i < len; i++) {
        //    if (!this.waves[i].hasStarted || this.waves[i].isOver || !this.waves[i].mobsLoaded) {
        //        //No need to do anything
        //    } else {
        //        for (var j = 0; j < this.waves[i].mobs.length; j++) {
        //            if (this.waves[i].mobs[j].isAlive()) {
        //                this.waves[i].mobs[j].move();
        //            } else {
        //                this.mobSpritePool.splice(i+j-2, 1);
        //                this.sortMobPool();
        //            }
        //        }
        //    }
        //}
    }

};


/**
 * The Wave class represents concrete waves of a level, i.e. how many of which mob type.
 * @class
 */

Wave = function (lvl, reward, list, delay) {

    this.lvl = lvl;
    this.id = null;
    this.reward = reward || 10;
    this.hasStarted = false;
    this.isOver = false;
    this.mobList = list;        //Object give through wave definition in each level
    this.mobs = [];             //Array
    this.delay = delay || 750;
    this.allMobsSpawned = false;
    this.mobsLoaded = false;
};

Wave.prototype = {

    init: function() {
        for (var mobID in this.mobList) {
            for (var k = 0; k < this.mobList[mobID]; k++) {
                var mob = new Mob.WalkingMob(this.lvl.startPoint.x, this.lvl.startPoint.y, mobID, this.lvl.waypoints, this.lvl);
                mob.init();
                this.mobs.push(mob);
            }
        }
        //console.log(this.mobs);
        this.mobsLoaded = true;
    },

    start: function() {
        if (this.isOver || this.hasStarted || !this.mobsLoaded) {
            //Do nothing, wave is either already over or active at the moment or not all mobs are instantiated.
            return false;
        } else {
            this.hasStarted = true;
            //Spawn the mobs
            var counter = 0;
            this.lvl.time.events.repeat(this.delay, this.mobs.length, function () {
                //this.mobs[counter].spawnNow = true;
                var mobSprite = this.mobs[counter].spawn();
                //this.lvl.waveHandler.addMobToPool(mobSprite);
                counter++;
                if (counter === this.mobs.length) {
                    this.allMobsSpawned = true;
                    console.log('All mobs spawned!');
                    //console.log(this.lvl.waveHandler.mobPool);
                }
            }, this);

            //Debug info loop
            this.lvl.time.events.loop(1000, function () {
                //console.log('MobSpritePool length :' + this.lvl.waveHandler.mobPool.length);
                //console.log('Distance: ' + this.mobs[0].distance);
                //console.log(this.lvl.waveHandler.mobPool.getFirstAlive());
                //if (this.lvl.handler.currentTowers.length > 0)
                    //console.log(this.lvl.handler.currentTowers[0].target);
            }, this);

            return true;
        }
    }
};