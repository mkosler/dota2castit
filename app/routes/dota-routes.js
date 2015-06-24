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

router.get('/history/:id', function (req, res) {
    var query = req.query;
    query.account_id = req.params.id;

    var history;

    dotaService.getMatchHistory(query)
        .then(function (response) {
            if (response.result.status !== 1) {
                res.status(404).send(response.result.statusDetail);
            }

            history = response.result;

            return dotaService.getHeroes();
        })
        .then(function (response) {
            var heroes = [];

            // for some reason, forEach fails but accessing by index does not
            response.result.heroes.forEach(function (hero, i) {
                hero.imagename = hero.name.match(/npc_dota_hero_(\w+)/)[1];

                heroes[hero.id] = hero;
            });
            
            //for (var i = 0; i < response.result.count; i++) {
                //heroes[response.result.heroes[i].id] = response.result.heroes[i];
            //}
            
            history.matches.forEach(function (match, i) {
                match.players.forEach(function (player, j) {
                    history.matches[i].players[j].hero = heroes[player.hero_id];
                });
            });

            res.send(history);
        })
        .catch(function (reason) {
            res.status(reason.statusCode).send(reason.error);
        });
});

module.exports = router;
