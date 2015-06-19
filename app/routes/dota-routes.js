var router = require('express').Router();
var SECRETS = require('../../.secrets.json');
var Dota2Api = require('../services/dota-api-service');
var dotaService = new Dota2Api(SECRETS.STEAM_WEB_API_KEY);

router.get('/match/:id', function (req, res) {
    var match;

    dotaService.getMatchDetails({ match_id: req.params.id })
        .then(function (response) {
            match = response.result;

            match.players.forEach(function (player) {
                player.account_id64 = dotaService.convertIdTo64(player.account_id).toString();
            });

            var playerIds = match.players.map(function (player) {
                return player.account_id64;
            });

            return dotaService.getPlayerSummaries({
                steamids: playerIds.join(',')
            });
        })
        .then(function (response) {
            response.response.players.forEach(function (p1) {
                match.players.forEach(function (p2) {
                    if (p1.steamid === p2.account_id64) {
                        p2.steamaccount = p1;

                        return;
                    }
                });
            });

            res.send(match);
        })
        .catch(function (reason) {
            res.status(reason.statusCode).send(reason.error);
        });
});

module.exports = router;
