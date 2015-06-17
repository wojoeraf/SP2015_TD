/**
 * Created by Chris on 15.06.2015.
 */
var express = require('express');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var dbConfig = require('./db');
var mongoose = require('mongoose');

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
            res.status(401).json(info.message);
        }
        req.logIn(user, function (err) {
            if (err) {
                console.log('something wrong2!');
            }
            return res.json(user);
        });
    })(req, res, next);
});

app.post('/signup', function (req, res, next) {
    passport.authenticate('local-signup', function (err, user, info) {
        console.log(info);
        console.log('user is ' + typeof user + ' and has value: ' + user);
        if (user === false) {
            res.status(500).json({message: 'Failed to register user.'});
        }
        if (err) {
            res.status(500).json({message: err});
        }
        if (!user) {
            res.status(401).json({message: 'Failed to register user...'});
        }
        req.logIn(user, function (err) {
            if (err) {
                console.log('something wrong2!');
            }
            return res.json(user);
        });
    })(req, res, next);
});


/*app.get('/search', function(req, res){
 res.send({ hello : 'world' });
 });*/

app.listen(3012);
