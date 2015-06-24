/**
 * Created by Felix on 15.06.2015.
 */

Tower4 = function (markerX,markerY,callback) {

    this.tower = callback.add.sprite(marker.x, marker.y, 'tower4');
    this.tower.inputEnabled = true;
    this.tower.input.useHandCursor = true;
    this.tower.events.onInputDown.add(this.upgradeTower4, callback);
    this.tower.x=marker.x;
    this.tower.y=marker.y;
    this.tower.typ = 3;
    this.tower.cost = 30;
    this.tower.speeed=180;
    this.tower.reach=150;
    this.tower.isUpgraded=false;
    this.tower.isDestroyed=false;
    this.tower.boll=false;

};

Tower4.prototype = {


    //Tower4 upgraden
    upgradeTower4: function(c) {
        if (marker == null) {

            if ((this.input.mouse.button == 0)) {
                this.helpers.popUpT4(c,this);
            }
        }
    }
}