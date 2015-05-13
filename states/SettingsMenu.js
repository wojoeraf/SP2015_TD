Menu.SettingsMenu = function (game) {

    this.helper = new Helper.Menu();

//Variablen deklarieren
    this.soundvolume = 50;
    this.musicvolume = 50;
    this.textS = null;
    this.textM = null;
    this.style = {font: "25px Arial", fill: "#ff0044", align: "center"};

}

var point;
var pointM;
Menu.SettingsMenu.prototype = {

    create: function () {
        //Titlebild, Settings-Text und Soundvolume+MusicVolume-Schriftzug hinzufügen
        this.add.sprite(0, 0, 'menuBG');
        //this.add.sprite(355,350, 'settingsText');
        //this.add.sprite(285, 499, 'soundvolumeText');
        //this.add.sprite(285,599, 'musicvolumeText');

        this.helper.placeBackButton(this, this.back);

        //Balken für die Volume-Anzeigen hinzufügen
        this.add.sprite(455, 507, 'line');
        this.add.sprite(455, 607, 'line2');


        //Schieberegel-Punkt hinzufügen und Drag-Event aktivieren
        //auf Veränderung des Punktes
        point = this.add.sprite(552.5, 500, 'point');
        point.inputEnabled = true;
        point.input.enableDrag();
        point.input.allowVerticalDrag = false;
        //neben dem Balken: Textanzeige des aktuellen Volumes
        this.textS = this.add.text(670, 495, this.soundvolume, this.style);


        //MusicVolume
        pointM = this.add.sprite(552.5, 600, 'point2');
        pointM.inputEnabled = true;
        pointM.input.enableDrag();
        pointM.input.allowVerticalDrag = false;
        this.textM = this.add.text(670, 595, this.musicvolume, this.style);


    },


    update: function () {

        //Soundeffekte-Punkt
        if (point.x < 455) {
            point.destroy();
            point = this.add.sprite(455, 500, 'point');
            point.inputEnabled = true;
            point.input.enableDrag();
            point.input.allowVerticalDrag = false;
            this.textS.destroy();
            this.soundvolume = 1;
            this.textS = this.add.text(670, 495, this.soundvolume, this.style);
        }
        else if (point.x > 650) {
            point.destroy();
            point = this.add.sprite(650, 500, 'point');
            point.inputEnabled = true;
            point.input.enableDrag();
            point.input.allowVerticalDrag = false;
            this.textS.destroy();
            this.soundvolume = 100;
            this.textS = this.add.text(670, 495, this.soundvolume, this.style);


        }
        else {
            this.textS.destroy();
            this.soundvolume = 100 - Math.round(((650 - point.x) / 195) * 100);
            if (this.soundvolume < 1) {
                this.soundvolume = 1;
            }
            if (this.soundvolume > 100) {
                this.soundvolume = 100;
            }
            this.textS = this.add.text(670, 495, this.soundvolume, this.style);
        }


        //Musicvolume-Punkt
        if (pointM.x < 455) {
            pointM.destroy();
            pointM = this.add.sprite(455, 600, 'point2');
            pointM.inputEnabled = true;
            pointM.input.enableDrag();
            pointM.input.allowVerticalDrag = false;
            this.textM.destroy();
            this.musicvolume = 1;
            this.textM = this.add.text(670, 595, this.musicvolume, this.style);
        }
        else if (pointM.x > 650) {
            pointM.destroy();
            pointM = this.add.sprite(650, 600, 'point2');
            pointM.inputEnabled = true;
            pointM.input.enableDrag();
            pointM.input.allowVerticalDrag = false;
            this.textM.destroy();
            this.musicvolume = 100;
            this.textM = this.add.text(670, 595, this.musicvolume, this.style);
        }
        else {
            this.textM.destroy();
            this.musicvolume = 100 - Math.round(((650 - pointM.x) / 195) * 100);
            if (this.musicvolume < 1) {
                this.musicvolume = 1;
            }
            if (this.musicvolume > 100) {
                this.musicvolume = 100;
            }
            this.textM = this.add.text(670, 595, this.musicvolume, this.style);
        }
    },

    // Go back
    back: function () {
        this.helper.playSound(this, 'menuClick');
        this.state.start("LoginMenu");
    }
};






