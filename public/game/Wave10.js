/**
 * Created by Felix on 30.06.2015.
 */

Wave10 = function (xPoint,yPoint,callback) {


    //Enemies1 = 2 Stück
    for(var j=0;j<2;j++){
        var enemy1 = new NewEnemy1(xPoint+30*j,yPoint,callback);
        sprites[j] = enemy1.enemy;
        healthBars[j] = enemy1.healthbar;
        array[j]=0;
    }
    //Enemies2= 1 Stück
    for(var j=2;j<3;j++){
        var enemy2 = new NewEnemy2(xPoint+30*j,yPoint,callback);
        sprites[j] = enemy2.enemy;
        healthBars[j] = enemy2.healthbar;
        array[j]=0;
    }

    //Enemies3 = 2 Stück
    for(var j=3;j<5;j++) {
        var enemy3 = new NewEnemy3(xPoint + 30 * j, yPoint, callback);
        sprites[j] = enemy3.enemy;
        healthBars[j] = enemy3.healthbar;
        array[j] = 0;
    }
    //Enemies4 = 2 Stück
    for(var j=5;j<7;j++) {
        var enemy4 = new NewEnemy4(xPoint + 30 * j, yPoint, callback);
        sprites[j] = enemy4.enemy;
        healthBars[j] = enemy4.healthbar;
        array[j] = 0;
    }

}