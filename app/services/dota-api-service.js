var Promise = require('bluebird');
var request = Promise.promisifyAll(require('request'));
var urljoin = require('url-join');
var bignum = require('bignum');

var Dota2Api = function (key) {
    this.key = key;

    var baseUri = 'https://api.steampowered.com/';
    this._matchBaseUri = urljoin(baseUri, '/IDOTA2Match_570/');
    this._econBaseUri = urljoin(baseUri, '/IEconDOTA2_570/');
    this._playerBaseUri = urljoin(baseUri, '/ISteamUser/');
};

Dota2Api.prototype = {
    _call: function (uri, qs) {
        qs = qs || {};

        qs.key = this.key;

        return request.getAsync(uri, { qs: qs })
            .spread(function (response, body) {
                return JSON.parse(body);
            });
    },

    // === API methods ===
    getMatchHistory: function (qs) {
        return this._call(urljoin(this._matchBaseUri, '/GetMatchHistory/v001/'), qs);
    },

    getMatchDetails: function (qs) {
        return this._call(urljoin(this._matchBaseUri, '/GetMatchDetails/v001/'), qs);
    },

    getHeroes: function (qs) {
        return this._call(urljoin(this._econBaseUri, '/GetHeroes/v0001/'), qs);
    },

    getPlayerSummaries: function (qs) {
        return this._call(urljoin(this._playerBaseUri, '/GetPlayerSummaries/v0002/'), qs);
    },

    getLeagueListing: function (qs) {
        return this._call(urljoin(this._matchBaseUri, '/GetLeagueListing/v0001/'), qs);
    },

    getLiveLeagueGames: function (qs) {
        return this._call(urljoin(this._matchBaseUri, '/GetLiveLeagueGames/v0001/'), qs);
    },

    getMatchHistoryBySequenceNum: function (qs) {
        return this._call(urljoin(this._matchBaseUri, '/GetMatchHistoryBySequenceNum/v0001/'), qs);
    },

    getTeamInfoByTeamID: function (qs) {
        return this._call(urljoin(this._matchBaseUri, '/GetTeamInfoByTeamID/v001/'), qs);
    },

    getGameItems: function (qs) {
        return this._call(urljoin(this._econBaseUri, '/GetGameItems/v001/'), qs);
    },
};

module.exports = Dota2Api;
