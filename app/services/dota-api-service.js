var request = require('request-promise');

var Dota2Api = function (key) {
    this.key = key;
    this._matchBaseRequest = request.defaults({
        baseUri: 'https://api.steampowered.com/IDOTA2Match_570/'
    });
    this._econBaseRequest = request.defaults({
        baseUri: 'https://api.steampowered.com/IEconDOTA2_570/'
    });
    this._playerBaseRequest = request.defaults({
        baseUri: 'https://api.steampowered.com/ISteamUser/'
    });
};

Dota2Api.prototype = {
    applyApiKey: function (qs) {
        qs.key = this.key;

        return qs;
    },

    getMatchHistory: function (qs) {
        return this._matchBaseRequest({
            uri: '/GetMatchHistory/v001',
            qs: this.applyApiKey(qs)
        });
    },

    getMatchDetails: function (qs) {
        return this._matchBaseRequest({
            uri: '/GetMatchDetails/v001',
            qs: this.applyApiKey(qs)
        });
    },

    getHeroes: function (qs) {
        return this._econBaseRequest({
            uri: '/GetHeroes/v0001/',
            qs: this.applyApiKey(qs)
        });
    },

    getPlayerSummaries: function (qs) {
        return this._playerBaseRequest({
            uri: '/GetPlayerSummaries/v0002/',
            qs: this.applyApiKey(qs)
        });
    },

    getLeagueListing: function (qs) {
        return this._matchBaseRequest({
            uri: '/GetLeagueListing/v0001/',
            qs: this.applyApiKey(qs)
        });
    },

    getLiveLeagueGames: function (qs) {
        return this._matchBaseRequest({
            uri: '/GetLiveLeagueGames/v0001/',
            qs: this.applyApiKey(qs)
        });
    },

    getMatchHistoryBySequenceNum: function (qs) {
        return this._matchBaseRequest({
            uri: '/GetMatchHistoryBySequenceNum/v0001/',
            qs: this.applyApiKey(qs)
        });
    },

    getTeamInfoByTeamID: function (qs) {
        return this._matchBaseRequest({
            uri: '/GetTeamInfoByTeamID/v001/',
            qs: this.applyApiKey(qs)
        });
    },

    getGameItems: function (qs) {
        return this._econBaseRequest({
            uri: '/GetGameItems/v001/',
            qs: this.applyApiKeys(qs)
        });
    }
};

module.exports = Dota2Api;
