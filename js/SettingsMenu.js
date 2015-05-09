/**
 * Created by Felix on 08.05.15.
 */

BasicGame.SettingsMenu = function(game){



}
var spite;
var result;
var sonic;
BasicGame.SettingsMenu.prototype = {

    create: function(){

        this.add.sprite(0, 0, 'titlepage');
        this.add.sprite(355,350, 'settingsText');
        this.add.sprite(300, 500, 'soundvolumeText');

        /*
        spite = this.add.sprite(200, 400, 'point');


        //  Enable Input detection. Sprites have this disabled by default,
        //  so you have to start it if you want to interact with them.
        spite.inputEnabled = true;

        //  This allows you to drag the sprite. The parameter controls if you drag from the position you touched it (false)
        //  or if it will snap to the center (true)
        spite.input.enableDrag();


        //  This will lock the sprite so it can only be dragged horizontally, not vertically
        spite.input.allowVerticalDrag = false;

       */

         sonic = this.add.sprite(450, 500, 'point');

        sonic.inputEnabled = true;
        sonic.input.enableDrag();
        sonic.input.allowVerticalDrag = false;
        sonic.events.onDragStart.add(onDragStart, this);
        sonic.events.onDragStop.add(onDragStop, this);




    },


    update: function(){




}


};

function onDragStart(sprite, pointer) {


    if(pointer.x<=440){
        sonic.destroy();

        sonic = this.add.sprite(450, 500, 'point');
        sonic.inputEnabled = true;
        sonic.input.enableDrag();
        sonic.input.allowVerticalDrag = false;
        sonic.events.onDragStart.add(onDragStart, this);
        sonic.events.onDragStop.add(onDragStop, this);

    }


    if(pointer.x>=650){
        sonic.destroy();

        sonic = this.add.sprite(640, 500, 'point');
        sonic.inputEnabled = true;
        sonic.input.enableDrag();
        sonic.input.allowVerticalDrag = false;
        sonic.events.onDragStart.add(onDragStart, this);
        sonic.events.onDragStop.add(onDragStop, this);

    }


}

function onDragStop(sprite, pointer) {

    //result = sprite.key + " dropped at x:"  ++ pointer.x " y: " + pointer.y;

    if(pointer.x<=440){
        sonic.destroy();

        sonic = this.add.sprite(450, 500, 'point');
        sonic.inputEnabled = true;
        sonic.input.enableDrag();
        sonic.input.allowVerticalDrag = false;
        sonic.events.onDragStart.add(onDragStart, this);
        sonic.events.onDragStop.add(onDragStop, this);

    }

    if(pointer.x>=650){
        sonic.destroy();

        sonic = this.add.sprite(640, 500, 'point');
        sonic.inputEnabled = true;
        sonic.input.enableDrag();
        sonic.input.allowVerticalDrag = false;
        sonic.events.onDragStart.add(onDragStart, this);
        sonic.events.onDragStop.add(onDragStop, this);


    }

}

function render() {

    this.debug.text(result, 10, 20);

}