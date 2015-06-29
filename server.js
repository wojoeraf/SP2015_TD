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
var expressSession = require('express-session');
var MongoStore = require('connect-mongo')(expressSession);
app.use(expressSession({store: new MongoStore({ mongooseConnection: mongoose.connection }),
                        secret: '%@b<%L2zF:/n.x+A7("hq>Dom{$QlS|A',
                        resave: false,
                        saveUninitialized: false}));
app.use(passport.initialize());
app.use(passport.session());
var initPassport = require('./auth/userAuth');
initPassport(passport);

app.post('/login', function (req, res, next) {
    passport.authenticate('local-login', function (err, user, info) {
        console.log(info);
        console.log(typeof user);
        if (err) {
            return res.status(500).json(error).end();
        }
        if (!user) {
            return res.status(401).json(info.message).end();
        }
        req.logIn(user, function (err) {
            if (err) {
                console.log('Error while trying to login');
                return res.json(err).end();
            }
            return res.json(user).end();
        });
    })(req, res, next);
});

app.get('/logout', function(req, res) {
    console.log('logging out...');
    //util.log(util.inspect(req));
    util.log('Request received: \nmethod: ' + req.method + '\nurl: ' + req.url)
    req.session.destroy(function(err) {
        if (err) {
            console.log('error while logging out: ' + err);
            res.status(500).json({success: true}).end();
        } else {
            res.json({success: true}).end();
            console.log('User successfully logged out.');
        }
    });
});

app.post('/signup', function (req, res, next) {
    passport.authenticate('local-signup', function (err, user, info) {
        console.log(info);
        console.log('user is ' + typeof user + ' and has value: ' + user);
        if (user === false) {
            return res.status(500).json({message: 'Failed to register user.'});
        }
        if (err) {
            return res.status(500).json({message: err});
        }
        if (!user) {
            return res.status(401).json({message: 'Failed to register user...'});
        }
        //req.logIn(user, function (err) {
        //    if (err) {
        //        console.log('something wrong2!');
        //    }
        //    return res.json(user);
        //});
    })(req, res, next);

});

app.post('/verify', function (req, res, next) {
    //extracts the response from the google api from the recieved JSON Object
    var out = JSON.stringify(req.body);
    var response = "";
    for (var i = 2; i < out.length - 5; i++) {
        response = response + out[i];
    }
    //Method to verify the response
    verifyRecaptcha(response, captchaCallback);

});

function verifyRecaptcha(key, callback) {

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
                    var parsedData = JSON.parse(data);
                    console.log(parsedData);
                    callback(parsedData.success);
                } catch (e) {
                    callback(false);
                }
            });
        });

    });


}

function captchaCallback(value) {
    //Method that awards the tiamonds
    console.log("callback called. argument: " + value);
}

app.listen(port, function() {
    console.log('App is listening on port ' + port);
});
