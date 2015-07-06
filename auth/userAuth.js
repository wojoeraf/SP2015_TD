/**
 * Created by Chris on 15.06.2015.
 */
// configuring passport
var User = require('../models/user');
var func = require('./functions');
var LocalStrategy = require('passport-local').Strategy;
var validator = require('validator');

module.exports = function (passport) {

    // username regex
    var regexUsername = /^\w{2,20}$/;

    // extend validator
    validator.extend('isUsername', function(str) {
        var bool = regexUsername.test(str);
        return str.length > 20 ? false : bool;
    });

    // passport need serialization for sessions
    passport.serializeUser(function (user, done) {
        done(null, {username: user.local.username, _id: user._id});
    });


    // passport need deserialization for sessions
    passport.deserializeUser(function (sessionUser, done) {
       done(null, sessionUser);
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
                        return done(null, false, {message: 'User not found'});
                    }

                    // user exists but wrong password, log the error
                    if (!func.isValidPassword(user.local.password, password)) {
                        console.log('Invalid password!');
                        return done(null, false, {message: 'Invalid password'});
                    }

                    // user exists and password match
                    user.local.last_login = new Date();
                    return done(null, user, {message: 'User found.'});
                }
            );
        }));


    // signup logic
    passport.use('local-signup', new LocalStrategy({
                passReqToCallback: true
            },
            function (req, username, password, done) {
                var email = req.body.email;
                var confirmedPassword = req.body.confirmPassword;

                //console.log(req.body);
                //console.log('password: ' + password + '; confirm: ' + confirmedPassword);

                //validate input
                if (!validator.isEmail(email)) {
                    console.log('User email is not a valid email address.');
                    return done(null, false, {message: 'Email must be be a valid email address'});
                }
                if (!validator.isUsername(username)) {
                    console.log('Username is not valid');
                    return done(null, false, {message: 'Illegal username (2-20 characters)'});
                }
                if (!(password === confirmedPassword)) {
                    console.log('Password confirmation failed');
                    return done(null, false, {message: 'Password confirmation failed'});
                }

                var findOrCreateUser = function () {
                    User.findOne({ $or: [{'local.username': username}, {'local.email': email}]}, function (err, user) {
                        if (err) {
                            console.log('Error on signup!');
                            return done(err);
                        }

                        // user already exists
                        if (user) {
                            if (user.local.email === email) {
                                console.log('Email already exists');
                                return done(null, false, {message: 'Email already exists'});
                            }
                            if (user.local.username === username) {
                                console.log('Username already exists');
                                return done(null, false, {message: 'Username already exists'});
                            } else { // User exists, but neither email nor username equals (normally impossible).
                                console.log('Strange error.');
                                return done(null, false, {message: 'An error occurred'});
                            }
                        } else {
                            // user doesn't exist.
                            // create the user
                            var newUser = new User();
                            newUser.local.email = email;
                            newUser.local.username = username;
                            newUser.local.password = func.createHash(password);
                            var currentDate = new Date();
                            newUser.local.created_at = currentDate;
                            newUser.local.last_login = currentDate;
                            newUser.diamonds = 5;
                            newUser.achievements = [];
                            newUser.highscores.level1 = 0;
                            newUser.highscores.level2 = 0;
                            newUser.highscores.level3 = 0;

                            console.log("NewUser is: "+ newUser);

                            // save the user
                            newUser.save(function (err) {
                                if (err) {
                                    console.log('Error saving new user. Registration aborted!');
                                    console.log(err);
                                    return done(null, false, {message: 'An Database error occurred.'});
                                }
                                console.log('User Registration successful');
                                return done(null, newUser);
                            });
                        }
                    });
                };
                // Delay the execution of findOrCreateUser and execute the method in the next tick of the event loop
                process.nextTick(findOrCreateUser);
            })
    );
};