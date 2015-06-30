/**
 * Created by Felix on 30.06.2015.
 */

Wave6 = function (xPoint,yPoint,callback) {


    //Enemies3 = 5 Stück
    for(var j=0;j<5;j++){
        var enemy3 = new NewEnemy3(xPoint+30*j,yPoint,callback);
        sprites[j] = enemy3.enemy;
        healthBars[j] = enemy3.healthbar;
        array[j]=0;
    }
};