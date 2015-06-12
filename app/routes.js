var path = require('path');
var passport = require('passport');

module.exports = function (app) {
    // === frontend routes ===
    app.get('*', function (req, res) {
        res.sendFile(path.resolve('public/index.html'));
    });

    // === authentication routes ===
    app.get('/auth/steam', passport.authenticate('steam'), function (req, res) {
        // redirected to Steam
    });

    app.get('/auth/steam/return', passport.authenticate('steam'), function (req, res) {
        res.send('Logged in!');
    });
};
