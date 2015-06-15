/**
 * Created by Felix on 14.05.15.
 */
Enemy = function () {


    this.health=null;
    this.armor=null;
    this.speed=null;
    this.immunityNormal=null;
    this.immunityAoE=null;
    this.immunityChain=null;
    this.immunitySlow=null;



};

Enemy.prototype = {
    Car: function(health, armor, speed,immunityNormal,immunityAoE,immunityChain,immunitySlow) {
    this.health=health;
    this.armor=armor;
    this.speed=speed;
    this.immunityNormal=immunityNormal;
    this.immunityAoE=immunityAoE;
    this.immunityChain=immunityChain;
    this.immunitySlow=immunitySlow;
}



};