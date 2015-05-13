Menu.SettingsMenu = function () {

    this.helper = new Helper.Menu(this);

//Variablen deklarieren
    this.soundvolume = 50;
    this.musicvolume = 50;
    this.textS = null;
    this.textM = null;
    this.style = {font: "25px Arial", fill: "#ff0044", align: "center"};

};

var point;
var pointM;
Menu.SettingsMenu.prototype = {

    create: function () {
        //Titlebild, Settings-Text und Soundvolume+MusicVolume-Schriftzug hinzufügen
        this.add.sprite(0, 0, 'menuBG');
        //this.add.sprite(355,350, 'settingsText');
        //this.add.sprite(285, 499, 'soundvolumeText');
        //this.add.sprite(285,599, 'musicvolumeText');

        this.helper.placeBackButton(this.back);

        //Balken für die Volume-Anzeigen hinzufügen
        this.add.sprite(455, 507, 'line');
        this.add.sprite(455, 607, 'line2');


        //Schieberegel-Punkt hinzufügen und Drag-Event aktivieren
        //auf Veränderung des Punktes
        point = this.add.sprite(455+(Audio.soundVolume)*195, 500, 'point');
        point.inputEnabled = true;
        point.input.enableDrag();
        point.input.allowVerticalDrag = false;
        this.soundvolume=Audio.soundVolume*195;
        //neben dem Balken: Textanzeige des aktuellen Volumes
        this.textS = this.add.text(670, 495, this.soundvolume, this.style);


        //MusicVolume
        pointM = this.add.sprite(455+(Audio.musicVolume)*195, 600, 'point2');
        pointM.inputEnabled = true;
        pointM.input.enableDrag();
        pointM.input.allowVerticalDrag = false;
        this.musicvolume=Audio.musicVolume*195;
        this.textM = this.add.text(670, 595, this.musicvolume, this.style);


    },


    update: function () {

        //Soundeffekte-Punkt
        if (point.x < 455) {

            point.x=455;
            this.soundvolume = 1;
            this.textS.text=this.soundvolume;
            Audio.soundVolume=this.soundvolume/100;


        }
        else if (point.x > 650) {

            point.x=650;
            this.soundvolume = 100;
            this.textS.text=this.soundvolume;
            Audio.soundVolume=this.soundvolume/100;

        }
        else {
            this.soundvolume = 100 - Math.round(((650 - point.x) / 195) * 100);
            if (this.soundvolume < 1) {
                this.soundvolume = 1;
            }
            if (this.soundvolume > 100) {
                this.soundvolume = 100;
            }
            this.textS.text=this.soundvolume;
            Audio.soundVolume=this.soundvolume/100;

        }


        //Musicvolume-Punkt
        if (pointM.x < 455) {

            pointM.x=455;
            this.musicvolume = 1;
            this.textM.text=this.musicvolume;
            Audio.musicVolume=this.musicvolume/100;


        }
        else if (pointM.x > 650) {

            pointM.x=650;
            this.musicvolume = 100;
            this.textM.text=this.musicvolume;
            Audio.musicVolume=this.musicvolume/100;


        }
        else {

            this.musicvolume = 100 - Math.round(((650 - pointM.x) / 195) * 100);
            if (this.musicvolume < 1) {
                this.musicvolume = 1;
            }
            if (this.musicvolume > 100) {
                this.musicvolume = 100;
            }
            this.textM.text=this.musicvolume;
            Audio.musicVolume=this.musicvolume/100;


        }
    },

    // Go back
    back: function () {
        this.helper.playSound('menuClick');
        this.state.start("MainMenu");
    }
};






