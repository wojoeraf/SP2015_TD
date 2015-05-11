var BasicGame = {};

BasicGame.Boot = function (game) {

};

BasicGame.Boot.prototype = {

    // init ist die Erste Funktion die automatisch aufgerufen wird sobald der State 'Boot' von der index.html aufgerufen wird
    init: function () {

        //  Multi-Touch austellen
        this.input.maxPointers = 1;

        //  Wenn Tab in dem das Spiel geöffnet ist nicht mehr im Fokus ist, stoppt das Spiel nicht, sondern läuft weiter
        this.stage.disableVisibilityChange = true;

        if (this.game.device.desktop) {
            //Spiel auf PC-> Settings
            this.scale.pageAlignHorizontally = true;
        }
        else {
            //Mobile-Settings -> Auflösung anpassen/ändern
            this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.scale.setMinMax(480, 260, 1024, 768);
            this.scale.forceLandscape = true;
            this.scale.pageAlignHorizontally = true;
        }
    },

    // Sobald 'init' komplett durchgelaufen ist wird preload aufgerufen. Anschließend 'create'
    preload: function () {
        //Laden der Dateien, die beim Preloader angezeigt werden sollen
        //Hintergrund und LOADING-Text
        this.load.image('preloaderBackground', 'images/menu/menuBG2.png');
        this.load.image('preloaderBar', 'images/preloadr_bar.png');

    },

    create: function () {
        //Preloader-Dateien (aus preload) sind im Cache geladen, nun Aufruf vom state Preloader
        this.state.start('Preloader');
    }

};
