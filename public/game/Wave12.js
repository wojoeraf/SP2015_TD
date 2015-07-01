/**
 * Created by Felix on 01.07.2015.
 */


Wave12 = function (xPoint,yPoint,callback) {


    //Enemies2= 5 Stück
    for(var j=0;j<5;j++){
        var enemy2 = new NewEnemy2(xPoint+30*j,yPoint,callback);
        sprites[j] = enemy2.enemy;
        healthBars[j] = enemy2.healthbar;
        array[j]=0;
    }

    //Enemies3 = 3 Stück
    for(var j=5;j<8;j++) {
        var enemy3 = new NewEnemy3(xPoint + 30 * j, yPoint, callback);
        sprites[j] = enemy3.enemy;
        healthBars[j] = enemy3.healthbar;
        array[j] = 0;
    }
    //Enemies4 = 4 Stück
    for(var j=8;j<12;j++) {
        var enemy4 = new NewEnemy4(xPoint + 30 * j, yPoint, callback);
        sprites[j] = enemy4.enemy;
        healthBars[j] = enemy4.healthbar;
        array[j] = 0;
    }

}