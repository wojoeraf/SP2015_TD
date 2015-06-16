/**
 * Created by Felix on 15.06.2015.
 */
Enemy1 = function (positionX,yPoint,callback) {

    this.enemy=callback.add.sprite(positionX, yPoint, 'player', 1);
    this.enemy.animations.add('left', [8, 9], 10, true);
    this.enemy.animations.add('right', [1, 2], 10, true);
    this.enemy.animations.add('up', [11, 12, 13], 10, true);
    this.enemy.animations.add('down', [4, 5, 6], 10, true);
    this.enemy.speed=70;
    this.enemy.visible = false;
    this.enemy.beginLife=7;
    this.enemy.life = 7;
    this.healthbar =callback.add.sprite(positionX,yPoint-10,'xpBar2',1);
    this.healthbar.scale.set(0.05);
    this.healthbar.scale.x=0.033;
    callback.physics.enable(this.enemy, Phaser.Physics.ARCADE);

};