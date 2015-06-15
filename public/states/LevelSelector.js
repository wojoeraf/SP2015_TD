Menu.LevelSelector = function () {

    this.helper = new Helper.Menu(this);

};

Menu.LevelSelector.prototype = {

    create: function () {

        // Add background
        this.add.sprite(0, 0, 'menuBG');

        // Add buttons
        this.buttonMusic = this.helper.placeMusicButton(this.musicToggle);
        this.buttonSound = this.helper.placeSoundButton(this.soundToggle);
        this.helper.placeBackButton(this.back);

        this.add.button(237, 320, 'buttonEasy', this.startEasy, this);
        this.add.button(437, 320, 'buttonMedium', this.startMedium, this);
        this.add.button(637, 320, 'buttonHard', this.startHard, this);
        this.add.sprite(412, 200, 'difficulty');
    },

    update: function () {


    },

    // Start game in easy mode
    startEasy: function () {
        this.helper.playSound('menuClick');
        this.state.start("Game");

    },

    // Starg game in medium mode
    startMedium: function () {
        this.helper.playSound('menuClick');
        this.state.start("Game");

    },


    // Start game in hard mode
    startHard: function () {
        this.helper.playSound('menuClick');
        this.state.start("Game");

    },

    // Go back
    back: function () {
        this.helper.playSound('menuClick');
        this.state.start("MainMenu");
    },

    // Toggle music
    musicToggle: function () {
        this.helper.toggleMusic(this.buttonMusic);
    },

    // Toggle sound
    soundToggle: function () {
        this.helper.toggleSound(this.buttonSound);
    }
};
