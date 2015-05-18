// Preloading state
Menu.Preloader = function () {

};

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


        // Achievements

    },

    create: function () {

    },

    update: function () {
        // Check whether audio files are ready
        if (this.cache.isSoundReady('titleMusic') && this.cache.isSoundReady('menuClick')) {
            // Add audios to game audio
            this.add.audio('titleMusic', 1, true);
            this.add.audio('menuClick', 0.2);

            // Play music when not muted
            if (!Audio.musicIsMuted) {
                this.sound.play('titleMusic');
            }

            // Go to login state
            this.state.start("LoginMenu");
        }
    }
};
