Menu.ForgotPasswordMenu = function () {
    this.fp = new FormProcessing();
    this.helper = new Helper.Menu(this);
    this.sendBtn;
};

Menu.ForgotPasswordMenu.prototype = {

    create: function () {

        // Add menu background
        this.add.sprite(0, 0, 'menuBG');

        // Show forgot password form
        this.fp.showForgotPasswordForm();

        // Add buttons and change anchors to center in order to easy align them in the middle of screen
        this.sendBtn = this.add.button(canvasWidth / 2, 470, 'buttonSendRequest', this.request, this);
        this.sendBtn.anchor.setTo(0.5, 0.5);

        //Standardbuttons
        this.helper.placeBackButton(this.back);
        this.buttonMusic = this.helper.placeMusicButton(this.musicToggle);
        this.buttonSound = this.helper.placeSoundButton(this.soundToggle);
    },


    update: function () {

    },


    // Send request callback
    request: function () {
        this.helper.playSound('menuClick');
        var outerThis = this;

        $(function () {
            var email = $("input[name=forgotPWdEmail]").val();

            //Do some validation
            if (email === '') {
                $("#responseForgotPW").html('Enter an email address.');
                $("#responseForgotPW").removeClass('positive neutral').addClass('negative');
                return false;
            } else if (!validator.isEmail(email)) {
                $("#responseForgotPW").html("Invalid email address.");
                $("#responseForgotPW").removeClass('positive neutral').addClass('negative');
                return false;
            }

            $("#responseForgotPW").html('Please wait...');
            $("#responseForgotPW").removeClass('negative positive').addClass('neutral');

            var data = {
                email: email
            };

            $.ajax({
                method: 'post',
                url: '/forgotPW',
                dataType: 'json',
                data: data
            }).done(function (data, status) {
                //this.fp.hideChangePWForm();
                outerThis.helper.debugLog('Status: ' + status, outerThis);
                outerThis.helper.debugLog('Returned data: ' + JSON.stringify(data), outerThis);

                //Password changed successfully
                $("#responseForgotPW").html(data.message);
                $("#responseForgotPW").addClass('positive').removeClass('negative neutral');

                //Destroy send button
                outerThis.sendBtn.destroy();
            }).fail(function (data, status, err) {
                outerThis.helper.debugLog('Status: ' + status, outerThis);
                outerThis.helper.debugLog('Error: ' + err, outerThis);
                outerThis.helper.debugLog('Returned data: ' + JSON.stringify(data.responseJSON), outerThis);

                var message = data.responseJSON.message;
                $("#responseForgotPW").html(message);
                $("#responseForgotPW").addClass('negative').removeClass('positive neutral');
            });
            return false;
        });
    },


    back: function () {
        this.helper.playSound('menuClick');
        this.fp.hideForgotPasswordForm();
        this.state.start("LoginMenu");
    },


    musicToggle: function () {
        this.helper.toggleMusic(this.buttonMusic);
    },


    soundToggle: function () {
        this.helper.toggleSound(this.buttonSound);
    }
};