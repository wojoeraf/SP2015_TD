/**
 * Created by Felix on 30.06.2015.
 */

Wave11 = function (xPoint,yPoint,callback) {


    //Enemies5 = 5 Stück
    for(var j=0;j<5;j++) {
        var enemy5 = new NewEnemy5(xPoint + 30 * j, yPoint, callback);
        sprites[j] = enemy5.enemy;
        healthBars[j] = enemy5.healthbar;
        array[j] = 0;
    }
}