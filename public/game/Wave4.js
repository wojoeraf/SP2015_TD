/**
 * Created by Felix on 30.06.2015.
 */


Wave4 = function (xPoint,yPoint,callback) {


    //Enemies2 = 3 Stück
    for(var j=0;j<3;j++){
        var enemy2 = new NewEnemy2(xPoint+30*j,yPoint,callback);
        sprites[j] = enemy2.enemy;
        healthBars[j] = enemy2.healthbar;
        array[j]=0;
    }
    //Enemies3 = 2 Stück
    for(var j=3;j<5;j++){
        var enemy3= new NewEnemy3(xPoint+30*j,yPoint,callback);
        sprites[j] = enemy3.enemy;
        healthBars[j] = enemy3.healthbar;
        array[j]=0;
    }

};