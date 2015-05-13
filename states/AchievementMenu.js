Menu.AchievementMenu = function () {

    this.helper = new Helper.Menu();

};

Menu.AchievementMenu.prototype = {

    create: function () {

        // Add background
        this.add.sprite(0, 0, 'menuBG');

        // Add buttons
        this.buttonMusic = this.helper.placeMusicButton(this, this.musicToggle);
        this.buttonSound = this.helper.placeSoundButton(this, this.soundToggle);
    },

    update: function () {

    },

    // Go back
    back: function () {
        this.helper.playSound(this, 'menuClick');
        this.state.start("LoginMenu");
    },

    // Toggle music
    musicToggle: function () {
        this.helper.toggleMusic(this, this.buttonMusic);
    },

    // Toggle sound
    soundToggle: function () {
        this.helper.toggleSound(this, this.buttonSound);
    }
};
