Menu.RankingMenu = function () {

    this.helper = new Helper.Menu(this);
    this.fp = new FormProcessing();

};

Menu.RankingMenu.prototype = {

    create: function () {

        // Add background
        this.add.sprite(0, 0, 'menuBG');

        this.buildHighscore(0);


        // Add buttons
        this.buttonMusic = this.helper.placeMusicButton(this.musicToggle);
        this.buttonSound = this.helper.placeSoundButton(this.soundToggle);
        this.helper.placeBackButton(this.back);

        //Adding text and buttons
        this.add.sprite(437, 200, 'buttonRanking');
        this.add.button(275, 300, 'rankingEasyBright', this.showEasy, this);
        this.add.button(475, 300, 'rankingMedium', this.showMedium, this);
        this.add.button(675, 300, 'rankingHard', this.showHard, this);

        //Show the table
        this.fp.showRankingTable();
    },

    update: function () {

    },


    //Show the best players on the easy map
    showEasy: function () {
        this.buildHighscore(0);
        this.add.button(275, 300, 'rankingEasyBright', this.showEasy, this);
        this.add.button(475, 300, 'rankingMedium', this.showMedium, this);
        this.add.button(675, 300, 'rankingHard', this.showHard, this);
        this.helper.playSound('menuClick');

    },

    //Show the best players on the medium map
    showMedium: function () {
        this.buildHighscore(1);
        this.add.button(275, 300, 'rankingEasy', this.showEasy, this);
        this.add.button(475, 300, 'rankingMediumBright', this.showMedium, this);
        this.add.button(675, 300, 'rankingHard', this.showHard, this);
        this.helper.playSound('menuClick');

    },

    //Show the best players on the hard map
    showHard: function () {
        this.buildHighscore(2);
        this.add.button(275, 300, 'rankingEasy', this.showEasy, this);
        this.add.button(475, 300, 'rankingMedium', this.showMedium, this);
        this.add.button(675, 300, 'rankingHardBright', this.showHard, this);
        this.helper.playSound('menuClick');

    },

    buildHighscore: function (level) {

        console.log("building highscore for level " + level);

        var data = {
            difficulty: level
        };

        $(function () {

            $.ajax({
                method: 'post',
                url: 'highscoreTable',
                dataType: 'JSON',
                data: data
            }
                ).always(function (data, status, err) {
                //Place scores into the correct table


            });
        });


    },

    buildHighscore1: function () {

    },

    // Go back
    back: function () {
        this.helper.playSound('menuClick');
        this.state.start("MainMenu");
        this.fp.hideRankingTable();
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
