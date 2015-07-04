Menu.LoginMenu = function () {
    this.helper = new Helper.Menu(this);
    this.fp = new FormProcessing();

    this.buttonMusic = null;
    this.buttonSound = null;
};

Menu.LoginMenu.prototype = {

    init: function () {
        // Pause game when game tab looses focus
        this.stage.disableVisibilityChange = true;
    },

    create: function () {

        // Add menu background
        this.add.sprite(0, 0, 'menuBG');

        // Show up login form
        this.fp.showLoginForm();

        // Add buttons and change anchors to center in order to easy align them in the middle of screen
        this.add.button(canvasWidth / 2 - 100, 530, 'buttonLogin', this.login, this).anchor.setTo(0.5, 0.5);
        this.add.button(canvasWidth / 2 + 100, 530, 'buttonSkip', this.skip, this).anchor.setTo(0.5, 0.5);
        this.buttonMusic = this.helper.placeMusicButton(this.musicToggle);
        this.buttonSound = this.helper.placeSoundButton(this.soundToggle);

    },


    update: function () {

    },


    // Login button callback
    login: function () {
        this.helper.playSound('menuClick');
        this.helper.debugLog('Logging in...', this);
        var outerThis = this;

        $(function () {
            var username = $("input[name=username]").val();
            var password = $("input[name=password]").val();

            var data = {
                username: username,
                password: password
            };

            $.ajax({
                method: 'post',
                url: '/login',
                dataType: 'json',
                data: data
            }).done(function (data, status) {
                outerThis.fp.hideLoginForm();
                outerThis.helper.debugLog('Status: ' + status, outerThis);
                outerThis.helper.debugLog('Returned data: ' + JSON.stringify(data), outerThis);

                //assigning the database entries to the corresponding fields of the player
                player.loadData(data);

                //Empty response
                $("#responseLogin").html('');

                //Start MainMenu
                outerThis.state.start("MainMenu");
            }).fail(function (data, status, err) {
                player.loggedIn = false;
                outerThis.helper.debugLog('Status: ' + status, outerThis);
                outerThis.helper.debugLog('Error: ' + err, outerThis);
                outerThis.helper.debugLog('Returned data: ' + JSON.stringify(data.responseJSON), outerThis);

                var message = data.responseJSON.message;
                $("#responseLogin").html(message);
            });
            return false;
        });
    },


    // Skip button callback
    skip: function () {
        this.helper.playSound('menuClick');
        this.fp.hideLoginForm();
        player.loggedIn = false;
        this.state.start("MainMenu");
    },


    musicToggle: function () {
        this.helper.toggleMusic(this.buttonMusic);
    },


    soundToggle: function () {
        this.helper.toggleSound(this.buttonSound);
    }
};