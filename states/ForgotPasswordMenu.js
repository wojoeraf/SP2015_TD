Menu.ForgotPasswordMenu = function () {
    this.fp = new FormProcessing();
    this.helper = new Helper.Menu(this);
};

Menu.ForgotPasswordMenu.prototype = {

    create: function () {

        // Add menu background
        this.add.sprite(0, 0, 'menuBG');

        // Show forgot password form
        this.fp.showForgotPasswordForm();

        // Add buttons and change anchors to center in order to easy align them in the middle of screen
        this.add.button(canvasWidth / 2, 450, 'buttonSendRequest', this.request, this).anchor.setTo(0.5, 0.5);
        this.helper.placeBackButton(this.goBack);
    },


    update: function () {

    },


    // Send request callback
    request: function () {
        this.fp.hideForgotPasswordForm();
        this.state.start("RegisterMenu");
    },


    goBack: function () {
        this.fp.hideForgotPasswordForm();
        this.state.start("LoginMenu");
    }
};