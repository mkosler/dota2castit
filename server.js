// === modules ===
var express = require('express');
var session = require('express-session');
var passport = require('passport');
var SteamStrategy = require('passport-steam').Strategy;
var SECRETS = require('./.secrets.json');
var pg = require('pg');
var pgSession = require('connect-pg-simple')(session);
var Dota2Api = require('./app/services/dota-api-service');
var dotaService = new Dota2Api();

// === configuration ===
var port = process.env.PORT || 3000;
var env = process.env.NODE_ENV || 'development';
var returnURL = 'http://localhost:' + port + '/auth/steam/return/';
var realm = 'http://localhost:' + port + '/';

passport.serializeUser(function (user, done) {
    done(null, user.castituserid);
});

passport.deserializeUser(function (castituserid, done) {
    pg.connect(SECRETS.SERVER.URI, function (err, client, finish) {
        client.query(
            'SELECT * FROM castituser WHERE castituserid = $1',
            [ castituserid ],
            function (err, result) {
                if (err) {
                    finish(client);
                    done(err);
                    return;
                }

                finish();
                done(null, result.rows[0]);
            });
    });
});

passport.use(new SteamStrategy({
    apiKey: SECRETS.STEAM_WEB_API_KEY,
    returnURL: returnURL,
    realm: realm
}, function (identifier, profile, done) {
    pg.connect(SECRETS.SERVER.URI, function (err, client, finish) {
        var stmt = 'WITH new_row AS ( ' +
            'INSERT INTO castituser (accountid, accountid32, profileurl, displayname) ' +
            'SELECT $1, $2, $3, $4 ' +
            'WHERE NOT EXISTS (SELECT * FROM castituser WHERE accountid = $1) ' +
            'RETURNING *) ' +
            'SELECT * FROM new_row ' +
            'UNION ' +
            'SELECT * FROM castituser WHERE accountid = $1;';

        client.query(
            stmt,
            [ profile.id, dotaService.convertIdTo32(profile.id).toString(), identifier, profile.displayName ],
            function (err, result) {
                if (err) {
                    finish(client);
                    done(err);
                    return;
                }

                finish();
                done(null, result.rows[0]);
            });
    });
}));

var app = express();

app.use(session({
    secret: SECRETS.SESSION_SECRET,
    store: new pgSession({
        pg: pg,
        conString: SECRETS.SERVER.URI
    }),
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static('dist'));

// === routes ===
require('./app/routes')(app);

// === startup ===
app.listen(port);

console.log('Running server on port: ' + port);

exports = module.exports = app;
