/**
 * Created by Felix on 15.06.2015.
 */

Wave2 = function (xPoint,yPoint,callback) {


    //Enemies1 = 3 Stück
    for(var i=0;i<3;i++){
        var enemy = new NewEnemy1(xPoint+30*i,yPoint,callback);
        sprites[i] = enemy.enemy;
        healthBars[i] = enemy.healthbar;
        array[i]=0;
    }

    //Enemies2 = 2 Stück
    for(var j=3;j<5;j++){
        var enemy2 = new NewEnemy2(xPoint+30+30*j,yPoint,callback);
        sprites[j] = enemy2.enemy;
        healthBars[j] = enemy2.healthbar;
        array[j]=0;
    }
};