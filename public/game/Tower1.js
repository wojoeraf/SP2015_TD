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
    this.tower.speeed=300;
    this.tower.reach=200;
    this.tower.isUpgraded=false;
    this.tower.isDestroyed=false;
    this.tower.boll=false;

};

Tower1.prototype = {

    //Tower1 upgraden
    upgradeTower1: function(c){
        if(marker==null) {

            if ((this.input.mouse.button == 0)) {

                //LinksClick-> UpgradeInfos mit Button -> yes/no
                //          -> falls XP + Money okay ->nix, sonst bei Druck auf Yes -> Meldung....

                    //1 Klick schon gemacht -> Upgrade Infos
                    if(c.boll==false) {

                        popupinfoTower1U.destroy();
                        if(c.isUpgraded==false) {
                            popupinfoTower1U = this.add.sprite(c.x + 40, c.y - 30, 'tower1Upgrade1');
                            //Update1
                        }
                        else{
                            popupinfoTower1U = this.add.sprite(c.x + 40, c.y - 30, 'tower1Upgrade2');
                            //Update2
                        }
                        popupinfoTower1U.scale.x = 0.7;
                        popupinfoTower1U.scale.y = 0.7;
                        popupinfoTower1U.alpha = 0.8;
                        popupinfoTower1U.anchor.set(0.2);
                        c.boll = true;


                    }
                //2.Klick -> Update
                else{

                        console.log("UPDATER");
                        popupinfoTower1U.destroy();
                        //Schon 2 Upgrades?
                        if (c.speeed != 450) {
                            //1.Update
                            if (c.isUpgraded == false) {
                                if ((score > 1000) && (coins >= 100)) {
                                    c.speeed = 350;
                                    c.reach = 250;
                                    c.isUpgraded = true;
                                    coins = coins - 100;
                                    coinText.destroy();
                                    coinText = this.add.text(100, 20, coins);
                                    console.log("SUCESS1");
                                    //Upgrade: Sucess
                                    //popupinfoTower1U = this.add.sprite(c.x + 40, c.y - 30, 'HoverInfo');
                                }
                                else{
                                    console.log("FAIL1");
                                    //Update Fail
                                }
                            }
                            else if (c.isUpgraded == true) {
                                if ((score > 2000) && (coins >= 200)) {
                                    c.speeed = 450;
                                    c.reach = 300;
                                    coins = coins - 200;
                                    coinText.destroy();
                                    coinText = this.add.text(100, 20, coins);
                                    console.log("SUCESS2");
                                    //Upgrade: Sucess
                                    //popupinfoTower1U = this.add.sprite(c.x + 40, c.y - 30, 'HoverInfo');
                                }
                                else{
                                    console.log("FAIL2");
                                }

                            }

                        }
                        c.boll=false;
                    }

            }
            else if((this.input.mouse.button == 1)){
                popupinfoTower1U.destroy();
                c.destroy();
                coins = coins + c.cost;
                coinText.destroy();
                coinText = this.add.text(100, 20, coins);
                c.isDestroyed=true;
            }
        }
    },
    //Tower1 Upgrade-Infos
    upgradeTower1Info : function(c){

        if(c.boll==false) {

            if (c.speeed != 450) {
                if (popupinfoTower1U != null) {
                    popupinfoTower1U.destroy();
                }

                popupinfoTower1U = this.add.sprite(c.x + 40, c.y - 30, 'HoverInfo');

                popupinfoTower1U.scale.x = 0.7;
                popupinfoTower1U.scale.y = 0.7;
                popupinfoTower1U.alpha = 0.8;
                popupinfoTower1U.anchor.set(0.2);
            }
            else {
                if (popupinfoTower1U != null) {
                    popupinfoTower1U.destroy();
                }
            }
        }
        else{

        }
    },
    upgradeTower1InfoDelete: function(c){
                popupinfoTower1U.destroy();
            }




};