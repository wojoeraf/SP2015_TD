/**
 * Created by Felix on 30.06.2015.
 */

Wave9 = function (xPoint,yPoint,callback) {


    //Enemies4 = 5 St�ck
    for(var j=0;j<5;j++) {
        var enemy4 = new NewEnemy4(xPoint + 30 * j, yPoint, callback);
        sprites[j] = enemy4.enemy;
        healthBars[j] = enemy4.healthbar;
        array[j] = 0;
    }
}