// Preloading state
Menu.Preloader = function () {
    this.fp = new FormProcessing(); // for handling the forms and input
    this.helper = new Helper.Menu(this);
};

var musicVolume = 0.5;
var soundVolume = 0.5;

Menu.Preloader.prototype = {

    preload: function () {

        // Set preloading background
        this.add.sprite(0, 0, 'preloaderBackground');

        // Set loadingbar with loading animation
        this.load.setPreloadSprite(this.add.sprite(387, 700, 'menuLoadingBar'));

        /*
         * Load assets for next states
         * */
        this.load.image('menuBG', 'assets/menu/menuBG2.png');

        // Audio
        this.load.audio('menuClick', 'audio/menuClick.mp3');
        Audio.menuSoundKeys.push('menuClick');
        this.load.audio('titleMusic', 'audio/Menu_Our_Mountain_v001.mp3');
        Audio.menuMusicKeys.push('titleMusic');

        // General
        this.load.spritesheet('popupFrame', 'assets/sprites/popupFrameSprites1.png', 5, 5, 2);
        this.load.spritesheet('buttonLogout', 'assets/menu/menuButton_logout.png', 75, 40, 1);
        this.load.spritesheet('buttonBack', 'assets/menu/menuButton_back.png', 75, 40, 1);
        this.load.spritesheet('buttonMusic', 'assets/menu/menuButton_musicToggle_34x40.png', 34, 40, 2);
        this.load.spritesheet('buttonSound', 'assets/menu/menuButton_soundToggle_49x40.png', 49, 40, 2);

        // Login
        this.load.spritesheet('buttonLogin', 'assets/menu/menuButton_login.png');
        this.load.spritesheet('buttonSkip', 'assets/menu/menuButton_skip.png');

        // Forgot password
        this.load.spritesheet('buttonSendRequest', 'assets/menu/menuButton_sendRequest.png');

        // Register
        this.load.spritesheet('buttonRegister', 'assets/menu/menuButton_register.png');

        // Main menu
        this.load.spritesheet('buttonPlay', 'assets/menu/menuButton_startGame.png');
        this.load.spritesheet('buttonSettings', 'assets/menu/menuButton_settings.png');
        this.load.spritesheet('buttonRanking', 'assets/menu/menuButton_ranking.png');
        this.load.spritesheet('buttonBuy', 'assets/menu/menuButton_buy.png');
        this.load.spritesheet('buttonAchievements', 'assets/menu/menuButton_achievements.png');

        // Settings
        this.load.spritesheet('point', 'assets/point.png');
        this.load.spritesheet('point2', 'assets/point.png');
        this.load.spritesheet('line', 'assets/menu/line.png');
        this.load.spritesheet('line2', 'assets/menu/line.png');
        this.load.spritesheet('volumeSound', 'assets/menu/settings/volume_Sound.png');
        this.load.spritesheet('volumeMusic', 'assets/menu/settings/volume_Music.png');
        this.load.spritesheet('changePW', 'assets/menu/settings/menuButton_changePW.png');
        this.load.spritesheet('confirm', 'assets/menu/settings/menuButton_confirm.png');

        // Level Selector
        this.load.spritesheet('buttonEasy', 'assets/menu/menuButton_gameEasy.png');
        this.load.spritesheet('buttonMedium', 'assets/menu/menuButton_gameMedium.png');
        this.load.spritesheet('buttonHard', 'assets/menu/menuButton_gameHard.png');
        this.load.image('difficulty', 'assets/menu/text_difficulty.png');

        // Ranking

        this.load.spritesheet('rankingEasy', 'assets/menu/menuButton_easy.png');
        this.load.spritesheet('rankingMedium', 'assets/menu/menuButton_medium.png');
        this.load.spritesheet('rankingHard', 'assets/menu/menuButton_hard.png');

        this.load.spritesheet('rankingEasyBright', 'assets/menu/menuButton_easy_bright.png');
        this.load.spritesheet('rankingMediumBright', 'assets/menu/menuButton_medium_bright.png');
        this.load.spritesheet('rankingHardBright', 'assets/menu/menuButton_hard_bright.png');


        // Buy
        this.load.spritesheet('buyText', 'assets/menu/Buy/buy_diamonds.png');
        this.load.spritesheet('buy1', 'assets/menu/Buy/buy1.png');
        this.load.spritesheet('buy2', 'assets/menu/Buy/buy2.png');
        this.load.spritesheet('buy3', 'assets/menu/Buy/buy3.png');
        this.load.spritesheet('freeDiamonds', 'assets/menu/Buy/free_diamonds.png');


        // Achievements

        this.load.image('text_achieve', 'assets/menu/text_achievements.png');
        this.load.spritesheet('achieve1', 'assets/menu/achievements/achieved/1.png');
        this.load.spritesheet('achieve2', 'assets/menu/achievements/achieved/2.png');
        this.load.spritesheet('achieve3', 'assets/menu/achievements/achieved/3.png');
        this.load.spritesheet('achieve4', 'assets/menu/achievements/achieved/4.png');
        this.load.spritesheet('achieve5', 'assets/menu/achievements/achieved/5.png');
        this.load.spritesheet('achieve6', 'assets/menu/achievements/achieved/6.png');
        this.load.spritesheet('achieve7', 'assets/menu/achievements/achieved/7.png');
        this.load.spritesheet('achieve8', 'assets/menu/achievements/achieved/8.png');
        this.load.spritesheet('achieve9', 'assets/menu/achievements/achieved/9.png');

        this.load.spritesheet('not_achieve1', 'assets/menu/achievements/not_achieved/no_1.png');
        this.load.spritesheet('not_achieve2', 'assets/menu/achievements/not_achieved/no_2.png');
        this.load.spritesheet('not_achieve3', 'assets/menu/achievements/not_achieved/no_3.png');
        this.load.spritesheet('not_achieve4', 'assets/menu/achievements/not_achieved/no_4.png');
        this.load.spritesheet('not_achieve5', 'assets/menu/achievements/not_achieved/no_5.png');
        this.load.spritesheet('not_achieve6', 'assets/menu/achievements/not_achieved/no_6.png');
        this.load.spritesheet('not_achieve7', 'assets/menu/achievements/not_achieved/no_7.png');
        this.load.spritesheet('not_achieve8', 'assets/menu/achievements/not_achieved/no_8.png');
        this.load.spritesheet('not_achieve9', 'assets/menu/achievements/not_achieved/no_9.png');


        //Empty achievement
        this.load.image('achieveEmpty', 'assets/menu/achievements/empty.png');
        //Texts
        this.load.image('achieveText1', 'assets/menu/achievements/1text.png');
        this.load.image('achieveText2', 'assets/menu/achievements/2text.png');
        this.load.image('achieveText3', 'assets/menu/achievements/3text.png');
        this.load.image('achieveText4', 'assets/menu/achievements/placeholder.png');
        this.load.image('achieveText5', 'assets/menu/achievements/placeholder.png');
        this.load.image('achieveText6', 'assets/menu/achievements/placeholder.png');
        this.load.image('achieveText7', 'assets/menu/achievements/placeholder.png');
        this.load.image('achieveText8', 'assets/menu/achievements/placeholder.png');
        this.load.image('achieveText9', 'assets/menu/achievements/placeholder.png');

        //Render the captcha into the empty container


        var captchaContainer = null;
        loadCaptcha = function () {
            captchaContainer = grecaptcha.render('captcha_container', {
                'sitekey': '6LeBSwgTAAAAAMOYTY-lEdVzRMnmvPIVLNSj75b8',
                'callback': function (response) {
                    //onsole.log(response);

                    //Important: the local player instance is written in lowercase letters
                    //response = response + "#" + player.name;

                    var name = player.name;

                    var data = {
                        playername: name,
                        gresponse: response
                    };

                    console.log(data);

                    $.ajax({
                        method: 'post',
                        url: '/verify',
                        dataType: "text",
                        data: data
                    }).always(function (data, status, err) {
                        //If the response is 'true', award a diamond
                        if (data) {
                            console.log("player diamonds OLD: " + player.diamonds);
                            player.diamonds++;
                            console.log("player diamonds NEW: " + player.diamonds);
                        }
                    });
                    /**.success(function (data, status, err) {
                        console.log(data);
                        console.log(status);
                        console.log(err);


                         Player.diamonds++;
                         console.log("Player now has " + Player.diamonds + " diamonds");
                    });**/

                }
            });
        };
        loadCaptcha();



        //Initialize the slider for the popup menu

        $(function () {
            $("#popupMusic").slider({
                animate: true,
                min: 0,
                max: 1,
                step: 0.01,
                value: musicVolume
            });
        });

        $(function () {
            $("#popupSound").slider({
                animate: true,
                min: 0,
                max: 1,
                step: 0.01,
                value: soundVolume
            });
        });

        //Füge die Slider für das Settins menü hinzu
        $(function () {
            $("#sliderMusic").slider({
                animate: true,
                min: 0,
                max: 1,
                step: 0.01,
                value: musicVolume
            });
        });

        $(function () {
            $("#sliderSound").slider({
                animate: true,
                min: 0,
                max: 1,
                step: 0.01,
                value: soundVolume
            });
        });

        // Check for active session
        var outerThis = this;
        $(function () {
            $.ajax({
                method: 'post',
                url: '/checkSession',
                dataType: 'json',
                data: {}
            }).done(function (data, status) {
                outerThis.helper.debugLog('Status: ' + status, outerThis);
                outerThis.helper.debugLog('Returned data: ' + JSON.stringify(data), outerThis);

                outerThis.helper.debugLog('Session check successful.', outerThis);
                outerThis.helper.debugLog('Active session: ' + data.bool, outerThis);
                if (data.bool == true) {
                    // session found and user detected, so load his credentials
                    player.loadData(data.user);
                }
            }).fail(function (data, status, err) {
                outerThis.helper.debugLog('Session check failed.');
                outerThis.helper.debugLog('Unable to check for session\nResponse:\n' + JSON.stringify(data, null, 4));
                outerThis.helper.debugLog('Status: ' + status, outerThis);
                outerThis.helper.debugLog('Error: ' + err, outerThis);
                outerThis.helper.debugLog('Returned data: ' + JSON.stringify(data.responseJSON), outerThis);

                var message = data.responseJSON.message;
                outerThis.helper.debugLog(message);

                player.loggedIn = false;
            });
            return false;
        });

    },

    create: function () {

    },

    update: function () {
        // Check whether audio files are ready
        if (this.cache.isSoundReady('titleMusic') && this.cache.isSoundReady('menuClick')) {
            // Add audios to game audio
            this.add.audio('titleMusic', 1, true);
            this.add.audio('menuClick', 0.2);
            this.game.sound.volume = 0.5;

            // Play music when not muted
            if (!Audio.musicIsMuted) {
                this.sound.play('titleMusic');
            }

            // Go to next state depending on logged in or not (due to session checking)
            if (player.loggedIn) {
                this.state.start("MainMenu");
            } else {
                this.state.start("LoginMenu");
            }
        }
    }
};
