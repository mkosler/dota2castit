var router = require('express').Router();
var request = require('request');
var SECRETS = require('../../.secrets.json');

var matchBaseRequest = request.defaults({
    baseUrl: 'https://api.steampowered.com/IDOTA2Match_570/'
});

router.get('/match/:id', function (req, res) {
    matchBaseRequest({
        uri: '/GetMatchDetails/V001/',
        qs: {
            key: SECRETS.STEAM_WEB_API_KEY,
            match_id: req.params.id
        }
    }, function (err, response, body) {
        if (!err && response.statusCode === 200) {
            res.json(JSON.parse(body));
        }
    });
});

module.exports = router;
