// Canvas width and height
var canvasWidth = 1024;
var canvasHeight = 768;


// Namespace for audio
// Initialize empty arrays holding sound and music keys in order to distinguish them for muting.
var Audio = {
    menuMusicKeys: [],
    menuSoundKeys: [],

    gameMusicKeys: [],
    gameSoundKeys: [],

    musicIsMuted: true,
    soundIsMuted: false,

    musicVolume: 1,
    soundVolume: 0.3
};


// Instantiate the player object
var player = new Player();


// Namespace for game menu
var Menu = {
    levelSelector: 0                //Levelselector variable
};


// Namespace for game
var Game = {};


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

        //Dummy text in order to load font right now
        this.add.text(-100, - 100, ' ', {font: "22px MenuFont"});


    },

    preload: function () {
        // Load background for preloader and loading bar
        this.load.image('preloaderBackground', 'assets/menu/menuBG2.png');
        this.load.image('menuLoadingBar', 'assets/menu/menuBar_loading.png');

        //SPIELDATEN FÜR HELPERKLASSE
        //Towers
        this.load.spritesheet('towerTest', 'assets/sprites/tower.png', 64, 64, 1);
        this.load.spritesheet('ArcherTower', 'assets/sprites/Tower_Archer.png', 64, 64, 52);
        this.load.spritesheet('SpearmanTower', 'assets/sprites/Tower_Spearman.png', 64, 64, 32);

        this.load.spritesheet('tower', 'assets/sprites/block.png', 32, 32);
        this.load.spritesheet('tower1', 'assets/sprites/tower_1.png');
        this.load.spritesheet('tower2Text', 'assets/sprites/tower_2.png');
        this.load.spritesheet('tower2', 'assets/sprites/tower2.png', 32, 32);
        this.load.spritesheet('tower3', 'assets/sprites/tower3.png', 32, 32);
        this.load.spritesheet('tower4', 'assets/sprites/Tower4.png', 32, 32);
        this.load.spritesheet('tower4Text', 'assets/sprites/tower_4.png');
        this.load.spritesheet('tower3Text', 'assets/sprites/tower_3.png');
        //Bullets
        this.load.spritesheet('noBullet', 'assets/sprites/empty_bullet.png', 8, 8);
        this.load.spritesheet('arrow', 'assets/sprites/arrow16.png', 16, 16);
        this.load.spritesheet('bullet', 'assets/sprites/bullet.png', 8, 8);
        this.load.spritesheet('bullet2', 'assets/sprites/slime.png', 14, 14);
        this.load.spritesheet('bullet3', 'assets/sprites/bullet3.png');
        this.load.spritesheet('bullet4', 'assets/sprites/bullet4.png');
        //Elemente obere Leiste
        this.load.spritesheet('xpBar2', 'assets/sprites/xpBar2.png');
        this.load.spritesheet('xpBar', 'assets/sprites/xpBar.png');
        this.load.spritesheet('heart', 'assets/sprites/heart.png');
        this.load.spritesheet('diamond', 'assets/sprites/diamond.png');
        this.load.spritesheet('coin', 'assets/sprites/coin.png');
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

        this.load.image('Quit', 'assets/menu/quit.png');
        this.load.image('Return', 'assets/menu/return.png');

        this.load.image('DiamondInfo', 'assets/sprites/DiamondInfo.png');
        this.load.image('nextWave', 'assets/sprites/next_wave.png');
        this.load.image('menuB', 'assets/sprites/menu.png');
        this.load.image('UpgradeT', 'assets/sprites/upgrade.png');
        this.load.image('Sell', 'assets/sprites/sell.png');
        //Enemies
        this.load.spritesheet('player', 'assets/sprites/spaceman.png', 16, 16);
        this.load.spritesheet('newEnemy1', 'assets/enemies_new/sprite_enemy1.png',64,64);
        this.load.spritesheet('newEnemy2', 'assets/enemies_new/sprite_enemy2.png',64,64);
        this.load.spritesheet('newEnemy3', 'assets/enemies_new/sprite_enemy3.png',64,64);
        this.load.spritesheet('newEnemy4', 'assets/enemies_new/sprite_enemy4.png',64,64);
        this.load.spritesheet('newEnemy5', 'assets/enemies_new/sprite_enemy5.png',64,64);

    },

    create: function () {
        // When init and preload is done, switch immediately to preload state
        this.state.start('Preloader');
    }
};
