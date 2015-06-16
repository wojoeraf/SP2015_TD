/**
 * Created by Felix on 15.06.2015.
 */

Wave1 = function (xPoint,yPoint,callback) {


    //Enemies1 = 10 Stück
    var enemy1Number=10;
    for(var i=0;i<enemy1Number;i++){
        var enemy = new Enemy1(xPoint+25*i,yPoint,callback);
        sprites[i] = enemy.enemy;
        healthBars[i] = enemy.healthbar;
        array[i]=0;
    }

    //Enemies2 = 0 Stück

};