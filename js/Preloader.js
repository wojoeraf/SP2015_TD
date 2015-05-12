BasicGame.Preloader = function (game) {
	this.preloadBar = null;
	this.ready = false;
};

BasicGame.Preloader.prototype = {

	preload: function () {

        // Hintergrund und preloaderBar laden
		this.background = this.add.sprite(0, 0, 'preloaderBackground');
		this.preloadBar = this.add.sprite(360, 400, 'preloaderBar');

        // Laden-Effekt einfügen für die preloaderBar
		this.load.setPreloadSprite(this.preloadBar);

        //Laden aller Dateien (Bilder, Audio, Buttons) etc., die wir brauchen


        //Dateien fürs LoginMenu
        this.load.image('loginText', 'images/login_text2.png');
        this.load.spritesheet('loginButton', 'images/menu/menuButton_login.png');
        this.load.spritesheet('cwlButton', 'images/menu/menuButton_skip.png');
        this.load.spritesheet('fpButton', 'images/fp_Button.png');
        this.load.spritesheet('registerButton', 'images/register_Button.png');

        //Dateien fürs RegisterMenu
        this.load.image('registrationText', 'images/registration_text.png');
        this.load.spritesheet('registerButton2', 'images/menu/menuButton_register.png');
        this.load.spritesheet('backButton2', 'images/menu/menuButton_back.png');

        //Dateien fürs MainMenu
		this.load.image('titlepage', 'images/menu/menuBG2.png');
		this.load.spritesheet('playButton', 'images/menu/menuButton_startGame.png');
        this.load.spritesheet('settingButton', 'images/menu/menuButton_settings.png');
        this.load.spritesheet('rankingButton', 'images/menu/menuButton_ranking.png');
        this.load.spritesheet('backButton', 'images/menu/menuButton_back.png');
        this.load.spritesheet('logoutButton', 'images/menu/menuButton_logout.png');
        this.load.spritesheet('musicButton', 'images/menu/menuButton_musicToggle_34x40.png', 34, 40, 2);
        this.load.spritesheet('soundButton', 'images/menu/menuButton_soundToggle_49x40.png', 49, 40, 2);
        this.load.spritesheet('buyButton', 'images/menu/menuButton_buy.png');
        this.load.spritesheet('aButton', 'images/menu/menuButton_achievements.png');
	    this.load.audio('titleMusic', ['audio/Menu_Our_Mountain_v001.mp3']);
		this.load.audio('menuClick', 'audio/menuClick.mp3');


        //Dateien fürs Game
        //TODO

        //Dateien fürs SettingMenu

        this.load.image('point', 'images/point.png');
        this.load.image('point2','images/point2.png');
        this.load.image('settingsText', 'images/settings_text.png');
        this.load.image('musicvolumeText','images/musicvolume_text2.png');
        this.load.image('soundvolumeText', 'images/soundvolume_text3.jpg');
        this.load.image('line', 'images/line.png');
        this.load.image('line2', 'images/line2.png');



        //Dateien fürs RankingMenu
        //TODO

        //Dateien fürs DiamondBuyMenu
        //TODO
	},

	create: function () {
		this.preloadBar.cropEnabled = false;
	},

	update: function () {
        //Wenn AudioDateien decodiert wurden -> weiter momentan ins Hauptmenu, eigentlich ins LoginMenu
		if (this.cache.isSoundDecoded('titleMusic') && this.ready == false) {
			this.ready = true;
			this.state.start("LoginMenu");
		}

	}

};
