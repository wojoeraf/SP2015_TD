/**
 * Created by Felix on 07.05.15.
 */

BasicGame.LoginMenu = function(game){
  this.loginButton = null;
  this.cwlButton = null;
  this.fpButton = null;
  this.registerButton=null;
}


BasicGame.LoginMenu.prototype = {

    create: function(){


        this.add.sprite(0, 0, 'titlepage');
        this.add.sprite(360, 350, 'loginText');
        this.loginButton = this.add.button(250, 550, 'loginButton', this.login, this);
        this.cwlButton = this.add.button(250, 610, 'cwlButton', this.goMain, this);
        this.fpButton = this.add.button(420, 555, 'fpButton', this.forgotPassword, this);
        this.registerButton = this.add.button(420, 575, 'registerButton', this.register, this);
    },


    update: function(){

        //this.state.start("MainMenu")




    },

    login: function (){
        //Login-Logik
        this.state.start("MainMenu");
    },

    goMain: function(){
        //kein Logik -> Hauptmenü
        this.state.start("MainMenu");
    },

    forgotPassword: function(){

        //Passwort vergessen

    },

    register: function(){
        //Neu-Registrierung -> Weiterleitung zum RegisterMenu
        this.state.start("RegisterMenu");
    }


};