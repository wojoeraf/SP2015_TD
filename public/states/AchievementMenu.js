Menu.AchievementMenu = function () {

    this.helper = new Helper.Menu(this);
    this.fp = new FormProcessing();
    this.achievementBtns = [];
    this.popup = undefined;

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
        //this.add.sprite(549, 300, 'achieveEmpty');

        //Add the "not achieved" sprites for all achievements
        var half = canvasWidth /2;
        this.add.sprite(half - 100, 350, 'not_achieve1').anchor.setTo(0.5, 0.5);
        this.add.sprite(half, 350, 'not_achieve2').anchor.setTo(0.5, 0.5);
        this.add.sprite(half + 100, 350, 'not_achieve3').anchor.setTo(0.5, 0.5);
        this.add.sprite(half - 100, 450, 'not_achieve4').anchor.setTo(0.5, 0.5);
        this.add.sprite(half, 450, 'not_achieve5').anchor.setTo(0.5, 0.5);
        this.add.sprite(half + 100, 450, 'not_achieve6').anchor.setTo(0.5, 0.5);
        this.add.sprite(half - 100, 550, 'not_achieve7').anchor.setTo(0.5, 0.5);
        this.add.sprite(half, 550, 'not_achieve8').anchor.setTo(0.5, 0.5);
        this.add.sprite(half + 100, 550, 'not_achieve9').anchor.setTo(0.5, 0.5);

        //If the player is logged in the for loop draws the buttons for the achievements the player has achieved
        var xCoord;
        var yCoord;
        if (player.loggedIn) {
            for (var i = 0; i < player.achievements.length; i++) {
                var achieveId = player.achievements[i];
                console.log("i: " + i + ', achievement: ' + achieveId);
                xCoord = (half - 100) + ((achieveId - 1) % 3) * 100;
                yCoord = 0;
                if (achieveId == 1 || achieveId == 2 || achieveId == 3) {
                    yCoord = 350;
                }
                else if (achieveId == 4 || achieveId == 5 || achieveId == 6) {
                    yCoord = 450;
                }
                else {
                    yCoord = 550;
                }
                this.achievementBtns[i] = this.add.sprite(xCoord, yCoord, 'achieve' + achieveId);
                this.achievementBtns[i].anchor.setTo(0.5, 0.5);
            }
        }

        var outerThis = this;
        this.achievementBtns.forEach(function(current) {
            //current.anchor.setTo(1, 0.5);
            current.inputEnabled = true;
            current.events.onInputOver.add(outerThis.over, outerThis);
            current.events.onInputOut.add(outerThis.out, outerThis);
            current.events.onInputDown.add(outerThis.out, outerThis);
            current.events.onInputUp.add(outerThis.out, outerThis);
        });
    },

    update: function () {

    },

    over: function(sprite) {
        // Get achievement number
        var index = parseInt(sprite.key.substring(7, 8), 10) - 1;

        // Display achievement description in a popup
        this.popup = this.world.add(new popupFrame(this,
            sprite.x - 75,
            sprite.y + 25,
            225,
            Achievements.index[index])
        );
    },

    out: function() {
        if (this.popup !== undefined)
            this.popup.destroy();
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