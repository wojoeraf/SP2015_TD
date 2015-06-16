/**
 * Created by Chris on 15.06.2015.
 */
var express = require('express');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var dbConfig = require('./db');
var mongoose = require('mongoose');
var https = require('https');

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
app.use(expressSession({secret: 'mySecretKey'}));
app.use(passport.initialize());
app.use(passport.session());
var initPassport = require('./auth/userAuth');
initPassport(passport);

app.post('/login', function (req, res, next) {

    passport.authenticate('local-login', function (err, user, info) {
        console.log(info);
        console.log(typeof user);
        if (err) {
            res.status(500).json(error);
        }
        if (!user) {
            res.status(401).res.json(info.message);
        }
        req.logIn(user, function (err) {
            if (err) {
                console.log('something wrong2!');
            }
            return res.json(user);
        });
    })(req, res, next);

});

app.post('/verify', function (req, res, next) {
    //extracts the response from the google api from the recieved JSON Object
    var out = JSON.stringify(req.body);
    var response = "";
    for (var i = 2; i < out.length - 5; i++) {
        response = response + out[i];
    }
    //console.log("built string: " + response);

    //Method to verify the response
    verifyRecaptcha(response, captchaCallback);

});

function verifyRecaptcha(key, callback) {

    var filePath = path.join(__dirname, 'config');
    var SECRET = "toast";
    //Initialize the stuff to read the secret from the config
    fs.readFile(filePath, 'utf8', function (err, data) {
        if (err) {
            return console.log(err);
        }
        //split the config line by line to be able to extract the desired info
        var config = data.split('#');

        //secret gets parsed
        SECRET = config[1].substring(0);
        //console.log("secret: " + SECRET);

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


};

function getSecret() {

}

function captchaCallback(value) {
    //dostuff
    //console.log("callback called. argument: " + value);
}

app.listen(3012);
