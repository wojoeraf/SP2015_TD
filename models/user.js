var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var userSchema = new Schema({

    local: {
        email: {type: String, required: true, unique: true},
        username: {type: String, required: true, unique: true},
        password: {type: String, required: true},
        created_at: Date,
        updated_at: Date,
        last_login: Date
    }
});


userSchema.pre('save', function (next) {
    var currentDate = new Date();
    this.updated_at = currentDate;

    // if first save (so fresh created user) set created_at also
    if (!this.created_at)
        this.created_at = currentDate;

    next();
});

// create a model using the schema
var User = mongoose.model('User', userSchema);

// make this available to users in node application
module.exports = User;