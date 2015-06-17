
/**
 * Created by Felix on 15.06.2015.
 */

Tower2 = function (markerX,markerY,callback) {

    this.tower = callback.add.sprite(markerX, markerY, 'tower2');
    this.tower.inputEnabled = true;
    this.tower.input.useHandCursor = true;
    this.tower.events.onInputDown.add(this.upgradeTower2, callback);
    this.tower.events.onInputOver.add(this.upgradeTower2Info,callback);
    this.tower.events.onInputOut.add(this.upgradeTower2InfoDelete,callback);
    this.tower.x=markerX;
    this.tower.y=markerY;
    this.tower.typ = 1;
    this.tower.cost = 70;
    this.tower.speeed=500;
    this.tower.reach=250;
    this.tower.isUpgraded=false;
    this.tower.isDestroyed=false;

};

Tower2.prototype = {

    //Tower2 upgraden
    upgradeTower2: function(c){
        if(marker==null) {
            if ((this.input.mouse.button == 0)) {
                //Schon 2 Upgrades?
                if (c.speeed != 650) {
                    //1.Update
                    if (c.isUpgraded == false) {
                        if ((score > 3000) && (coins >= 300)) {
                            c.speeed = 550;
                            c.reach = 300;
                            c.isUpgraded = true;
                            coins = coins - 300;
                            coinText.destroy();
                            coinText = this.add.text(100, 20, coins);
                        }
                    }
                    else if (c.isUpgraded == true) {
                        if ((score > 4000) && (coins >= 400)) {
                            c.speeed = 650;
                            c.reach = 350;
                            coins = coins - 400;
                            coinText.destroy();
                            coinText = this.add.text(100, 20, coins);
                        }
                    }
                }
            }
            else if((this.input.mouse.button == 1)){
                popupinfoTower2U.destroy();
                c.destroy();
                coins = coins + c.cost;
                coinText.destroy();
                coinText = this.add.text(100, 20, coins);
                c.isDestroyed=true;
            }
        }
    },
    //Tower2 Upgrade Infos
    upgradeTower2Info : function(c){
        if(c.speeed!=800) {
            if (popupinfoTower2U != null) {
                popupinfoTower2U.destroy();
            }

            popupinfoTower2U = this.add.sprite(c.x + 40, c.y - 30, 'HoverInfo');

            popupinfoTower2U.scale.x = 0.7;
            popupinfoTower2U.scale.y = 0.7;
            popupinfoTower2U.alpha = 0.8;
            popupinfoTower2U.anchor.set(0.2);
        }
        else{
            if (popupinfoTower2U != null) {
                popupinfoTower2U.destroy();
            }
        }
    },
    upgradeTower2InfoDelete: function(){
        popupinfoTower2U.destroy();
    }
}