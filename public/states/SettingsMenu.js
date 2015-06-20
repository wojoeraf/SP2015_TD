Menu.SettingsMenu = function () {

    this.helper = new Helper.Menu(this);
    this.fp = new FormProcessing();


};

var musicVol;
var soundVol;

Menu.SettingsMenu.prototype = {

    create: function () {

        //Titlebild, Settings-Text und Soundvolume+MusicVolume-Schriftzug hinzufügen
        this.add.sprite(0, 0, 'menuBG');
        //Add text
        this.add.sprite(431, 230, 'volumeMusic');
        this.add.sprite(431, 370, 'volumeSound');

        //Show the sliders
        this.fp.showSettings();

        //Standardbuttons
        this.helper.placeBackButton(this.back);
        this.buttonMusic = this.helper.placeMusicButton(this.musicToggle);
        this.buttonSound = this.helper.placeSoundButton(this.soundToggle);



        /**
        $(function() {
            $( "#sliderMusic" ).slider();
        });

        $(function() {
            $( "#sliderSound" ).slider();
        });
         **/

    },


    update: function () {


         musicVol = $("#musicVolume").val();
         //console.log("Value of music Slider: " + musicVol);

         soundVol = $("#soundVolume").val();

         this.game.sound.volume = musicVol;
         Audio.soundVolume = soundVol;



    },

    // Go back
    back: function () {
        this.helper.playSound('menuClick');
        this.state.start("MainMenu");
        this.fp.hideSettings();

    },

    musicToggle: function () {
        this.helper.toggleMusic(this.buttonMusic);
    },


    soundToggle: function () {
        this.helper.toggleSound(this.buttonSound);
    }
}
;






