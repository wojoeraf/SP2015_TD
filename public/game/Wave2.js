/**
 * Created by Felix on 15.06.2015.
 */

Wave2 = function (xPoint,yPoint,callback) {


    //Enemies1 = 5 Stück
    for(var i=0;i<5;i++){
        var enemy = new Enemy1(xPoint+30*i,yPoint,callback);
        sprites[i] = enemy.enemy;
        healthBars[i] = enemy.healthbar;
        array[i]=0;
    }

    //Enemies2 = 5 Stück
    for(var j=5;j<10;j++){
        var enemy2 = new Enemy2(xPoint+30*j,yPoint,callback);
        sprites[j] = enemy2.enemy;
        healthBars[j] = enemy2.healthbar;
        array[j]=0;
    }
};