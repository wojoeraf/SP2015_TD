/**
 * @author Rafael W�rner
 * @file
 * This file contains some helping classes e.g. to hide form elements easily {@link Helper} or placing back buttons in
 * the menu {@link Helper.Menu}
 */

/**
 * The helper module
 * @module Helper
 */

/**
 * Helper Namespace
 * @namespace Helper
 */
var Helper = {};

/**
 * The HTML Helper class provides functions to easily hide HTML elements etc.
 * @class
 */

Helper.Html = function () {

};

Helper.Html.prototype = {

    /**
     * Hide a HTML element. This method just adds the CSS <code>invisible</code> class to the element.
     * @param selector {string} - The jQuery select string, e.g. '#myID'
     */
    hideElement: function (selector) {
        $(selector).addClass("invisible");
    },

    /**
     * Show a HTML element. This method just removes the CSS <code>invisible</code> class from the element.
     * @param selector {string} - The jQuery select string, e.g. '#myID'
     */
    showElement: function (selector) {
        $(selector).removeClass("invisible");
    }

};


/**
 * This class provides some functions which simplifies menu coding.
 * @class
 */

Helper.Menu = function (game) {
    this.game = game;

    // For developing set this to true, otherwise false.
    this.debug = true;
};

Helper.Menu.prototype = {

    /**
     * Log a message in the console for debuging purpose.
     * @param {string} string - The debug message.
     */
    debugLog: function(string, outer) {
        var str = '';
        if (typeof outer !== 'undefined')
            str += '[' + outer.key + '] ';
        if (this.debug) console.log(str + string);
    },

    /**
     * Place the back button every time on the same place.
     * @param {function} callback - The callback function for the button.
     */
    placeBackButton: function (callback) {
        var btn = this.game.add.button(100, canvasHeight - 80, 'buttonBack', callback, this.game);
        btn.anchor.setTo(0, 1);
        return btn;
    },

    /**
     * Place the back button every time on the same place.
     * @param {function} callback - The callback function for the button.
     */
    placeLogoutButton: function (callback) {
        var btn = this.game.add.button(100, canvasHeight - 80, 'buttonLogout', callback, this.game);
        var text = this.game.add.text(100, canvasHeight - 115, player.name, {font: "25px MenuFont"});
        text.addColor('#ddd', 0);
        text.anchor.setTo(Math.round(text.width * 0.5) / text.width, Math.round(text.height * 0.5) / text.height);
        btn.anchor.setTo(Math.round(btn.width * 0.5) / btn.width, Math.round(btn.height * 0.5) / btn.height);
        return btn;
    },

    /**
     * Place the music button every time on the same place.
     * @param {function} callback - The callback function for the button.
     */
    placeMusicButton: function (callback) {
        var btn = this.game.add.button(canvasWidth - 100, canvasHeight - 80, 'buttonMusic', callback, this.game);
        btn.anchor.setTo(1, 1);
        btn.scale.setTo(0.75, 0.75);
        btn.frame = Audio.musicIsMuted ? 1 : 0;
        return btn;
    },

    /**
     * Place the sound button every time on the same place.
     * @param {function} callback - The callback function for the button.
     */
    placeSoundButton: function (callback) {
        var btn = this.game.add.button(canvasWidth - 150, canvasHeight - 80, 'buttonSound', callback, this.game);
        btn.anchor.setTo(1, 1);
        btn.scale.setTo(0.6, 0.6);
        btn.frame = Audio.soundIsMuted ? 1 : 0;
        return btn;
    },

    /**
     * Start or stop music depending on whether it is playing or not
     * @param btn {Phaser.Button} - The music button whose frame have to be toggled.
     */
    toggleMusic: function (btn) {
        // Start menu music
        if (Audio.musicIsMuted) {
            this.game.sound.stopAll();
            this.game.sound.play(Audio.menuMusicKeys[0]);
        }
        // Stop menu music
        else {
            this.game.sound.stopAll();
        }

        // Toggle boolean and btn
        Audio.musicIsMuted = !Audio.musicIsMuted;
        this.toggleButtonFrame(Audio.musicIsMuted, btn);

        // Play menu click sound
        if (!Audio.soundIsMuted) this.game.sound.play('menuClick', Audio.soundVolume);
    },

    /**
     * Mute or unmute sounds depending on whether they are muted or not.
     * @param btn {Phaser.Button} - The sound button whose frame have to be toggled.
     */
    toggleSound: function(btn) {
        // Toggle boolean
        Audio.soundIsMuted = !Audio.soundIsMuted;

        // Play menu click sound
        if (!Audio.soundIsMuted) this.game.sound.play('menuClick', Audio.soundVolume);

        // Toggle btn frame
        this.toggleButtonFrame(Audio.soundIsMuted, btn);
    },

    playSound: function(key, vol, loop) {
        var volume = vol;
        if (volume === undefined)
            volume = Audio.soundVolume;
        if (!Audio.soundIsMuted) {
            this.game.sound.play(key, volume, loop);
        }
    },

    /**
     * Toggle the frame of the sound button
     * @param bool
 * @param btn {Phaser.Button} - The sound button whose frame have to be toggled.
     */
    toggleButtonFrame: function (bool, btn) {
        btn.frame = bool ? 1 : 0;
    }
};