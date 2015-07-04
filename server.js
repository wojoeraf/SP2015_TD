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
var https = require('https');
var util = require('util');

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

//app.use(function(req, res, next) {
//    console.log(req.session);
//    next();
//});

app.post('/checkSession', function (req, res, next) {
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

app.post('/login', function (req, res, next) {
    passport.authenticate('local-login', function (err, user, info) {
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

app.post('/signup', function (req, res, next) {
    passport.authenticate('local-signup', function (err, user, info) {
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
            return res.json(user).end();
        });
    })(req, res, next);

});

//Listener for the captcha verification
app.post('/verify', function (req, res1, next) {
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

    //Method to verify the response
    verifyRecaptcha(response, playername, captchaCallback);

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

                    captchaCallback(parsedData.success, playername);
                    res1.send(true);
                } catch (e) {
                    //response false
                    captchaCallback(false, playername);
                    res1.send(false);
                }
            });
        });
    });


    //test end


});

//Listener for new entrys to the highscore table
app.post('/highscore', function (req, res1) {

    HighscoreModel.save({'local.username': "username"}, function(err, data, log){
            console.log(err);
            console.log(data);
            console.log(log);
        }
    );


    var input = JSON.stringify(req.body);
    console.log(input);
    var array = input.split(',');

    var user = array[0].split(':');
    var username = user[1].substring(1, user[1].length - 1);
    var field = array[1].split(':');
    console.log("Username is: " + username);

    var type = field[0].substring(1, field[0].length - 1);
    var score = field[1].substring(1, field[1].length - 2);

    console.log("type is: " + type);
    console.log("score is: " + score);

    if (type === "scoreh1") {
        type = "h1";

    }
    else if (type === "scoreh2") {
        type = "h2";

    } else (type === "scoreh3")
    {
        type = "h3";

    }
    console.log("type: " + type);

    HighscoreModel.find({'local.username': 'username'},
        function (err, log, data) {
            console.log(err);
            console.log(log);
            console.log(data);
        });

    //HighscoreModel.findOne({});


});

//Probably an obsolete function
function verifyRecaptcha(key, playername, callback) {

    console.log("key: " + key);
    console.log("username: " + playername);


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

        https.get("https://www.google.com/recaptcha/api/siteverify?secret=" + SECRET + "&response=" + key, function (res) {
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

                    callback(parsedData.success, playername);
                    console.log("returning true");
                    return "a";
                } catch (e) {
                    //response false
                    callback(false, playername);
                    console.log("returning false");
                    return false;
                }
            });
        });

    });


};

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
};

//Function that increments the diamond count of the user with the name 'username' by one
function incrementDiamonds(username) {
    console.log("incrementDiamonds");

    //The first pair of curly brackets contains the selector, the second one the update instruction
    UserModel.update({'local.username': username}, {$inc: {'local.diamonds': 1}},
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

};

//Function that decrements the diamond count of the player with name 'username' by one
function decrementDiamonds(username) {
    console.log("decrementDiamonds");

    //The first pair of curly brackets contains the selector, the second one the update instruction
    UserModel.update({'local.username': username}, {$inc: {'local.diamonds': -1}},
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
});
