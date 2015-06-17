/**
 * Created by Felix on 16.06.2015.
 */


Wave3 = function (xPoint,yPoint,callback) {


    //Enemies2 = 10 Stück
    for(var j=0;j<10;j++){
        var enemy2 = new Enemy2(xPoint+25*j,yPoint,callback);
        sprites[j] = enemy2.enemy;
        healthBars[j] = enemy2.healthbar;
        array[j]=0;
    }
};