/**
 * @author Rafael Wörner
 */

/**
 * The FormProcessing class provides methods to process the forms which appear in the menu.
 * @class
 */

FormProcessing = function () {
    this.helper = new Helper.Html();
    this.helperMenu = new Helper.Menu();

    // username regex
    var regexUsername = /[A_Za-z0-9_]/g;

    // extend validator
    validator.extend('isUsername', function(str) {
        var bool = regexUsername.test(str);
        return str.length >= 20 ? false : bool;
    });
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
    },

    /**
     * Shows the googleCaptcha for getting Diamonds
     */
    showCaptcha: function () {
        this.helper.showElement("#captcha_container");
    },

    /**
     * Shows the googleCaptcha for getting Diamonds
     */
    hideCaptcha: function () {
        this.helper.hideElement("#captcha_container");
    },

    showSettings: function () {
        this.helper.showElement("#settingsMenu");
    },

    hideSettings: function () {
        this.helper.hideElement("#settingsMenu");
    },

    showPopup: function () {
        this.helper.showElement("#popupSlider");
    },

    hidePopup: function () {
        this.helper.hideElement("#popupSlider");
    },

    logout: function() {
        var ret = false;
        var helper = this.helperMenu;
        $(function () {
            var data = {
                username: player.name
            };
            $.ajax({
                method: 'get',
                url: '/logout',
                type: 'json',
                data: data
            }).always(function (data, status, err) {
                helper.debugLog('Unable to login\nResponse:\n' + JSON.stringify(data, null, 4) + '\nstatus: ' + status + '\nerror message: ' + err);
                if (data.success === true) {
                    helper.debugLog('User successfully logged out.');
                    $(".userInfo").html("");
                    ret = true
                } else {
                    helper.debugLog('Error while logging out.');
                }
            });
            return false;
        });
        return ret;
    },

    validate: function (username, email, password, confirm) {
        var ret = {success: true, message: ''};
        if (username !== undefined && !validator.isUsername(username)) {
            ret.success = false;
            ret.message = 'Username contains illegal characters. (Use only letters, numbers and underscores.)';
            return ret;
        }
        if (email !== undefined && !validator.isEmail(email)) {
            ret.success = false;
            ret.message = 'Illegal email address.';
            return ret;
        }
        if (password !== confirm) {
            ret.success = false;
            ret.message = 'Your password confirmation fails. Check again.';
            return ret;
        }
        return ret
    }


};