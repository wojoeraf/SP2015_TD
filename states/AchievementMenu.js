Menu.AchievementMenu = function () {

    this.helper = new Helper.Menu(this);

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

        //Looks like the numpad of a cellphone at the moment
        this.add.button(200, 300, 'achieve1', this.displayAchievement, this);
        this.add.button(300, 300, 'achieve2', this.displayAchievement, this);
        this.add.button(400, 300, 'achieve3', this.displayAchievement, this);
        this.add.button(200, 400, 'achieve4', this.displayAchievement, this);
        this.add.button(300, 400, 'achieve5', this.displayAchievement, this);
        this.add.button(400, 400, 'achieve6', this.displayAchievement, this);
        this.add.button(200, 500, 'achieve7', this.displayAchievement, this);
        this.add.button(300, 500, 'achieve8', this.displayAchievement, this);
        this.add.button(400, 500, 'achieve9', this.displayAchievement, this);

    },

    update: function () {

    },

    // Changing the displayed achievement text
    displayAchievement: function (data) {
        this.helper.playSound('menuClick');

        //TODO Code for displaying the selected achievement

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
