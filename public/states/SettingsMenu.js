Menu.SettingsMenu = function () {

    this.helper = new Helper.Menu(this);
    this.fp = new FormProcessing();
    this.btnChangePW = undefined;
};

Menu.SettingsMenu.prototype = {

    create: function () {

        //Titlebild, Settings-Text und Soundvolume+MusicVolume-Schriftzug hinzufügen
        this.add.sprite(0, 0, 'menuBG');
        //Add text
        this.add.sprite(431, 230, 'volumeMusic');
        this.add.sprite(431, 370, 'volumeSound');

        if (player.loggedIn) {
            this.btnChangePW = this.add.button(canvasWidth / 2, 540, 'changePW', this.changePW, this);
            this.btnChangePW.anchor.setTo(0.5, 0.5);
        }

        //Show the sliders
        this.fp.showSettings();

        //Standardbuttons
        this.helper.placeBackButton(this.back);
        this.buttonMusic = this.helper.placeMusicButton(this.musicToggle);
        this.buttonSound = this.helper.placeSoundButton(this.soundToggle);
    },


    update: function () {
        //Get volume
        Audio.musicVolume = $( "#popupMusic" ).slider( "option", "value" );
        Audio.soundVolume = $( "#popupSound" ).slider( "option", "value" );
        this.game.sound.volume = Audio.musicVolume;

        //Set sliders
        $("#sliderMusic").slider('value', Audio.musicVolume);
        $("#sliderSound").slider('value',Audio.soundVolume);
    },

    changePW: function() {
        this.helper.playSound('menuClick');
        this.fp.hideSettings();
        this.fp.showChangePWForm();
        this.btnChangePW.destroy();
        this.btnChangePW = this.add.button(canvasWidth/2, 540, 'confirm', this.confirm, this);
        this.btnChangePW.anchor.setTo(0.5, 0.5);;
    },

    confirm: function() {
        this.helper.playSound('menuClick');
        var outerThis = this;

        $(function () {
            var oldPW = $("input[name=changePWOldPassword]").val();
            var newPW = $("input[name=changePWNewPassword]").val();
            var newPWConfirm = $("input[name=changePWNewPasswordConfirm]").val();

            //All fields set?
            if (oldPW === '' || newPW === '' || newPWConfirm === '') {
                $("#responseChangePW").html('Missing some stuff... Review your input.');
                $("#responseChangePW").removeClass('positive').addClass('negative');
                return false;
            } else if (newPW !== newPWConfirm) {
                $("#responseChangePW").html("New password and confirmation don't fit.");
                $("#responseChangePW").removeClass('positive').addClass('negative');
                return false;
            }

            var data = {
                username: player.name,
                oldPW: oldPW,
                newPW: newPW,
                newPWConfirm: newPWConfirm
            };

            $.ajax({
                method: 'post',
                url: '/changePW',
                dataType: 'json',
                data: data
            }).done(function (data, status) {
                //this.fp.hideChangePWForm();
                outerThis.helper.debugLog('Status: ' + status, outerThis);
                outerThis.helper.debugLog('Returned data: ' + JSON.stringify(data), outerThis);

                //Password changed successfully
                $("#responseChangePW").html('Password successfully changed.');
                $("#responseChangePW").addClass('positive').removeClass('negative');

                //Empty fields
                $("input[name=changePWOldPassword]").val('');
                $("input[name=changePWNewPassword]").val('');
                $("input[name=changePWNewPasswordConfirm]").val('');

                //Destroy confirm button
                outerThis.btnChangePW.destroy();
            }).fail(function (data, status, err) {
                outerThis.helper.debugLog('Status: ' + status, outerThis);
                outerThis.helper.debugLog('Error: ' + err, outerThis);
                outerThis.helper.debugLog('Returned data: ' + JSON.stringify(data.responseJSON), outerThis);

                var message = data.responseJSON.message;
                $("#responseChangePW").html(message);
                $("#responseChangePW").addClass('negative').removeClass('positive');
            });
            return false;
        });
    },

    // Go back
    back: function () {
        this.helper.playSound('menuClick');
        $("#responseChangePW").html('');
        this.fp.hideChangePWForm();
        this.fp.hideSettings();
        this.state.start("MainMenu");
    },

    musicToggle: function () {
        this.helper.toggleMusic(this.buttonMusic);
    },


    soundToggle: function () {
        this.helper.toggleSound(this.buttonSound);
    }
};






