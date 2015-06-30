/**
 * Created by Felix on 30.06.2015.
 */
NewEnemy5 = function (positionX,yPoint,callback) {

    this.enemy=callback.add.sprite(positionX, yPoint, 'newEnemy5', 1);
    this.enemy.scale.x=0.65;
    this.enemy.scale.y=0.65;
    this.enemy.animations.add('left', [117,118,119,120,121,122,123,124,125], 10, true);
    this.enemy.animations.add('right', [143,144,145,146,147,147,148,149,150,151], 10, true);
    this.enemy.animations.add('up', [104,105,106,107,108,109,110,111,112],10, true);
    this.enemy.animations.add('down', [130,131,132,133,134,135,136,137,138],10, true);
    this.enemy.speed=90;
    this.enemy.visible = false;
    this.enemy.beginLife=45;
    this.enemy.life = 45;
    this.healthbar =callback.add.sprite(positionX,yPoint-10,'xpBar2',1);
    this.healthbar.scale.set(0.05);
    this.healthbar.scale.x=0.033;
    callback.physics.enable(this.enemy, Phaser.Physics.ARCADE);

};