/**
 * Created by Chris on 04.07.2015.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var highscoreSchema = new Schema({

    username: {type: String, required: true, unique: true},
    highscores: [Number]
});

//Create a model using the schema
var Highscore = mongoose.model('Highscore', highscoreSchema);

//make this available to users in node application
module.exports = Highscore;