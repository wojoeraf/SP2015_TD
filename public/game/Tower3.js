/**
 * Created by Felix on 15.06.2015.
 */

Tower3 = function (markerX,markerY,callback) {

    this.tower = callback.add.sprite(marker.x, marker.y, 'tower3');
    this.tower.inputEnabled = true;
    this.tower.input.useHandCursor = true;
    this.tower.events.onInputDown.add(this.upgradeTower3, callback);
    this.tower.events.onInputOver.add(this.upgradeTower3Info,callback);
    this.tower.events.onInputOut.add(this.upgradeTower3InfoDelete,callback);
    this.tower.x=marker.x;
    this.tower.y=marker.y;
    this.tower.typ = 2;
    this.tower.cost = 70;
    this.tower.speeed=270;
    this.tower.reach=170;
    this.tower.isUpgraded=false;
    this.tower.isDestroyed=false;

};

Tower3.prototype={


    //Tower3 upgraden
    upgradeTower3: function(c){
        if(marker==null) {
            if ((this.input.mouse.button == 0)) {
            //Schon 2 Upgrades?
            if(c.speeed!=400) {
                //1.Update
                if (c.isUpgraded == false) {
                    if ((score > 3000) && (coins >= 300)) {
                        c.speeed = 320;
                        c.reach = 220;
                        c.isUpgraded = true;
                        coins = coins - 300;
                        coinText.destroy();
                        coinText = this.add.text(100, 20, coins);
                    }
                }
                else if (c.isUpgraded == true) {
                    if ((score > 4000) && (coins >= 400)) {
                        c.speeed = 400;
                        c.reach = 270;
                        coins = coins - 400;
                        coinText.destroy();
                        coinText = this.add.text(100, 20, coins);
                    }
                }
            }
            }
            else if((this.input.mouse.button == 1)){
                popupinfoTower3U.destroy();
                c.destroy();
                coins = coins + c.cost;
                coinText.destroy();
                coinText = this.add.text(100, 20, coins);
                c.isDestroyed=true;
            }
        }
    },
    //Tower3 Upgrade Infos
    upgradeTower3Info : function(c){
        if(c.speeed!=220) {
            if (popupinfoTower3U != null) {
                popupinfoTower3U.destroy();
            }

            popupinfoTower3U = this.add.sprite(c.x + 40, c.y - 30, 'HoverInfo');

            popupinfoTower3U.scale.x = 0.7;
            popupinfoTower3U.scale.y = 0.7;
            popupinfoTower3U.alpha = 0.8;
            popupinfoTower3U.anchor.set(0.2);
        }
        else{
            if (popupinfoTower3U != null) {
                popupinfoTower3U.destroy();
            }
        }
    },
    upgradeTower3InfoDelete: function(){
        popupinfoTower3U.destroy();
    }






}