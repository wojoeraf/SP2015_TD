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
        this.add.sprite(549, 300, 'achieveEmpty');


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

    },

    update: function () {

    },

    // Changing the displayed achievement text
    displayAchievement: function (achieveID) {
        this.helper.playSound('menuClick');

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
