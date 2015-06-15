var router = require('express').Router();
var passport = require('passport');

router.get('/loggedin', function (req, res) {
    res.send(req.isAuthenticated() ? req.user : '0');
});

router.get('/logout', function (req, res) {
    req.logOut();
    res.send(200);
});

router.get('/steam', passport.authenticate('steam'));

router.get('/steam/return', passport.authenticate('steam'), function (req, res) {
    res.redirect('/');
});

module.exports = router;
