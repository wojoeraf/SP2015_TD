Menu.MainMenu = function () {

    this.helper = new Helper.Menu(this);
    this.fp = new FormProcessing();

    //this.buttonSettings = null;
    //this.buttonRanking = null;
    this.buttonBack = null;
    this.buttonMusic = null;
    //this.buttonBuy = null;
    //this.buttonAchievements = null;

};

Menu.MainMenu.prototype = {

    create: function () {

        //Render the captcha
        this.renderCaptcha();

        // Add background
        this.add.sprite(0, 0, 'menuBG');

        // Add buttons
        this.add.button(900, 50, 'buttonBuy', this.buyDiamonds, this);
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
        var success = this.fp.logout();
        if (success) this.player.loggedIn = false;
        this.helper.debugLog('The player object:\n' + this.player);
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

    renderCaptcha: function () {
        console.log("render render");
        var captchaContainer = null;
        loadCaptcha = function () {
            console.log("entering loadCaptcha");
            captchaContainer = grecaptcha.render('captcha_container', {
                'sitekey': '6LeBSwgTAAAAAMOYTY-lEdVzRMnmvPIVLNSj75b8',
                'callback': function (response) {
                    console.log(response);

                    $.ajax({
                        method: 'post',
                        url: '/verify',
                        dataType: "text",
                        data: response
                    }).always(function (data, status, err) {
                        console.log(status);
                        console.log(err);
                    });

                }
            });
        };
        loadCaptcha();
    }

};
