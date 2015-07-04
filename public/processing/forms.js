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
    var regexUsername = /^\w{2,20}$/;

    // extend validator
    validator.extend('isUsername', function(str) {
        var bool = regexUsername.test(str);
        return str.length > 20 ? false : bool;
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
     * Shows the change password form.
     */
    showChangePWForm: function () {
        this.helper.showElement("#changePWArea");
    },

    /**
     * Hides the change password form.
     */
    hideChangePWForm: function () {
        this.helper.hideElement("#changePWArea");
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

    logout: function(outerThis) {
        var ret = false;
        var helper = this.helperMenu;
        helper.debugLog('Logging out...');
        $(function () {
            $.ajax({
            method: 'post',
            url: '/logout',
            dataType: 'json',
            data: {}
        }).done(function (data, status, err) {
                helper.debugLog('Status: ' + status, outerThis);
                helper.debugLog('Returned data: ' + JSON.stringify(data), outerThis);
            }).fail(function (status, err) {
                helper.debugLog('Status: ' + status, outerThis);
                helper.debugLog('Error: ' + err, outerThis);
                helper.debugLog('Returned data: ' + JSON.stringify(data.responseJSON), outerThis);
            });
            return false;
        });
        return ret;
    },

    validate: function (username, email, password, confirm) {
        var ret = {success: true, message: ''};
        if (username === '' || email === '' || password === '' || confirm === '') {
            ret.success = false;
            ret.message = 'Missing some stuff... Review your input.';
            return ret;
        }
        if (username !== undefined && !validator.isUsername(username)) {
            ret.success = false;
            ret.message = 'Illegal username (2-20 characters)';
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