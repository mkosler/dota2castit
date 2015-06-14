var path = require('path');
var passport = require('passport');

module.exports = function (app) {
    // === frontend routes ===
    app.get('/', function (req, res) {
        res.sendFile(path.resolve('public/index.html'));
    });

    // === authentication routes ===
    // == authentication helper ==
    var auth = function (req, res, next) {
        if (!req.isAuthenticated()) {
            res.send(401);
        } else {
            next();
        }
    };

    app.get('/auth/loggedIn', function (req, res) {
        res.send(req.isAuthenticated() ? req.user : '0');
    });

    app.get('/auth/logout', function (req, res) {
        req.logOut();
        res.send(200);
    });

    app.get('/auth/steam',
        passport.authenticate('steam', { failureRedirect: '/login' }));

    app.get('/auth/steam/return',
        passport.authenticate('steam', { failureRedirect: '/' }),
        function (req, res) {
            res.redirect('/');
        });
};
