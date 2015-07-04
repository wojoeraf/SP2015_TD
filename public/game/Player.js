
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

    this.diamonds = 1;

};

Player.prototype = {


};