/**
 * Main node file. Server starts here.
 */

// Set this while developing to true. For deployment make it false:
var debug = true;

var port = process.env.PORT || 3012;

var express = require('express');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var dbConfig = require('./db');
var mongoose = require('mongoose');
var UserModel = require('./models/user');
var HighscoreModel = require('./models/highscores.js');
var authFuncs = require('./auth/functions');
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var https = require('https');
var util = require('util');
var async = require('async');
var crypto = require('crypto');

var fs = require('fs');
var path = require('path');

var app = express();

// connect to the database
mongoose.connect(dbConfig.url);

app.use(express.static(__dirname));
app.use(express.static(__dirname + '/public'));

app.use(logger('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// passport and session stuff
var passport = require('passport');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
app.use(session({
    store: new MongoStore({
        mongooseConnection: mongoose.connection,
        ttl: 2 * 60 * 60 // Session expiration
    }),
    secret: '%@b<%L2zF:/n.x+A7("hq>Dom{$QlS|A',
    resave: false,              // don't save session if unmodified
    saveUninitialized: false,    // don't create session until something stored
    cookie: {maxAge: 2 * 60 * 60 * 1000}
}));
app.use(passport.initialize());
app.use(passport.session());
var initPassport = require('./auth/userAuth');
initPassport(passport);

app.post('/checkSession', function (req, res) {
    util.log('Checking for active session:\nmethod: ' + req.method + '\nurl: ' + req.url);
    var response = {bool: false, message: 'no session', user: undefined};
    var status = 200;
    //console.log('Session passport user: ' + req.session.passport.user.username);
    //console.log(req.session.passport.user);
    if (!req.session.passport.user) {
        res.status(status).json(response).end();
    } else {
        var username = req.session.passport.user.username;
        UserModel.findOne({$or: [{'local.username': username}, {'local.email': username}]},
            function (err, user) {
                if (err) {
                    status = 500;
                    response.message = 'Session error';
                    res.status(status).json(response).end();
                }

                // user does not exist
                if (!user) {
                    console.log('Session: User not found!');
                    status = 500;
                    response.message = 'Session error';
                    res.status(status).json(response).end();
                }

                // user exists
                response.message = 'session found';
                response.user = user;
                response.bool = true;
                res.status(status).json(response).end();
            });
    }
});

app.post('/signup', function (req, res, next) {
    passport.authenticate('local-signup', function (err, user, info) {
        console.log('Registering...');
        console.log(info);
        console.log('user is ' + typeof user + ' and has value: ' + user);
        if (user === false) {
            //return res.status(500).json({message: 'Failed to register user.'});
            return res.status(500).json(info).end();
        }
        if (err) {
            return res.status(500).json({message: err}).end();
        }
        if (!user) {
            //return res.status(401).json({message: 'Failed to register user...'});
            return res.status(500).json(info).end();
        }
        req.logIn(user, function (err) {
            if (err) {
                console.log('Registration successful but error on logging in with the new username.');
                return res.status(500).json({message: 'Registration successful but error on logging in with the new username.'}).end();
            }
            return res.status(200).json(user).end();
        });
    })(req, res, next);

});

app.post('/login', function (req, res, next) {
    passport.authenticate('local-login', function (err, user, info) {
        console.log('Logging in...');
        console.log(info);
        console.log('User has type ' + typeof user + ' and value ' + user);
        if (err) {
            return res.status(500).json({message: err}).end();
        }
        if (!user) {
            return res.status(500).json(info).end();
        }
        req.logIn(user, function (err) {
            if (err) {
                console.log('Error while trying to login');
                return res.status(500).json({message: 'Error while trying to login'}).end();
            }
            return res.status(200).json(user).end();
        });
    })(req, res, next);
});

app.post('/logout', function (req, res) {
    console.log('logging out...');
    //util.log(util.inspect(req));
    util.log('Request received: \nmethod: ' + req.method + '\nurl: ' + req.url);
    req.session.destroy(function (err) {
        if (err) {
            console.log('error while logging out: ' + err);
            res.status(500).json({message: 'Error while logging out: ' + err}).end();
        } else {
            res.status(200).json({message: 'Logged out successfully.'}).end();
            console.log('User successfully logged out.');
        }
    });
});

app.post('/changePW', function (req, res) {
    console.log('Changing PW...');

    var response = {bool: false, message: ''};
    var status = 200;

    var oldPW = req.body.oldPW;
    var newPW = req.body.newPW;
    var newPWConfirm = req.body.newPWConfirm;
    var username = req.body.username;

    console.log('Corresponding username: ' + username);
    console.log('Old PW: ' + oldPW);

    // Check wether new passowrd and new password confirmation equals
    if (!(newPW === newPWConfirm)) {
        console.log('ChangePW: Password confirmation failed.');
        status = 200;
        response.message = 'Password confirmation failed.';
        res.status(status).json(response).end();
    }

    // Search for user in db
    UserModel.findOne({'local.username': username},
        function (err, user) {
            if (err) {
                status = 500;
                response.message = 'Error on finding user.';
                res.status(status).json(response).end();
            }

            // user does not exist
            if (!user) {
                console.log('ChangePW: User not found.');
                status = 500;
                response.message = 'User not found';
                res.status(status).json(response).end();
            }

            // user exists
            async.series([
                function (callback) {
                    // Check whether old password matches with db
                    if (!authFuncs.isValidPassword(user.local.password, oldPW)) {
                        console.log('ChangePW: Invalid old password!');
                        status = 500;
                        response.message += 'Invalid old password';
                        res.status(status).json(response).end();
                        callback(status);
                    } else {
                        callback(null);
                    }
                },
                function (callback) {
                    // Update old password with new one
                    user.local.password = authFuncs.createHash(newPW);
                    user.save(function (err, data) {
                        if (err) {
                            console.log('ChangePW: Error on saving new pw to db.');
                            console.log(data);
                            status = 500;
                            response.message += ", but couldn't save new pw. Try again.";
                            res.status(status).json(response).end();
                            callback(status);
                        }

                        // Success. Now finish.
                        console.log('Password updated successfully.');
                        response.message = "Password updated successfully.";
                        response.bool = true;
                        res.status(status).json(response).end();
                        callback(null);
                    });
                }
            ], function (err) {
                console.log('ChangePW: async error: ' + err);
            });
        });
});

app.post('/forgotPW', function (req, res) {
    console.log('Forgot Password request started...');

    var response = {bool: false, message: ''};
    var status = 200;

    var email = req.body.email;

    console.log('Given email address: ' + email);

    // Search for user in db
    UserModel.findOne({'local.email': email},
        function (err, user) {
            if (err) {
                status = 500;
                response.message = 'Error on finding user.';
                return res.status(status).json(response).end();
            }

            // user does not exist
            if (!user) {
                console.log('ForgotPW: User not found.');
                status = 500;
                response.message = 'No user with given email address exists.';
                return res.status(status).json(response).end();
            }

            var newPW = '';

            // user exists
            async.series([
                // Create new Password
                function (done) {
                    crypto.randomBytes(8, function (err, buf) {
                        newPW = buf.toString('hex');
                        console.log('ForgotPW: New password: ' + newPW);
                        done(err);
                    });
                },

                // Save and send new password
                function (callback) {
                    //Write new hashed pw to user in db
                    user.local.password = authFuncs.createHash(newPW);

                    //Save to db
                    user.save(function (err, data) {
                        if (err) {
                            console.log('ForgotPW: Error on saving new pw to db.');
                            console.log(data);
                            status = 500;
                            response.message = "Can't save new password.";
                            //res.status(status).json(response).end();
                            callback(status);
                        } else {
                            console.log('ForgotPW: Password updated successfully.');
                            response.message = 'ForgotPW: Password updated successfully.';
                            response.bool = true;
                            //res.status(status).json(response).end();
                            callback(null);
                        }
                    });
                },

                // Send email to user
                function (callback) {
                    //Prepare transport
                    var options = {
                        port: 587,
                        host: 'mail.gmx.net',
                        //secure: true,
                        auth: {
                            user: 'MedievalTD@gmx.de',
                            pass: 'swp-2015TD$'
                        }
                    };
                    var transporter = nodemailer.createTransport(smtpTransport(options));

                    // Email text string
                    var text = 'You have requested to reset your password.\nYour new password is:\n\n';
                    text += newPW;
                    text += '\n\nGo ahead and login with your new password and change it in the settings menu.';
                    text += '\n\nYour Medieval TD team.';

                    // Prepare mail
                    var mailOptions = {
                        from: 'Medieval TD <MedievalTD@gmx.de>',
                        to: user.local.email,
                        subject: 'Medieval TD Password reset',
                        text: text
                    };

                    // Send email
                    transporter.sendMail(mailOptions, function (err, info) {
                        if (err) {
                            console.log('ForgotPW: Error on sending email to user.');
                            //console.log(info.response);
                            status = 500;
                            response.message = "Can't send email.";
                            //res.status(status).json(response).end();
                            callback(status);
                        } else {
                            console.log('ForgotPW: Email send successfully.');
                            console.log('ForgotPW: info response: ' + info.response);
                            response.message = 'Email was send. Check your inbox';
                            response.bool = true;
                            //res.status(status).json(response).end();
                            callback(null);
                        }
                    });
                }
            ], function (err) {
                if (err) {
                    console.log('ForgotPW: async error: ' + err);
                }
                return res.status(status).json(response).end();
            });
        });
});

//Listener for the captcha verification
app.post('/verify', function (req, res1) {

    console.log(req);

    var name = req.body.playername;
    var response = req.body.gresponse;

    /**
     //extracts the response from the google api from the recieved JSON Object
     var out = JSON.stringify(req.body);
     //Split by '#' to sperate the different elements of the request message
     var data = out.split("#");

     //We need to cut of the first characters of the string because for some reason it contains {" , a sequence that is neither desired nor needed
    var response = "";
    for (var i = 2; i < data[0].length; i++) {
        response = response + out[i];
    }

    //Extract the playername from the JSON object
    var playername = data[1].substring(0, data[1].length - 5);
    //console.log("playername: " + playername);
    **/


    //Integrated the old verifyRecaptcha function into the post listener
    var filePath = path.join(__dirname, 'config.txt');
    var SECRET = "toast";
    //Initialize the stuff necessary to read the secret from the config
    fs.readFile(filePath, 'utf8', function (err, data) {
        if (err) {
            return console.log(err);
        }
        //split the config line by line to be able to extract the desired info
        var config = data.split('#');

        //secret gets parsed
        SECRET = config[1].substring(0);

        //Verify the recieved key via the google servers
        https.get("https://www.google.com/recaptcha/api/siteverify?secret=" + SECRET + "&response=" + response, function (res) {
            var data = "" +
                "";
            res.on('data', function (chunk) {
                data += chunk.toString();
            });
            res.on('end', function () {
                try {
                    //Gets called if the captcha was verified correctly and nothing else went wrong
                    var parsedData = JSON.parse(data);
                    console.log(parsedData);

                    captchaCallback(parsedData.success, name);
                    res1.send(true);
                } catch (e) {
                    //response false
                    captchaCallback(false, name);
                    res1.send(false);
                }
            });
        });
    });


    //test end


});

app.post('/achievements', function(req, res){
    console.log(req.body);

    var name = req.body.name;
    var achieve = [1];
    console.log(name);
    console.log(achieve);

    UserModel.update({'local.username': name}, {$set: {'achievements': achieve}},
        function (err, log, data) {
            if (err) {
                status = 500;
                response.message = 'Session error';
                console.log("Database Error!");
            }

            // user does not exist
            if (!log) {
                console.log('Session: User not found!');
                status = 500;
            }
            console.log("user found!");
            //console.log(log);
            //console.log(err);
            //console.log(data);
        });

});

//Listener for new entrys to the highscore table
app.post('/highscore', function (req, res) {
    var status = 200;

    var username = req.body.username;
    console.log('Username: ' + username);
    var score = req.body.score;
    console.log('Score: ' + score);
    var level = req.body.level;
    console.log('Level: ' + level);

    UserModel.findOne({'local.username': username}, function (err, user) {
        if (err) {
            console.log('Highscores error: ' + err);
            status = 500;
            return res.status(status).json({message: 'Error on db query.'}).end();
        }

        //User not found
        if (!user) {
            console.log('Highscores: User not found');
            status = 500;
            return res.status(status).json({message: 'User not found.'}).end();
        }

        //User found
        //Compare highscore with score and decide what to do
        var levelselector = "level" + level;
        var highscores = "";
        if (level == 1) {
            highscores = user.highscores.level1;
        }
        else if (level == 2) {
            highscores = user.highscores.level2;
        }
        else {
            highscores = user.highscores.level3;
        }

        if (highscores !== 'undefined' && highscores > score) {
            //last score is not a new highscore, so save nothing to db
            console.log('Highscores: Last score is no highscore.');
            return res.status(status).json({message: 'Last score is no highscore.'}).end();

        } else if (highscores !== 'undefined') {
            //Last score is a new highscore. So save it for the corresponding level
            console.log('Highscores: Last score IS a highscore.');
            console.log('Old highscore: ' + highscores + ' new highscore: ' + score);

            //user.highscores.levelselector.set(score);
            /**
             UserModel.update({'local.username': username}, {$set:{'highscores.level1': score}}, function (err, data) {
                console.log(data);
                console.log(err);
            });
             **/

            if (level == 1) {
                UserModel.update({'local.username': username}, {$set: {'highscores.level1': score}}, function (err, data) {
                    console.log(err);
                    console.log(data);
                    console.log("level1");

                });
            }
            else if (level == 2) {
                UserModel.update({'local.username': username}, {$set: {'highscores.level2': score}}, function (err, data) {
                    console.log(err);
                    console.log(data);
                    console.log("level2");

                });
            }
            else if (level == 3) {
                UserModel.update({'local.username': username}, {$set: {'highscores.level3': score}}, function (err, data) {
                    console.log(err);
                    console.log(data);
                    console.log("level3");

                });
            }
            else {
                console.log('Error saving new highscore: something wrong with level numbering.');
            }


            user.save(function (err) {
                if (err) {
                    console.log('Error saving new highscore: ' + err);
                    status = 500;
                    return res.status(status).json({message: 'Error saving new highscore.'}).end();
                }
                console.log('Highscore updated.');
                return res.status(status).json({message: 'Highscore updated.'}).end();
            });

        } else {
            console.log('Error saving new highscore: something wrong with level numbering.');
            status = 500;
            return res.status(status).json({message: 'Error saving new highscore.'}).end();
        }
    });


    //HighscoreModel.save({'local.username': "username"}, function(err, data, log){
    //        console.log(err);
    //        console.log(data);
    //        console.log(log);
    //    }
    //);
    //
    //
    //var input = JSON.stringify(req.body);
    //console.log(input);
    //var array = input.split(',');
    //
    //var user = array[0].split(':');
    //var username = user[1].substring(1, user[1].length - 1);
    //var field = array[1].split(':');
    //console.log("Username is: " + username);
    //
    //var type = field[0].substring(1, field[0].length - 1);
    //var score = field[1].substring(1, field[1].length - 2);
    //
    //console.log("type is: " + type);
    //console.log("score is: " + score);
    //
    //if (type === "scoreh1") {
    //    type = "h1";
    //
    //}
    //else if (type === "scoreh2") {
    //    type = "h2";
    //
    //} else (type === "scoreh3")
    //{
    //    type = "h3";
    //
    //}
    //console.log("type: " + type);
    //
    //HighscoreModel.find({'local.username': 'username'},
    //    function (err, log, data) {
    //        console.log(err);
    //        console.log(log);
    //        console.log(data);
    //    });
    //
    ////HighscoreModel.findOne({});


});

app.post('/highscoreTable', function (req, res) {

    console.log("Server here, recieving data");
    console.log(req.body);
    var level = req.body.difficulty;

    /**
     UserModel.find({}, function (err, data) {
        console.log("error: " + err);
        console.log(data);
    });
     **/

    if (level == 1) {
        UserModel.find({}, {'_id': 0, 'local.username': 1, 'highscores.level1': 1}, function (err, data) {
            console.log("err " + err);
            console.log("data: " + data);
            res.send(data);

        }).sort({'highscores.level1': -1}).limit(5);

    }
    else if (level == 2) {
        UserModel.find({}, {'_id': 0, 'local.username': 1, 'highscores.level2': 1}, function (err, data) {
            console.log("err " + err);
            console.log("data: " + data);
            res.send(data);

        }).sort({'highscores.level2': -1}).limit(5);

    }
    else if (level == 3) {
        UserModel.find({}, {'_id': 0, 'local.username': 1, 'highscores.level3': 1}, function (err, data) {
            console.log("err " + err);
            console.log("data: " + data);
            res.send(data);

        }).sort({'highscores.level3': -1}).limit(5);

    }
    else {
        console.log("Invalid level given, cannot build highscore");
    }


    /**
     UserModel.find({},{'local.username': 1, 'highscores.level1': 1}, ({$sort: {'highscores.level1': -1}}), function (err, data) {
        console.log("err " + err);
        console.log("data: " + data);
        //console.log(data.length);
    });
     **/

});

app.post('/decrement', function (req, res) {
    var name = req.body.name;
    console.log(name);
    decrementDiamonds(name);

});

function captchaCallback(value, name) {
    //Method that manages the diamond awarding
    console.log("callback called. argument: " + value);
    if (value) {
        console.log(name + " will recieve some diamonds");
        incrementDiamonds(name);

    }
    else {
        console.log(name + " will recieve no diamonds :(");
    }
}

//Function that increments the diamond count of the user with the name 'username' by one
function incrementDiamonds(username) {
    console.log("incrementDiamonds");
    console.log("username: " + username);

    //The first pair of curly brackets contains the selector, the second one the update instruction
    UserModel.update({'local.username': username}, {$inc: {'diamonds': 1}},
        function (err, log, data) {
            if (err) {
                status = 500;
                response.message = 'Session error';
                console.log("Database Error!");
            }

            // user does not exist
            if (!log) {
                console.log('Session: User not found!');
                status = 500;
            }
            //console.log("user found!");
            //console.log(log);
        });
}

//Function that decrements the diamond count of the player with name 'username' by one
function decrementDiamonds(username) {
    console.log("decrementDiamonds");

    //The first pair of curly brackets contains the selector, the second one the update instruction
    UserModel.update({'local.username': username}, {$inc: {'diamonds': -1}},
        function (err, log, data) {
            if (err) {
                status = 500;
                response.message = 'Session error';
                console.log("Database Error!");
            }

            // user does not exist
            if (!log) {
                console.log('Session: User not found!');
                status = 500;
            }
            console.log("user found!");
            console.log(log);
        });

};

app.listen(port, function () {
    console.log('App is listening on port ' + port);
})
