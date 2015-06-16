var router = require('express').Router();
var SECRETS = require('../../.secrets.json');
var dotaService =  new require('../services/dota-api-service')(SECRETS.STEAM_WEB_API_KEY);

router.get('/match/:id', function (req, res) {
    var match, players;

    dotaService.getMatchDetails({ match_id: req.params.id })
        .then(function (response) {
            match = JSON.parse(response);

            return dotaService.getPlayerSummaries({
                steamids: match.players.map(function (player) {
                    return dotaService.convertIdTo64(player.account_id);
                }).join(',')
            });
        }).then(function (response) {
            debugger;
            players = response.players;
        });
});

module.exports = router;
