/**
 * Created by Felix on 15.06.2015.
 */

Tower1 = function (markerX,markerY,callback) {

    this.tower=callback.add.sprite(markerX, markerY, 'tower');
    this.tower.inputEnabled = true;
    this.tower.input.useHandCursor = true;
    this.tower.events.onInputDown.add(this.upgradeTower1, callback);
    this.tower.events.onInputOver.add(this.upgradeTower1Info,callback);
    this.tower.events.onInputOut.add(this.upgradeTower1InfoDelete,callback);
    this.tower.x=markerX;
    this.tower.y=markerY;
    this.tower.typ = 0;
    this.tower.cost = 30;
    this.tower.speeed=200;
    this.tower.reach=100;
    this.tower.isUpgraded=false;

};

Tower1.prototype = {

    //Tower1 upgraden
    upgradeTower1: function(c){
        if(marker==null) {
            //Schon 2 Upgrades?
            if(c.speeed!=400) {
                //1.Update
                if (c.isUpgraded == false) {
                    if ((score > 1000) && (coins >= 100)) {
                        c.speeed = 300;
                        c.reach = 200;
                        c.isUpgraded = true;
                        coins = coins - 100;
                        coinText.destroy();
                        coinText = this.add.text(100, 20, coins);
                    }
                }
                else if (c.isUpgraded == true) {
                    if ((score > 2000) && (coins >= 200)) {
                        c.speeed = 450;
                        c.reach = 350;
                        coins = coins - 200;
                        coinText.destroy();
                        coinText = this.add.text(100, 20, coins);
                    }
                }
            }
        }
    },
    //Tower1 Upgrade-Infos
    upgradeTower1Info : function(c){

        if(c.speeed!=450) {
            if (popupinfoTower1U != null) {
                popupinfoTower1U.destroy();
            }

            if (c.isUpgraded == false) {
                popupinfoTower1U = this.add.sprite(c.x + 40, c.y - 40, 'tower1Upgrade1');
            }
            else {
                popupinfoTower1U = this.add.sprite(c.x + 40, c.y - 40, 'tower1Upgrade2');
            }
            popupinfoTower1U.scale.x = 0.7;
            popupinfoTower1U.scale.y = 0.7;
            popupinfoTower1U.alpha = 0.8;
            popupinfoTower1U.anchor.set(0.2);
        }
        else{
            if (popupinfoTower1U != null) {
                popupinfoTower1U.destroy();
            }
        }
    },
    upgradeTower1InfoDelete: function(){
        popupinfoTower1U.destroy();
    }


};