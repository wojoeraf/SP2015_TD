/**
 * Created by Felix on 16.06.2015.
 */


Wave3 = function (xPoint,yPoint,callback) {


    //Enemies2 = 5 St�ck
    for(var j=0;j<5;j++){
        var enemy2 = new NewEnemy2(xPoint+30*j,yPoint,callback);
        sprites[j] = enemy2.enemy;
        healthBars[j] = enemy2.healthbar;
        array[j]=0;
    }
};