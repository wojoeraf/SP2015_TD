BasicGame.MainMenu = function (game) {

    //Buttons, Music etc...
    this.musicMenu = null;
    this.playButton = null;
    this.settingButton = null;
    this.rankingButton = null;
    this.backButton = null;
    this.musicButton = null;
    this.soundOn = true;
    this.musicOn = true;
    this.buyButton = null;
    this.aButton = null;
    this.buttonClick = null;
};

BasicGame.MainMenu.prototype = {

    create: function () {

        // Audio zuweisen
        this.musicMenu = this.add.audio('titleMusic', 1, true);
        this.buttonClick = this.add.audio('menuClick', 0.2);

        // Starte Menü Musik
        this.musicMenu.play();


        this.add.sprite(0, 0, 'titlepage');
        this.playButton = this.add.button(437, 300, 'playButton', this.startGame, this);
        this.settingButton = this.add.button(437, 370, 'settingButton', this.showSettings, this);
        this.rankingButton = this.add.button(437, 440, 'rankingButton', this.showRanking, this);
        this.backButton = this.add.button(40, 685, 'logoutButton', this.logout, this);
        this.musicButton = this.add.button(950, 675, 'musicButton', this.musicToggle, this);
        this.soundButton = this.add.button(875, 675, 'soundButton', this.soundToggle, this);
        this.buyButton = this.add.button(900, 50, 'buyButton', this.buyDiamonds, this);
        this.aButton = this.add.button(437, 650, 'aButton', this.achieve, this);


    },

    update: function () {

    },

    // Wenn auf Start-Button gedrückt wurde -> Music stoppen -> Game-State laden
    startGame: function () {
        this.buttonClick.play();
        this.musicMenu.stop();
        this.state.start("Game");
    },

    // Wenn Settings-Button gedrückt wurde -> SettingMenu-State aufrufen
    showSettings: function () {
        this.state.start("SettingsMenu");
    },

    // Wenn Ranking-Button gedrückt wurde -> RankingMenu-State aufrufen
    showRanking: function () {
        this.state.start("RankingMenu");
    },

    // Wenn Logout-Button gedrückt wurde -> LoginMenu-State aufrufen
    logout: function () {
        this.musicMenu.stop();

        // TODO Logout

        this.state.start("LoginMenu");
    },

    // Schauen ob Musik ein oder ausgeschaltet werden muss
    musicToggle: function () {
        // stop musicMenu
        if (this.musicOn === true) {
            this.musicMenu.stop();
            this.musicButton.frame = 1;
            this.musicOn = false;
        }
        // play musicMenu
        else {
            this.musicMenu.play();
            this.musicButton.frame = 0;
            this.musicOn = true;
        }
    },

    // Deaktivieren der Sounds (für das ganze Spiel, nicht nur das Menü).
    soundToggle: function () {
        // stop musicMenu
        if (this.musicOn === true) {
            this.musicMenu.stop();
            this.soundButton.frame = 1;
            this.musicOn = false;
        }
        // play musicMenu
        else {
            this.musicMenu.play();
            this.soundButton.frame = 0;
            this.musicOn = true;
        }
    },

    // Buy wurde geklickt -> BuyMenu aufrufen
    buyDiamonds: function () {
        this.state.start("BuyMenu");
    },

    // Achievements Badge wurde geklickt -> AchievementsMenu aufrufen
    achieve: function () {
        this.state.start("AchievementMenu");
    }

};
