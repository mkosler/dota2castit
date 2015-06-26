// === modules ===
var express = require('express');
var session = require('express-session');
var passport = require('passport');
var SteamStrategy = require('passport-steam').Strategy;
var SECRETS = require('./.secrets.json');
var Promise = require('bluebird');
var pg = Promise.promisifyAll(require('pg'));
var pgSession = require('connect-pg-simple')(session);
var Dota2Api = require('./app/services/dota-api-service');
var dotaService = new Dota2Api();
var utilService = require('./app/services/util-service');

// === configuration ===
var port = process.env.PORT || 3000;
var env = process.env.NODE_ENV || 'development';
var returnURL = 'http://localhost:' + port + '/auth/steam/return/';
var realm = 'http://localhost:' + port + '/';

passport.serializeUser(function (user, done) {
    done(null, user.castituserid);
});

passport.deserializeUser(function (castItUserId, done) {
    Promise.using(utilService.getConnection(SECRETS.SERVER.URI), function (client) {
        return client.queryAsync({
            text: 'SELECT * FROM CastItUser WHERE CastItUserId = $1',
            values: [ castItUserId ]
        });
    }).then(function (result) {
        done(null, result.rows[0]);
    }).catch(function (reason) {
        done(reason);
    });
});

passport.use(new SteamStrategy({
    apiKey: SECRETS.STEAM_WEB_API_KEY,
    returnURL: returnURL,
    realm: realm
}, function (identifier, profile, done) {
    var stmt = 'WITH new_row AS ( ' +
               'INSERT INTO CastItUser (AccountId, AccountId32, ProfileUrl, DisplayName) ' +
               'SELECT $1, $2, $3, $4 ' +
               'WHERE NOT EXISTS (SELECT 1 FROM CastItUser WHERE AccountId = $1) ' +
               'RETURNING *) ' +
               'SELECT CastItUserId, AccountId, AccountId32, ProfileUrl, DisplayName FROM new_row ' +
               'UNION ' +
               'SELECT CastItUserId, AccountId, AccountId32, ProfileUrl, DisplayName FROM CastItUser WHERE AccountId = $1;';

    Promise.using(utilService.getConnection(SECRETS.SERVER.URI), function (client) {
        return client.queryAsync({
            text: stmt,
            values: [ profile.id, dotaService.convertIdTo32(profile.id).toString(), identifier, profile.displayName ]
        });
    }).then(function (result) {
        done(null, result.rows[0]);
    }).catch(function (reason) {
        done(reason);
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
