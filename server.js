// === modules ===
var express = require('express');
var passport = require('passport');
var SteamStrategy = require('passport-steam').Strategy;
var SECRETS = require('./.secrets.json');
var app = express();

// === configuration ===
var port = process.env.PORT || 8080;

passport.serializeUser(function (user, done) {
});

passport.deserializeUser(function (obj, done) {
});

passport.use(new SteamStrategy({
    apiKey: SECRETS.STEAM_WEB_API_KEY,
    returnURL: 'http://localhost:' + port + '/auth/steam/return',
    realm: 'http://localhost:' + port + '/'
}, function (identifier, profile, done) {
}));

app.use(express.static('public'));

// === routes ===
require('./app/routes')(app);

// === startup ===
app.listen(port);

console.log('Running server on port: ' + port);

exports = module.exports = app;
