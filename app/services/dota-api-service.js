var Promise = require('bluebird');
var request = Promise.promisify(require('request'));
Promise.promisifyAll(request);
var url = require('url');

var Dota2Api = function (key) {
    this.key = key;
    this._conversionMagicNumber = 76561197960265728;

    var baseUri = 'https://api.steampowered.com/';
    this._matchBaseUri = url.resolve(baseUri, '/IDOTA2Match_570/');
    this._econBaseUri = url.resolve(baseUri, '/IEconDOTA2_570/');
    this._playerBaseUri = url.resolve(baseUri, '/ISteamUser/');
};

Dota2Api.prototype = {
    applyApiKey: function (qs) {
        qs.key = this.key;

        return qs;
    },

    convertIdTo64: function (id) {
        return id + this._conversionMagicNumber;
    },

    convertIdTo32: function (id) {
        return id - this._conversionMagicNumber;
    },


    // === API methods ===
    getMatchHistory: function (qs) {
        return request({
            uri: url.resolve(this._matchBaseUri, '/GetMatchHistory/v001/'),
            qs: this.applyApiKey(qs)
        });
    },

    getMatchDetails: function (qs) {
        return request.getAsync({
            uri: url.resolve(this._matchBaseUri, '/GetMatchDetails/v001/'),
            qs: this.applyApiKey(qs)
        });
    },

    getHeroes: function (qs) {
        return request({
            uri: url.resolve(this._econBaseUri, '/GetHeroes/v0001/'),
            qs: this.applyApiKey(qs)
        });
    },

    getPlayerSummaries: function (qs) {
        return request({
            uri: url.resolve(this._playerBaseUri, '/GetPlayerSummaries/v0002/'),
            qs: this.applyApiKey(qs)
        });
    },

    getLeagueListing: function (qs) {
        return request({
            uri: url.resolve(this._matchBaseUri, '/GetLeagueListing/v0001/'),
            qs: this.applyApiKey(qs)
        });
    },

    getLiveLeagueGames: function (qs) {
        return request({
            uri: url.resolve(this._matchBaseUri, '/GetLiveLeagueGames/v0001/'),
            qs: this.applyApiKey(qs)
        });
    },

    getMatchHistoryBySequenceNum: function (qs) {
        return request({
            uri: url.resolve(this._matchBaseUri, '/GetMatchHistoryBySequenceNum/v0001/'),
            qs: this.applyApiKey(qs)
        });
    },

    getTeamInfoByTeamID: function (qs) {
        return request({
            uri: url.resolve(this._matchBaseUri, '/GetTeamInfoByTeamID/v001/'),
            qs: this.applyApiKey(qs)
        });
    },

    getGameItems: function (qs) {
        return request({
            uri: url.resolve(this._econBaseUri, '/GetGameItems/v001/'),
            qs: this.applyApiKeys(qs)
        });
    }
};

module.exports = Dota2Api;
