var Promise = require('bluebird');
var request = require('request');
var urljoin = require('url-join');
var bignum = require('bignum');

var Dota2Api = function (key) {
    this.key = key;
    this._conversionMagicNumber = bignum('76561197960265728');

    var baseUri = 'https://api.steampowered.com/';
    this._matchBaseUri = urljoin(baseUri, '/IDOTA2Match_570/');
    this._econBaseUri = urljoin(baseUri, '/IEconDOTA2_570/');
    this._playerBaseUri = urljoin(baseUri, '/ISteamUser/');
};

Dota2Api.prototype = {
    convertIdTo64: function (id) {
        var bigId = bignum(id);

        return bigId.add(this._conversionMagicNumber);
    },

    convertIdTo32: function (id) {
        var bigId = bignum(id);

        return bigId.sub(this._conversionMagicNumber);
    },

    call: function (uri, qs) {
        qs.key = this.key;

        return new Promise(function (resolve, reject) {
            request({
                uri: uri,
                qs: qs
            }, function (err, res, body) {
                if (!err && res.statusCode === 200) {
                    return resolve(JSON.parse(body));
                }

                reject({
                    error: err,
                    statusCode: res.statusCode
                });
            });
        });
    },

    // === API methods ===
    getMatchHistory: function (qs) {
        return this.call(urljoin(this._matchBaseUri, '/GetMatchHistory/v001/'), qs);
        //qs.key = this.key;

        //return new Promise(function (resolve, reject) {
            //request({
                //uri: 'https://api.steampowered.com/IDOTA2Match_570/GetMatchHistory/v001/',
                //qs: qs
            //}, function (err, res, body) {
                //if (!err && res.statusCode === 200) {
                    //return resolve(JSON.parse(body));
                //}

                //reject({
                    //error: err,
                    //statusCode: res.statusCode
                //});
            //});
        //});
    },

    getMatchDetails: function (qs) {
        return this.call(urljoin(this._matchBaseUri, '/GetMatchDetails/v001/'), qs);
    },

    getHeroes: function (qs) {
        return this.call(urljoin(this._econBaseUri, '/GetHeroes/v0001/'), qs);
        //qs.key = this.key;

        //return new Promise(function (resolve, reject) {
            //request({
                //uri: 'https://api.steampowered.com/IEconDOTA2_570/GetHeroes/v0001/',
                //qs: qs
            //}, function (err, res, body) {
                //if (!err && res.statusCode === 200) {
                    //resolve(JSON.parse(body));
                //}

                //reject(err);
            //});
        //});
    },

    getPlayerSummaries: function (qs) {
        return this.call(urljoin(this._playerBaseUri, '/GetPlayerSummaries/v0002/'), qs);
        //qs.key = this.key;

        //return new Promise(function (resolve, reject) {
            //request({
                //uri: 'https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/',
                //qs: qs
            //}, function (err, res, body) {
                //if (!err && res.statusCode === 200) {
                    //resolve(JSON.parse(body));
                //}

                //reject(err);
            //});
        //});
    },

    getLeagueListing: function (qs) {
        return this.call(urljoin(this._matchBaseUri, '/GetLeagueListing/v0001/'), qs);
        //qs.key = this.key;

        //return new Promise(function (resolve, reject) {
            //request({
                //uri: 'https://api.steampowered.com/IDOTA2Match_570/GetLeagueListing/v0001/',
                //qs: qs
            //}, function (err, res, body) {
                //if (!err && res.statusCode === 200) {
                    //resolve(JSON.parse(body));
                //}
            //});
        //});
    },

    getLiveLeagueGames: function (qs) {
        return this.call(urljoin(this._matchBaseUri, '/GetLiveLeagueGames/v0001/'), qs);
        //qs.key = this.key;

        //return new Promise(function (resolve, reject) {
            //request({
                //uri: 'https://api.steampowered.com/IDOTA2Match_570/GetLiveLeagueGames/v0001/',
                //qs: qs
            //}, function (err, res, body) {
                //if (!err && res.statusCode === 200) {
                    //resolve(JSON.parse(body));
                //}

                //reject(err);
            //});
        //});
    },

    getMatchHistoryBySequenceNum: function (qs) {
        return this.call(urljoin(this._matchBaseUri, '/GetMatchHistoryBySequenceNum/v0001/'), qs);
        //qs.key = this.key;

        //return new Promise(function (resolve, reject) {
            //request({
                //uri: 'https://api.steampowered.com/IDOTA2Match_570/GetMatchHistoryBySequenceNum/v0001/',
                //qs: qs
            //}, function (err, res, body) {
                //if (!err && res.statusCode === 200) {
                    //resolve(JSON.parse(body));
                //}

                //reject(err);
            //});
        //});
    },

    getTeamInfoByTeamID: function (qs) {
        return this.call(urljoin(this._matchBaseUri, '/GetTeamInfoByTeamID/v001/'), qs);
        //qs.key = this.key;

        //return new Promise(function (resolve, reject) {
            //request({
                //uri: 'https://api.steampowered.com/IDOTA2Match_570/GetTeamInfoByTeamID/v001/',
                //qs: qs
            //}, function (err, res, body) {
                //if (!err && res.statusCode === 200) {
                    //resolve(JSON.parse(body));
                //}

                //reject(err);
            //});
        //});
    },

    //getGameItems: function (qs) {
        //return this.call(urljoin(this._econBaseUri, '/Get
        //qs.key = this.key;

        //return new Promise(function (resolve, reject) {
            //request({
                //uri: 'https://api.steampowered.com/IEconDOTA2_570/GetTeamInfoByTeamID/v001/',
                //qs: qs
            //}, function (err, res, body) {
                //if (!err && res.statusCode === 200) {
                    //resolve(JSON.parse(body));
                //}

                //reject(err);
            //});
        //});
    //}
};

module.exports = Dota2Api;
