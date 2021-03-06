
/**
 * The player class holds player relevant information
 * @class
 */

Player = function () {

    /**
     * The players username.
     * @member Player {string}
     */
    this.name = null;

    /**
     * The players email address
     * @member Player {string}
     */
    this.email = null;

    /**
     * This value is true, when player is logged in.
     * @member Player {boolean}
     */
    this.loggedIn = false;

    /**
     * This value holds the number of diamanods the player owns.
     * @member Player {number}
     */
    this.diamonds = 1;

    /**
     * The achievements array
     * @member Player {array}
     */
    this.achievements = [];

    /**
     * The highscores array
     * @member Player {array}
     */
    this.highscores = [];

    /**
     * The last game object.
     * Contains data like number of build towers etc.
     * @member Player {array}
     */
    this.lastGame = {
        canceled: true,
        won: false,
        level: 0,
        score: 0,
        towersBuild: 0,
        towersSold: 0,
        mobsKilled: 0,
        useedPremiumactions: 0
    };

};

Player.prototype = {

    /**
     * Load the player data from ajax responses in player object.
     * Note that this function sets the player as logged in, except the optional
     * argument loggedIn is passed.
     * @param {Object} data - The data to load into the player object.
     * @param {boolean} [var='true'] loggedIn - Wheter the player is set to logged in or not.
     */
    loadData: function(data, loggedIn) {
        if (typeof loggedIn !== 'undefined') {
            this.loggedIn = loggedIn;
        } else {
            this.loggedIn = true;
        }
        this.name = data.local.username;
        this.email = data.local.email;
        this.diamonds = data.diamonds;
        this.achievements = data.achievements;
        this.highscores = data.highscores;
    }

};