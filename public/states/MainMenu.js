Menu.MainMenu = function () {

    this.helper = new Helper.Menu(this);
    this.fp = new FormProcessing();

    this.buttonSound = null;
    this.buttonMusic = null;

};

Menu.MainMenu.prototype = {

    init: function () {
        // Pause game when game tab looses focus
        this.stage.disableVisibilityChange = true;
        this.helper.debugLog('The player data is: ' + JSON.stringify(player), this);
    },


    create: function () {

        // Add background
        this.add.sprite(0, 0, 'menuBG');

        // Add buttons

        if (player.loggedIn == true) {
            this.add.button(900, 50, 'buttonBuy', this.buyDiamonds, this);
            this.add.sprite(900, 12, 'diamond');
            this.add.text(935, 10, player.diamonds, {font: "30px MenuFont", fill: '#ddd'});
        }

        //Test button for highscore system
        this.add.button(1, 1, 'buttonPlay', this.addHighscore, this);

        this.add.button(437, 300, 'buttonPlay', this.startGame, this);
        this.add.button(437, 370, 'buttonSettings', this.showSettings, this);
        this.add.button(437, 440, 'buttonRanking', this.showRanking, this);
        this.add.button(437, 650, 'buttonAchievements', this.achieve, this);
        this.buttonMusic = this.helper.placeMusicButton(this.musicToggle);
        this.buttonSound = this.helper.placeSoundButton(this.soundToggle);


        if (player.loggedIn)
            this.helper.placeLogoutButton(this.logout);
        else
            this.helper.placeBackButton(this.back);

        this.buttonMusic.scale.setTo(0.75, 0.75);
        this.buttonSound.scale.setTo(0.6, 0.6);
    },

    update: function () {

    },

    // Start game
    startGame: function () {
        this.helper.playSound('menuClick');
        this.state.start("LevelSelector");
    },

    // Got to settings
    showSettings: function () {
        this.helper.playSound('menuClick');
        this.state.start("SettingsMenu");
    },

    // Got to rankings
    showRanking: function () {
        this.helper.playSound('menuClick');
        this.state.start("RankingMenu");
    },

    // logout
    logout: function () {
        this.helper.playSound('menuClick');
        var success = this.fp.logout(this);
        if (success) {
            this.player = new Player();
        }
        this.helper.debugLog('Emptied the player object. It is: ' + JSON.stringify(this.player), this);
        this.state.start("LoginMenu");
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
    },

    // Buy diamonds
    buyDiamonds: function () {
        this.helper.playSound('menuClick');
        this.state.start("BuyMenu");
    },

    // View achievements
    achieve: function () {
        this.helper.playSound('menuClick');
        this.state.start("AchievementMenu");
    },

    //Test function for the highscore functionality
    addHighscore: function () {
        console.log("Doing highscore stuff!");

        var name = player.name;

        var outerThis = this;
        $(function () {
            var data = {
                username: name,
                score: 1322,
                level: 2
            };
            $.ajax({
                method: 'post',
                url: '/highscore',
                dataType: 'json',
                data: data
            }).always(function(data, status){
                outerThis.helper.debugLog('Status: ' + status, outerThis);
                outerThis.helper.debugLog('Returned data: ' + JSON.stringify(data), outerThis);
            });
            return false;
        });
    }

}
;
