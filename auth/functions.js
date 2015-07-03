var bCrypt = require('bcrypt-nodejs');

module.exports = {
    createHash: function(password){
        return bCrypt.hashSync(password, bCrypt.genSaltSync(10));
    },


    isValidPassword: function(givenPassword, password){
        return bCrypt.compareSync(password, givenPassword);
    }
}