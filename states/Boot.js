// Canvas width and height
var canvasWidth = 1024;
var canvasHeight = 768;






var map;
var layer;

//marker=Turmauswahlrechteck
var marker=null;






//NextWave-Button gedrückt?
var bool = false;

//Obere Leiste (Score,XP etc..)
var score = 1;
var scoreText;
var xpBar;
var life = 5;
var heart;
var heartText;
var diamond;
var diamonds=10;
var diamondText;
var coin;
var coins = 70;
var coinText;

//Tower und zugehörige Waffen speichern
var bullets = [0,0,0,0,0,0,0,0,0];
var towers=[0,0,0,0,0,0,0,0,0,0];
//Tower-Counter
var towerC=0;

//Welcher TowerButton wurde gedrückt -> unterschiedliche Tower
var towerButton=-1;

//Hilfsarrays für nextWave und checkCol
var array = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var counterArray= [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var sprites = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var healthBars = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var enemyWaveNr=0;
var enemyNumber;

//PopUp-Menü
var popup;
var backButton;
var quitButton;

var button1;
var popupinfoTower1;
var button2;
var popupinfoTower2;
var popupinfoTower1U;
var popupinfoTower2U;
var lifeVar=0;
var towerButtons=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];





var myPoint1 = new Phaser.Point(600,190);
var myPoint2 = new Phaser.Point(600,400);
var myPoint3 = new Phaser.Point(300,400);
var myPoint4 = new Phaser.Point(300,150);
var myPoint5 = new Phaser.Point(0,150);








// Namespace for audio
var Audio = {};

// Initialize empty arrays holding sound and music keys in order to distinguish them for muting.
Audio = {
    menuMusicKeys: [],
    menuSoundKeys: [],

    gameMusicKeys: [],
    gameSoundKeys: [],

    musicIsMuted: false,
    soundIsMuted: false,

    musicVolume: 1,
    soundVolume: 0.3
};


// Instantiate the player object
var player = new Player();


// Namespace for game menu
var Menu = {};


// boot state
Menu.Boot = function () {

};

Menu.Boot.prototype = {

    init: function () {
        //  Deactivate multi touch
        this.input.maxPointers = 1;

        //  Prevent game from pausing when game tab looses focus in order to load everything also in background
        this.stage.disableVisibilityChange = false;

        // Device dependent settings
        if (this.game.device.desktop) {
            // Desktop Browser
        }
        else {
            // Mobile Browser

            // Show all while maintaining proportions
            this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

            // Set the min and max dimensions for the Display canvas
            this.scale.setMinMax(480, 260, 1024, 768);

            // Force landscape orientation
            this.scale.forceLandscape = true;
        }
    },

    preload: function () {
        // Load background for preloader and loading bar
        this.load.image('preloaderBackground', 'assets/menu/menuBG2.png');
        this.load.image('menuLoadingBar', 'assets/menu/menuBar_loading.png');

    },

    create: function () {
        // When init and preload is done, switch immediately to preload state
        this.state.start('Preloader');
    }
};
