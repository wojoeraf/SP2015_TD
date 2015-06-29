Menu.BuyMenu = function () {

    this.helper = new Helper.Menu(this);
    this.fp = new FormProcessing();

};

Menu.BuyMenu.prototype = {

    create: function () {



        // Add background and text
        this.add.sprite(0, 0, 'menuBG');

        // Add Buy buttons and text
        this.add.sprite(412, 200, 'buyText');
        this.add.button(187, 285, 'buy1', this.buy1, this);
        this.add.button(412, 285, 'buy2', this.buy2, this);
        this.add.button(637, 285, 'buy3', this.buy3, this);
        this.add.sprite(94, 545, 'freeDiamonds');

        // Add helper buttons
        this.buttonMusic = this.helper.placeMusicButton(this.musicToggle);
        this.buttonSound = this.helper.placeSoundButton(this.soundToggle);
        this.helper.placeBackButton(this.back);

        //Show the captcha
        this.fp.showCaptcha();

    },

    update: function () {

    },

    buy1: function () {
        //Code for processing the Buy request to paypal and stuff
        this.helper.playSound('menuClick');

    },

    buy2: function () {
        //Code for processing the Buy request to paypal and stuff
        this.helper.playSound('menuClick');

    },

    buy3: function () {
        //Code for processing the Buy request to paypal and stuff
        this.helper.playSound('menuClick');

    },

    // Go back
    back: function () {
        this.fp.hideCaptcha();
        this.helper.playSound('menuClick');
        this.state.start("MainMenu");
    },

    // Toggle music
    musicToggle: function () {
        this.helper.toggleMusic(this.buttonMusic);
    },

    // Toggle sound
    soundToggle: function () {
        this.helper.toggleSound(this.buttonSound);
    }
};
