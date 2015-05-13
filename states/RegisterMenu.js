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
        this.state.start("MainMenu");
    },


    goBack : function(){
        this.fp.hideRegisterForm();
        this.state.start("LoginMenu");
    }

};