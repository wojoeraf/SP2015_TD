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
        this.helper.placeBackButton(this.back);

        //Adding text and buttons
        this.add.sprite(437, 200, 'buttonRanking');
        this.add.button(275, 300, 'rankingEasy', this.showEasy, this);
        this.add.button(475, 300, 'rankingMedium', this.showMedium, this);
        this.add.button(675, 300, 'rankingHard', this.showHard, this);
    },

    update: function () {

    },

    //Show the best players on the easy map
    showEasy: function () {
        this.add.button(275, 300, 'rankingEasyBright', this.showEasy, this);
        this.add.button(475, 300, 'rankingMedium', this.showMedium, this);
        this.add.button(675, 300, 'rankingHard', this.showHard, this);
        this.helper.playSound('menuClick');

    },

    //Show the best players on the medium map
    showMedium: function () {
        this.add.button(275, 300, 'rankingEasy', this.showEasy, this);
        this.add.button(475, 300, 'rankingMediumBright', this.showMedium, this);
        this.add.button(675, 300, 'rankingHard', this.showHard, this);
        this.helper.playSound('menuClick');

    },

    //Show the best players on the hard map
    showHard: function () {
        this.add.button(275, 300, 'rankingEasy', this.showEasy, this);
        this.add.button(475, 300, 'rankingMedium', this.showMedium, this);
        this.add.button(675, 300, 'rankingHardBright', this.showHard, this);
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
