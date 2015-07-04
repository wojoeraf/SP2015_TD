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

        //Add the "not achieved" sprites for all achievements

        this.add.sprite(200, 300, 'not_achieve1');
        this.add.sprite(300, 300, 'not_achieve2');
        this.add.sprite(400, 300, 'not_achieve3');
        this.add.sprite(200, 400, 'not_achieve4');
        this.add.sprite(300, 400, 'not_achieve5');
        this.add.sprite(400, 400, 'not_achieve6');
        this.add.sprite(200, 500, 'not_achieve7');
        this.add.sprite(300, 500, 'not_achieve8');
        this.add.sprite(400, 500, 'not_achieve9');

        //If the player is logged in the for loop draws the buttons for the achievements the player has achieved
        if (player.loggedIn) {
            for (i = 0; i < player.achievements.length; i++) {
                var achieveId = player.achievements[i];
                console.log("drawing achievement" + i);
                var text = "achieve" + player.achievements[i];
                xCoord = 200 + ((achieveId-1) % 3) * 100;
                yCoord = 0;
                if (achieveId == 1 || achieveId == 2 || achieveId == 3) {
                    yCoord = 300;
                }
                else if (achieveId == 4 || achieveId == 5 || achieveId == 6) {
                    yCoord = 400;
                }
                else {
                    yCoord = 500;
                }
                console.log("adding achievement nr " + i);
                this.addButton(xCoord, yCoord, player.achievements[i]);

            }
        }


        /**
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
         **/

    },

    update: function () {

    },

    // Changing the displayed achievement text
    displayAchievement: function (achieveID) {
        console.log("displaying achievement Text for achievement nr. " + achieveID);
        this.helper.playSound('menuClick');

        var key = "achieveText" + achieveID;
        this.add.sprite(549, 300, key);


    },

    addButton: function (x, y, id) {
        console.log("adding button " + id);
        var text = "achieve" + id

        this.add.button(x, y, text, function () {
            this.displayAchievement(id)
        }, this);

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
