/**
 * Created by Chris on 15.06.2015.
 */
// configuring passport
var User = require('../models/user');
var LocalStrategy = require('passport-local').Strategy;

module.exports = function (passport) {


    // passport need serialization for sessions
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });


    // passport need deserialization for sessions
    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });


    // login logic
    passport.use('local-login', new LocalStrategy({
            passReqToCallback: true
        },
        function (req, username, password, done) {
            // check if user with email or username exists
            User.findOne({$or: [{'local.username': username}, {'local.email': username}]},
                function (err, user) {
                    if (err) return done(err);

                    // user does not exist
                    if (!user) {
                        console.log('User not found!');
                        return done(null, false, {message: 'User not found.'});
                    }

                    // user exists but wrong password, log the error
                    if (!isValidPassword(user, password)) {
                        console.log('Invalid password!');
                        return done(null, false, {message: 'Invalid password.'});
                    }

                    // user exists and password match
                    var currentDate = new Date();
                    user.local.last_login = currentDate;
                    return done(null, user);
                }
            );
        }));

    var isValidPassword = function (user, password) {
        return password === user.local.password ? true : false;
        // return bCrypt.compareSync(password, user.password);
    };


    // signup logic
    passport.use('local-signup', new LocalStrategy({
                passReqToCallback: true
            },
            function (req, username, password, done) {
                findOrCreateUser = function () {
                    // look for user in db
                    var email = req.param('email');
                    User.findOne({'local.username': username, 'local.email': email}, function (err, user) {
                        if (err) {
                            console.log('Error on signup!');
                            return done(err);
                        }

                        // user already exists
                        // TODO Unterscheidung ob email oder username schon existiert
                        if (user) {
                            console.log('User already exists');
                            return done(null, false, {message: 'User already exists.'});
                        } else {
                            // user doesn't exist.
                            // create the user
                            var newUser = new User();
                            newUser.local.email = email;
                            newUser.local.username = username;
                            newUser.local.password = password; //TODO Hash password
                            var currentDate = new Date();
                            newUser.local.created_at = currentDate;
                            newUser.local.last_login = currentDate;

                            // save the user
                            newUser.save(function (err) {
                                if (err) {
                                    console.log('Error saving new user. Registration aborted!');
                                    throw err;
                                }
                                console.log('User Registration succesful');
                                return done(null, newUser);
                            });
                        }
                    });
                };
                // Delay the excutioon of findOrCreateUser and execute the method in the next tick of the event loop
                process.nextTick(findOrCreateUser);
            })
    );
};