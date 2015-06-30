/**
 * Created by Felix on 30.06.2015.
 */

Wave7 = function (xPoint,yPoint,callback) {


    //Enemies3 = 3 Stück
    for(var j=0;j<3;j++){
        var enemy3 = new NewEnemy3(xPoint+30*j,yPoint,callback);
        sprites[j] = enemy3.enemy;
        healthBars[j] = enemy3.healthbar;
        array[j]=0;
    }

    //Enemies4 = 2 Stück
    for(var j=3;j<5;j++){
        var enemy4 = new NewEnemy4(xPoint+30*j,yPoint,callback);
        sprites[j] = enemy4.enemy;
        healthBars[j] = enemy4.healthbar;
        array[j]=0;
    }
};