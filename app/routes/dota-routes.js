var router = require('express').Router();
var SECRETS = require('../../.secrets.json');
var dotaService =  new require('../services/dota-api-service')(SECRETS.STEAM_WEB_API_KEY);

router.get('/match/:id', function (req, res) {
    dotaService.getMatchDetails({ match_id: req.params.id })
        .then(function (body) {
            body = JSON.parse(body);
        })
        .catch(function (err) {
        });
});

module.exports = router;
