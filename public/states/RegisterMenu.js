Menu.RegisterMenu = function(){
    this.fp = new FormProcessing();
    this.helper = new Helper.Menu(this);

};

Menu.RegisterMenu.prototype = {

    create: function(){

        // Add background
        this.add.sprite(0, 0, 'menuBG');

        // Show register form
        this.fp.showRegisterForm();

        // Add buttons
        this.add.button(canvasWidth/2, 600, 'buttonRegister', this.registration, this).anchor.setTo(0.5, 0.5);
        this.helper.placeBackButton(this.goBack);
    },


    update: function(){

    },


    registration: function(){
        this.helper.playSound('menuClick');
        var outerThis = this;

        $(function () {
            var username = $("input[name=registerUsername]").val();
            var email = $("input[name=registerEmail]").val();
            var password = $("input[name=registerPassword]").val();
            var confirmPassword = $("input[name=registerConfirmPassword]").val();

            //Validate the input on client side (server side validates too)
            var valid = outerThis.fp.validate(username, email, password, confirmPassword);
            if (valid.success === false) {
                $("#responseRegister").html(valid.message);
                return false;
            }

            var data = {
                username: username,
                email: email,
                password: password,
                confirmPassword: confirmPassword
            };

            $.ajax({
                method: 'post',
                url: '/signup',
                dataType: 'json',
                data: data
            }).done(function (data, status) {
                outerThis.fp.hideRegisterForm();
                outerThis.helper.debugLog('Status: ' + status, outerThis);
                outerThis.helper.debugLog('Returned data: ' + JSON.stringify(data), outerThis);

                //assigning the database entries to the corresponding fields of the player
                player.loadData(data);

                //Start MainMenu
                outerThis.state.start("MainMenu");
            }).fail(function (data, status, err) {
                player.loggedIn = false;
                outerThis.helper.debugLog('Status: ' + status, outerThis);
                outerThis.helper.debugLog('Error: ' + err, outerThis);
                outerThis.helper.debugLog('Returned data: ' + JSON.stringify(data.responseJSON), outerThis);

                var message = data.responseJSON.message;
                $("#responseRegister").html(message);
            });
            return false;
        });
    },


    goBack : function(){
        this.helper.playSound('menuClick');
        this.fp.hideRegisterForm();
        this.state.start("LoginMenu");
    }

};