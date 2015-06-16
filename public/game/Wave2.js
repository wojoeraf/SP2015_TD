/**
 * Created by Felix on 15.06.2015.
 */

Wave2 = function (xPoint,yPoint,callback) {


    //Enemies1 = 6 St�ck
    for(var i=0;i<6;i++){
        var enemy = new Enemy1(xPoint+25*i,yPoint,callback);
        sprites[i] = enemy.enemy;
        healthBars[i] = enemy.healthbar;
        array[i]=0;
    }

    //Enemies2 = 8 St�ck
    for(var j=6;j<14;j++){
        var enemy2 = new Enemy2(xPoint+25*j,yPoint,callback);
        sprites[j] = enemy2.enemy;
        healthBars[j] = enemy2.healthbar;
        array[j]=0;
    }
};