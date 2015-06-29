
/**
 * Created by Felix on 15.06.2015.
 */

Tower2 = function (markerX,markerY,callback) {

    this.tower = callback.add.sprite(markerX, markerY, 'tower2');
    this.tower.inputEnabled = true;
    this.tower.input.useHandCursor = true;
    this.tower.events.onInputDown.add(this.upgradeTower2, callback);
    this.tower.x=markerX;
    this.tower.y=markerY;
    this.tower.typ = 1;
    this.tower.cost = 70;
    this.tower.speeed=500;
    this.tower.reach=250;
    this.tower.isUpgraded=false;
    this.tower.isDestroyed=false;
    this.tower.boll=false;

};

Tower2.prototype = {



    //Tower2 upgraden
    upgradeTower2: function(c) {
        if (marker == null) {

            if ((this.input.mouse.button == 0)) {
                this.helpers.popUpT2(c,this);
            }
        }
    }

};