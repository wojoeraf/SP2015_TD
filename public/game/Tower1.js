/**
 * Created by Felix on 15.06.2015.
 */

Tower1 = function (markerX,markerY,callback) {
    this.helpers = new Helpers.Menu();

    this.tower=callback.add.sprite(markerX, markerY, 'tower');
    this.tower.inputEnabled = true;
    this.tower.input.useHandCursor = true;
    this.tower.events.onInputDown.add(this.upgradeTower1, callback);
   // this.tower.events.onInputOver.add(this.upgradeTower1Info,callback);
   // this.tower.events.onInputOut.add(this.upgradeTower1InfoDelete,callback);
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
    upgradeTower1: function(c) {
        if (marker == null) {

            if ((this.input.mouse.button == 0)) {
                this.helpers.popUpT(c,this);
            }
        }
    }

};