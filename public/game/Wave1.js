/**
 * Created by Felix on 15.06.2015.
 */

Wave1 = function (xPoint,yPoint,callback) {


    //Enemies1 = 6 Stück
    var enemy1Number=6;
    for(var i=0;i<enemy1Number;i++){
        var enemy = new NewEnemy1(xPoint+30*i,yPoint,callback);
        sprites[i] = enemy.enemy;
        healthBars[i] = enemy.healthbar;
        array[i]=0;
    }

    //Enemies2 = 0 Stück

};