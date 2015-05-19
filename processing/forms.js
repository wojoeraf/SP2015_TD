/**
 * @author Rafael Wörner
 */

/**
 * The FormProcessing class provides methods to process the forms which appear in the menu.
 * @class
 */

FormProcessing = function () {
    this.helper = new Helper.Html();
};

FormProcessing.prototype = {

    /**
     * Hides the login form.
     */
    hideLoginForm: function () {
        this.helper.hideElement("#loginArea");
    },

    /**
     * Shows the login form.
     */
    showLoginForm: function () {
        this.helper.showElement("#loginArea");
    },

    /**
     * Hides the register form.
     */
    hideRegisterForm: function () {
        this.helper.hideElement("#registerArea");
    },

    /**
     * Shows the register form.
     */
    showRegisterForm: function () {
        this.helper.showElement("#registerArea");
    },

    /**
     * Hides the forgot password form.
     */
    hideForgotPasswordForm: function () {
        this.helper.hideElement("#forgotPasswordArea");
    },

    /**
     * Shows the forgot password form.
     */
    showForgotPasswordForm: function () {
        this.helper.showElement("#forgotPasswordArea");
    },


    /**
     * Shows the ranking table
     */
    showRankingTable: function () {
        this.helper.showElement("#rankingTable");
    },

    /**
     * Hides the ranking table
     */
    hideRankingTable: function () {
        this.helper.hideElement("#rankingTable");
    }


};