
BasicGame.Preloader = function (game) {

	this.background = null;
	this.preloadBar = null;
	this.ready = false;

};

BasicGame.Preloader.prototype = {

	preload: function () {



        //Hintergrund und preloaderBar laden
		this.background = this.add.sprite(0, 0, 'preloaderBackground');
		this.preloadBar = this.add.sprite(360, 400, 'preloaderBar');


        //Laden-Effekt einfügen für die preloaderBar
		this.load.setPreloadSprite(this.preloadBar);


        //Laden aller Dateien (Bilder, Audio, Buttons) etc., die wir brauchen



        //Dateien fürs LoginMenu

        this.load.image('loginText', 'images/login_text2.png');
        this.load.spritesheet('loginButton', 'images/login_Button.png');
        this.load.spritesheet('cwlButton', 'images/cwl_Button.png');
        this.load.spritesheet('fpButton', 'images/fp_Button.png');
        this.load.spritesheet('registerButton', 'images/register_Button.png');

        //Dateien fürs RegisterMenu

        this.load.image('registrationText', 'images/registration_text.png');
        this.load.spritesheet('registerButton2', 'images/register_Button2.png');
        this.load.spritesheet('backButton2', 'images/back_button2.png');





        //Dateien fürs MainMenu

		this.load.image('titlepage', 'images/title.jpg');
		this.load.spritesheet('playButton', 'images/start_button.png');
        this.load.spritesheet('settingButton', 'images/settings_button.png');
        this.load.spritesheet('rankingButton', 'images/rankings_button.png');
        this.load.spritesheet('backButton', 'images/back_button.png');
        this.load.spritesheet('musicButton', 'images/note.png');
        this.load.spritesheet('musicOutButton', 'images/musicOut.png');
        this.load.spritesheet('buyButton', 'images/buy_Button.png');
        this.load.spritesheet('aButton', 'images/a_Button.png');
	    this.load.audio('titleMusic', ['audio/main_menu.mp3']);


        //Dateien fürs Game

        //TODO



        //Dateien fürs SettingMenu

         this.load.image('point', 'images/point.png');
         this.load.image('settingsText', 'images/settings_text.png');
         this.load.image('musicvolumeText','images/musicvolume_text.png');
         this.load.image('soundvolumeText', 'images/soundvolume_text.png');


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
		if (this.cache.isSoundDecoded('titleMusic') && this.ready == false)
		{
			this.ready = true;
			this.state.start("LoginMenu");
		}

	}

};
