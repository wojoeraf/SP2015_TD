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

        this.add.button(237, 350, 'buttonEasy', this.startEasy, this);
        this.add.button(437, 350, 'buttonMedium', this.startMedium, this);
        this.add.button(637, 350, 'buttonHard', this.startHard, this);
        this.add.sprite(237, 200, 'difficulty');
    },

    update: function () {


    },

    // Start game in easy mode
    startEasy: function () {
        this.helper.playSound('menuClick');

    },

    // Starg game in medium mode
    startMedium: function () {
        this.helper.playSound('menuClick');

    },


    // Start game in hard mode
    startHard: function () {
        this.helper.playSound('menuClick');

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
