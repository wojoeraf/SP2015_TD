/**
 * Created by Felix on 15.06.2015.
 */

Tower3 = function (markerX,markerY,callback) {

    this.tower = callback.add.sprite(marker.x, marker.y, 'tower3');
    this.tower.inputEnabled = true;
    this.tower.input.useHandCursor = true;
    this.tower.events.onInputDown.add(this.upgradeTower3, callback);
    this.tower.x=marker.x;
    this.tower.y=marker.y;
    this.tower.typ = 2;
    this.tower.cost = 70;
    this.tower.speeed=270;
    this.tower.reach=170;
    this.tower.isUpgraded=false;
    this.tower.isDestroyed=false;
    this.tower.boll=false;

};

Tower3.prototype={


    //Tower3 upgraden
    upgradeTower3: function(c) {
        if (marker == null) {

            if ((this.input.mouse.button == 0)) {
                this.helpers.popUpT3(c,this);
            }
        }
    }




}