// === modules ===
var express = require('express');
var Sequelize = require('sequelize');
var session = require('express-session');
var SessionStore = require('express-mysql-session');
var passport = require('passport');
var SteamStrategy = require('passport-steam').Strategy;
var SECRETS = require('./.secrets.json');

// === configuration ===
var port = process.env.PORT || 3000;
var env = process.env.NODE_ENV || 'development';
var returnURL = 'http://localhost:' + port + '/auth/steam/return/';
var realm = 'http://localhost:' + port + '/';

var options = {
    host: SECRETS.SERVER.HOST,
    port: SECRETS.SERVER.PORT,
    user: SECRETS.SERVER.USERNAME,
    password: SECRETS.SERVER.PASSWORD,
    database: SECRETS.SERVER.DATABASE
};

var sequelize = new Sequelize(
    options.database,
    options.user,
    options.password,
    {
        host: options.host,
        port: options.port
    });

var sessionStore = new SessionStore(options);

var User = sequelize.import(__dirname + '/app/models/user');

passport.serializeUser(function (user, done) {
    done(null, user.UserId);
});

passport.deserializeUser(function (obj, done) {
    User.findOne({ where: { OpenID: obj.identifier }})
        .then(function (user) {
            done(null, user);
        })
        .catch(function (err) {
            done(err);
        });
});

passport.use(new SteamStrategy({
    apiKey: SECRETS.STEAM_WEB_API_KEY,
    returnURL: returnURL,
    realm: realm
}, function (identifier, profile, done) {
    User.findOrCreate({ where: { OpenID: identifier }})
        .spread(function (user, created) {
            done(null, user.get({ plain: true }));
        })
        .catch(function (err) {
            done(err);
        });
}));

var app = express();

app.use(session({
    secret: SECRETS.SESSION_SECRET,
    store: sessionStore,
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static('public'));

// === routes ===
require('./app/routes')(app);

// === startup ===
app.listen(port);

console.log('Running server on port: ' + port);

exports = module.exports = app;
