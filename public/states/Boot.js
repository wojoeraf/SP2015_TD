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
var life;
var heart;
var heartText;
var diamond;
var diamonds=1;
var diamondText;
var coin;
var coins = 70;
var coinText;
var diamondInfo;
var diamondAction=false;
//Tower und zugehörige Waffen speichern
var bullets = [0,0,0,0,0,0,0,0,0];
var towers=[0,0,0,0,0,0,0,0,0,0];
//Tower-Counter
var towerC=0;
//Welcher TowerButton wurde gedrückt -> unterschiedliche Tower
var towerButton=-1;
//Hilfsarrays für nextWave und checkCol
var array = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var counterArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var sprites = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var healthBars = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var enemyWaveNr=0;
var enemyNumber;
var upgradeButton;
var deleteButton;
var towerB;
var exitButton;
var levelchooser;
//PopUp-Menü
var popup;
var backButton;
var quitButton;
var button1;
var popupinfoTower1;
var button2;
var button3;
var button4;
var button5;
var popupinfoTower2;
var popupinfoTower3;
var popupinfoTower4;
var popupinfoTower1U;
var towerButtons=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];


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

        //SPIELDATEN FÜR HELPERKLASSE
        //Towers
        this.load.spritesheet('tower', 'assets/sprites/block.png', 32, 32);
        this.load.spritesheet('tower1', 'assets/sprites/tower_1.png');
        this.load.spritesheet('tower2Text', 'assets/sprites/tower_2.png');
        this.load.spritesheet('tower2', 'assets/sprites/tower2.png', 32, 32);
        this.load.spritesheet('tower3', 'assets/sprites/tower3.png', 32, 32);
        this.load.spritesheet('tower4', 'assets/sprites/Tower4.png', 32, 32);
        this.load.spritesheet('tower4Text', 'assets/sprites/tower_4.png');
        this.load.spritesheet('tower3Text', 'assets/sprites/tower_3.png');
        //Bullets
        this.load.spritesheet('bullet', 'assets/sprites/bullet.png', 8, 8);
        this.load.spritesheet('bullet2', 'assets/sprites/slime.png', 14, 14);
        this.load.spritesheet('bullet3', 'assets/sprites/bullet3.png');
        this.load.spritesheet('bullet4', 'assets/sprites/bullet4.png');
        //Elemente obere Leiste
        this.load.spritesheet('xpBar2', 'assets/sprites/xpBar2.png');
        this.load.spritesheet('heart', 'assets/sprites/heart.png');
        this.load.spritesheet('diamond', 'assets/sprites/diamond.png');
        this.load.spritesheet('coin', 'assets/sprites/coin1.png');
        //Hintergrund Popup-Menü
        this.load.image('background', 'assets/sprites/background3.png');
        this.load.image('towerInfo1', 'assets/sprites/towerInfos1.png');
        this.load.image('towerInfo2', 'assets/sprites/towerInfos2.png');
        this.load.image('towerInfo3', 'assets/sprites/towerInfo3.png');
        this.load.image('towerInfo4', 'assets/sprites/towerInfo4.png');
        //Tower1UpgradeInfos
        this.load.image('tower1Upgrade1', 'assets/sprites/UpgradeInfoT1.png');
        this.load.image('tower1Upgrade2', 'assets/sprites/UpgradeInfoT1-2.png');
        this.load.image('tower1Upgrade1F', 'assets/sprites/UpgradeInfoT1F.png');
        this.load.image('tower1Upgrade2F', 'assets/sprites/UpgradeInfoT1-2-F.png');
        //Tower2UpgradeInfos
        this.load.image('tower2Upgrade1', 'assets/sprites/UpgradeInfoT2.png');
        this.load.image('tower2Upgrade2', 'assets/sprites/UpgradeInfoT2-2.png');
        this.load.image('tower2Upgrade1F', 'assets/sprites/UpgradeInfoT2F.png');
        this.load.image('tower2Upgrade2F', 'assets/sprites/UpgradeInfoT2-2-F.png');
        //Tower3UpgradeInfos
        this.load.image('tower3Upgrade1', 'assets/sprites/UpgradeInfoT3.png');
        this.load.image('tower3Upgrade2', 'assets/sprites/UpgradeInfoT3-2.png');
        this.load.image('tower3Upgrade1F', 'assets/sprites/UpgradeInfoT3F.png');
        this.load.image('tower3Upgrade2F', 'assets/sprites/UpgradeInfoT3-2-F.png');
        //Tower4UpgradeInfos
        this.load.image('tower4Upgrade1', 'assets/sprites/UpgradeInfoT4.png');
        this.load.image('tower4Upgrade2', 'assets/sprites/UpgradeInfoT4-2.png');
        this.load.image('tower4Upgrade1F', 'assets/sprites/UpgradeInfoT4F.png');
        this.load.image('tower4Upgrade2F', 'assets/sprites/UpgradeInfoT4-2-F.png');
        //Hover-Info

        this.load.image('HoverInfo','assets/sprites/HoverTowers.png');
        this.load.image('backgroundT','assets/sprites/backgroundT.png');
        this.load.image('HoverInfo', 'assets/sprites/HoverTowers.png');
        this.load.image('Exit', 'assets/sprites/exit.png');
        this.load.image('Premium', 'assets/sprites/premium_1.png');

        this.load.image('Quit', 'assets/sprites/quit_to_main_menu.png');
        this.load.image('Return', 'assets/sprites/return_to_the_game.png');

        this.load.image('DiamondInfo', 'assets/sprites/DiamondInfo.png');
        this.load.image('nextWave', 'assets/sprites/next_wave.png');
        this.load.image('menuB', 'assets/sprites/menu.png');
        this.load.image('UpgradeT', 'assets/sprites/upgrade.png');
        this.load.image('Sell', 'assets/sprites/sell.png');
        //Enemies
        this.load.spritesheet('player', 'assets/sprites/spaceman.png', 16, 16);


    },

    create: function () {
        // When init and preload is done, switch immediately to preload state
        this.state.start('Preloader');
    }
};
