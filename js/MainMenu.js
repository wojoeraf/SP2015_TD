
BasicGame.MainMenu = function (game) {


    //Buttons, Music etc...
    this.music = null;
	this.playButton = null;
    this.settingButton=null;
    this.rankingButton=null;
    this.backButton=null;
    this.musicButton=null;
    this.musicOutButton=null;
    this.musicout=false;
    this.buyButton=null;
    this.aButton=null;

};

BasicGame.MainMenu.prototype = {

	create: function () {



        //Music laden und abspielen, Buttons hinzufügen

        this.music = this.add.audio('titleMusic');
        if(this.musicout==false){
		this.music.play();
        }
        else{
            this.music.stop();
        }

		this.add.sprite(0, 0, 'titlepage');

		this.playButton = this.add.button(380, 400, 'playButton', this.startGame, this);
        this.settingButton = this.add.button(380,460,'settingButton', this.showSettings, this);
        this.rankingButton = this.add.button(380,520,'rankingButton', this.showRanking, this);
        this.backButton = this.add.button(0,685,'backButton', this.goBack, this);
        this.musicButton = this.add.button(900,675,'musicButton', this.musicInOut, this);
        this.buyButton = this.add.button(900,125,'buyButton', this.buyDiamonds, this);
        this.aButton = this.add.button(780,685,'aButton', this.achieve, this);


	},


    //Musik kontrollieren (ein/aus) und auf Klicks auf Button reagieren
	update: function () {

        //wenn musicout==true -> Button mit durchgestrichener Note laden, sonst den normalen Music-Button

        if(this.musicout==true){
            this.musicButton = this.add.button(900,675,'musicOutButton', this.musicInOut, this);
        }
        else{
            this.musicButton = this.add.button(900,675,'musicButton', this.musicInOut, this);
        }

	},

    //Wenn auf Start-Button gedrückt wurde -> Music stoppen -> Game-State laden
	startGame: function (pointer) {

		//	Ok, the Play Button has been clicked or touched, so let's stop the music (otherwise it'll carry on playing)
		this.music.stop();

		//	And start the actual game
		this.state.start("Game");

	},

    //Wenn Settings-Button gedrückt wurde -> SettingMenu-State aufrufen
    showSettings: function(pointer){
        this.music.stop();
        this.state.start("SettingsMenu");
    },

    //Wenn Ranking-Button gedrückt wurde -> RankingMenu-State aufrufen
    showRanking: function(pointer){
        this.music.stop();
        this.state.start("RankingMenu");
    },

    //Wenn back/Logout-Button gedrückt wurde -> LoginMenu-State aufrufen
    goBack: function(pointer){
        this.music.stop();
        this.state.start("LoginMenu");
    },

    //Schauen ob Musik ein oder ausgeschaltet werden muss
    musicInOut: function(pointer){

        if(this.musicout==false){
        this.music.stop();
        this.musicout=true;
    }
        else{
            this.music.play();
            this.musicout=false;
        }
    },

    //buy-more wurde geklickt -> BuyMenu aufrufen
    buyDiamonds: function(pointer){
        this.music.stop();
        this.state.start("BuyMenu");
    },

    achieve: function(pointer){
        this.state.start("AchievementMenu");
    }


};
