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
        this.fp.hideRegisterForm();

        var fp = this.fp;

        $(function () {
            var username = $("input[name=registerUsername]").val();
            var email = $("input[name=registerEmail]").val();
            var password = $("input[name=registerPassword]").val();
            var confirmPassword = $("input[name=registerConfirmPassword]").val()

            //validation of input is made server side

            var data = {
                username: username,
                email: email,
                password: password,
                confirmPassword: confirmPassword
            };
            $.ajax({
                method: 'post',
                url: '/signup',
                type: 'json',
                data: data
            }).done(function (data, status, err) {
                //console.log(JSON.stringify(data, null, 4));
                //console.log(status);
                //console.log(err);
                console.log('Registration successful.');
                //$(".inhalt").html("Welcome " + data.local.username);
                $(".inhalt").html(data.message);
            }).fail(function (data, status, err) {
                console.log('Registration failed.');
                $(".resp").html("Registration failed.");
            });
            return false;
        });

        player.loggedIn = true;
        this.state.start("MainMenu");
    },


    goBack : function(){
        this.fp.hideRegisterForm();
        this.state.start("LoginMenu");
    }

};