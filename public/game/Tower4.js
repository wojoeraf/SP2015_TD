/**
 * Created by Felix on 15.06.2015.
 */

Tower4 = function (markerX,markerY,callback) {

    this.tower = callback.add.sprite(marker.x, marker.y, 'tower4');
    this.tower.inputEnabled = true;
    this.tower.input.useHandCursor = true;
    this.tower.events.onInputDown.add(this.upgradeTower4, callback);
    this.tower.events.onInputOver.add(this.upgradeTower4Info,callback);
    this.tower.events.onInputOut.add(this.upgradeTower4InfoDelete,callback);
    this.tower.x=marker.x;
    this.tower.y=marker.y;
    this.tower.typ = 3;
    this.tower.cost = 30;
    this.tower.speeed=180;
    this.tower.reach=150;
    this.tower.isUpgraded=false;

};

Tower4.prototype = {
    //Tower4 upgraden
    upgradeTower4: function(c){
        if(marker==null) {
            //Schon 2 Upgrades?
            if(c.speeed!=300) {
                //1.Update
                if (c.isUpgraded == false) {
                    if ((score > 1000) && (coins >= 100)) {
                        c.speeed = 230;
                        c.reach = 200;
                        c.isUpgraded = true;
                        coins = coins - 100;
                        coinText.destroy();
                        coinText = this.add.text(100, 20, coins);
                    }
                }
                else if (c.isUpgraded == true) {
                    if ((score > 2000) && (coins >= 200)) {
                        c.speeed = 300;
                        c.reach = 230;
                        coins = coins - 200;
                        coinText.destroy();
                        coinText = this.add.text(100, 20, coins);
                    }
                }
            }
        }
    },
    //Tower4 Upgrade Infos
    upgradeTower4Info : function(c){
        if(c.speeed!=300) {
            if (popupinfoTower4U != null) {
                popupinfoTower4U.destroy();
            }

            if (c.isUpgraded == false) {
                popupinfoTower4U = this.add.sprite(c.x + 40, c.y - 40, 'tower1Upgrade1');
            }
            else {
                popupinfoTower4U = this.add.sprite(c.x + 40, c.y - 40, 'tower1Upgrade2');
            }
            popupinfoTower4U.scale.x = 0.7;
            popupinfoTower4U.scale.y = 0.7;
            popupinfoTower4U.alpha = 0.8;
            popupinfoTower4U.anchor.set(0.2);
        }
        else{
            if (popupinfoTower4U != null) {
                popupinfoTower4U.destroy();
            }
        }
    },
    upgradeTower4InfoDelete: function(){
        popupinfoTower4U.destroy();
    }


}