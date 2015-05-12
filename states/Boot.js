// Canvas width and height
var canvasWidth = 1024;
var canvasHeight = 768;

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
