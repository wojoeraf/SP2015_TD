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
        this.add.button(canvasWidth / 2 - 100, 500, 'buttonLogin', this.login, this).anchor.setTo(0.5, 0.5);
        this.add.button(canvasWidth / 2 + 100, 500, 'buttonSkip', this.skip, this).anchor.setTo(0.5, 0.5);
        this.buttonMusic = this.helper.placeMusicButton(this.musicToggle);
        this.buttonSound = this.helper.placeSoundButton(this.soundToggle);

    },


    update: function () {

    },


    // Login button callback
    login: function () {
        this.helper.playSound('menuClick');
        var state = this;

        $(function () {
            var data = {
                username: $("input[name=username]").val(),
                password: $("input[name=password]").val()
            };
            $.ajax({
                method: 'post',
                url: '/login',
                type: 'json',
                data: data
            }).done(function (data, status, err) {
                player.loggedIn = true;
                player.name = data.local.username;
                player.email = data.local.email;
                $(".userInfo").html("<p>Welcome " + data.local.username + "</p>");
                state.state.start("MainMenu");
                state.fp.hideLoginForm();
                state.helper.debugLog('Player ' + player.name + ' successfully logged in.');
            }).fail(function (data, status, err) {
                player.loggedIn = false;
                state.helper.debugLog('Unable to login\nResponse:\n' + JSON.stringify(data, null, 4) + '\nstatus: ' + status + '\nerror message: ' + err);
                $(".userInfo").html("<p>Login error</p>");
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