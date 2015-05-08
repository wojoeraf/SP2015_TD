/**
 * Created by Felix on 07.05.15.
 */


BasicGame.RegisterMenu = function(game){

    this.registerButton2 = null;
    this.backButton2 = null;

}


BasicGame.RegisterMenu.prototype = {

    create: function(){


        this.add.sprite(0, 0, 'titlepage');
        this.add.sprite(355,350, 'registrationText');
        this.registerButton2 = this.add.button(380,650, 'registerButton2',this.registration, this, 'buttonOver','buttonOut', 'buttonOver');
        this.backButton2 = this.add.button(20,720, 'backButton2',this.goBack2, this, 'buttonOver','buttonOut', 'buttonOver');


    },


    update: function(){

        //this.state.start("MainMenu")




    },
    registration: function(){

    },

    goBack2 : function(){
        this.state.start("LoginMenu");
    }

};