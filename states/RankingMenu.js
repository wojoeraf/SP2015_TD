Menu.RankingMenu = function () {

    this.helper = new Helper.Menu(this);

};

Menu.RankingMenu.prototype = {

    create: function () {

        // Add background
        this.add.sprite(0, 0, 'menuBG');

        // Add buttons
        this.buttonMusic = this.helper.placeMusicButton(this.musicToggle);
        this.buttonSound = this.helper.placeSoundButton(this.soundToggle);
    },

    update: function () {

    },

    // Go back
    back: function () {
        this.helper.playSound('menuClick');
        this.state.start("LoginMenu");
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
