Menu.MainMenu = function () {

    this.loggedIn = false;
    //Buttons, Music etc...
    this.musicMenu = null;
    this.buttonPlay = null;
    this.buttonSettings = null;
    this.buttonRanking = null;
    this.buttonBack = null;
    this.buttonMusic = null;
    this.buttonBuy = null;
    this.buttonAchievements = null;
    this.soundOn = true;
    this.musicOn = true;
    this.buttonSoundClick = null;

    this.helper = new Helper.Menu();
    this.fp = new FormProcessing();
};

Menu.MainMenu.prototype = {

    create: function () {

        // Add background
        this.add.sprite(0, 0, 'menuBG');

        // Add buttons
        this.add.button(900, 50, 'buttonBuy', this.buyDiamonds, this);
        this.add.button(437, 300, 'buttonPlay', this.startGame, this);
        this.add.button(437, 370, 'buttonSettings', this.showSettings, this);
        this.add.button(437, 440, 'buttonRanking', this.showRanking, this);
        this.buttonMusic = this.helper.placeMusicButton(this, this.musicToggle);
        this.buttonSound = this.helper.placeSoundButton(this, this.soundToggle);
        this.buttonAchievements = this.add.button(437, 650, 'buttonAchievements', this.achieve, this);

        if (player.loggedIn)
            this.helper.placeLogoutButton(this, this.back);
        else
            this.helper.placeBackButton(this, this.back);

        this.buttonMusic.scale.setTo(0.75, 0.75);
        this.buttonSound.scale.setTo(0.6, 0.6);
    },

    update: function () {

    },

    // Start game
    startGame: function () {
        this.helper.playSound(this, 'menuClick');
        this.state.start("Game");
    },

    // Got to settings
    showSettings: function () {
        this.helper.playSound(this, 'menuClick');
        this.state.start("SettingsMenu");
    },

    // Got to rankings
    showRanking: function () {
        this.helper.playSound(this, 'menuClick');
        this.state.start("RankingMenu");
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
    },

    // Buy diamonds
    buyDiamonds: function () {
        this.helper.playSound(this, 'menuClick');
        this.state.start("BuyMenu");
    },

    // Vew achievements
    achieve: function () {
        this.helper.playSound(this, 'menuClick');
        this.state.start("AchievementMenu");
    }

};
