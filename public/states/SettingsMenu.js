Menu.SettingsMenu = function () {

    this.helper = new Helper.Menu(this);
    this.fp = new FormProcessing();


};

var musicVol = 0.5;
var soundVol = 0.5;

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

        //Füge die beiden slider hinzu
        $(function() {
            $( "#sliderMusic" ).slider({
                animate: true,
                min: 0,
                max: 1,
                step: 0.01,
                value: musicVol
            });
        });

        $(function() {
            $( "#sliderSound" ).slider({
                animate: true,
                min: 0,
                max: 1,
                step: 0.01,
                value: soundVol
            });
        });

    },


    update: function () {

        //Neue Lautstärke = Wert der Slider
        musicVol = $( "#sliderMusic" ).slider( "option", "value" );
        this.game.sound.volume = musicVol;

        soundVol = $( "#sliderSound" ).slider( "option", "value" );
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






