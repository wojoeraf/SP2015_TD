/**
 * Created by Felix on 01.07.2015.
 */

Wave13 = function (xPoint,yPoint,callback) {


    //Enemies5 = 8 Stück
    for(var j=0;j<8;j++) {
        var enemy5 = new NewEnemy5(xPoint + 30 * j, yPoint, callback);
        sprites[j] = enemy5.enemy;
        healthBars[j] = enemy5.healthbar;
        array[j] = 0;
    }
}