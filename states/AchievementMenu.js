Menu.AchievementMenu = function () {

    this.helper = new Helper.Menu(this);
    this.fp = new FormProcessing();

};

Menu.AchievementMenu.prototype = {

    create: function () {

        // Add background
        this.add.sprite(0, 0, 'menuBG');

        // Add buttons
        this.buttonMusic = this.helper.placeMusicButton(this.musicToggle);
        this.buttonSound = this.helper.placeSoundButton(this.soundToggle);
        this.helper.placeBackButton(this.back);

        //Add text and achievement buttons
        this.add.sprite(438, 200, 'text_achieve');
        //this.achievement = this.add.text(550, 300, "See your Achievements here");

        //Array which contains the achievements ATM not in use!
        //TODO decide which method for displaying the achievements is better!
        this.achieveText = [
            "text1",
            "text2",
            "text3",
            "text4",
            "text5",
            "text6",
            "text7",
            "text8",
            "text9"];

        //Looks like the numpad of a cellphone at the moment
        this.add.button(200, 300, 'achieve1', function () {
            this.displayAchievement(1)
        }, this);
        this.add.button(300, 300, 'achieve2', function () {
            this.displayAchievement(2)
        }, this);
        this.add.button(400, 300, 'achieve3', function () {
            this.displayAchievement(3)
        }, this);
        this.add.button(200, 400, 'achieve4', function () {
            this.displayAchievement(4)
        }, this);
        this.add.button(300, 400, 'achieve5', function () {
            this.displayAchievement(5)
        }, this);
        this.add.button(400, 400, 'achieve6', function () {
            this.displayAchievement(6)
        }, this);
        this.add.button(200, 500, 'achieve7', function () {
            this.displayAchievement(7)
        }, this);
        this.add.button(300, 500, 'achieve8', function () {
            this.displayAchievement(8)
        }, this);
        this.add.button(400, 500, 'achieve9', function () {
            this.displayAchievement(9)
        }, this);
        //this.add.button(400, 500, 'achieve9', function(){this.hideAchievement(this.achievement)}, this);

    },

    update: function () {

    },

    // Changing the displayed achievement text
    displayAchievement: function (achieveID) {
        this.helper.playSound('menuClick');

        //TODO Decide whether it is better to store the achievement texts in an array or import
        // them individually as sprites do draw them over the old achievement


        //this.achievement.destroy();
        //this.achievement = this.add.text(550, 300, this.achieveText[achieveID]);

        var key = "achieveText" + achieveID;
        this.add.sprite(549, 300, key);


    },

    // Go back
    back: function () {
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
