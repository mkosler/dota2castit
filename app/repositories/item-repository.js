var pg = require('pg');
var Promise = require('bluebird');
var utilService = require('../service/util-service');

var ItemRepository = function (uri) {
    this.uri = uri;
};

ItemRepository.prototype = {
    _call: function (handler) {
        return Promise.using(utilService.getConnection(this.uri), handler);
    },

    getAll: function () {
        return this._call(function (client) {
            return client.queryAsync('SELECT itemid, apiData FROM item;');
        });
    },

    insert: function (item) {
        return this._call(function (client) {
            return client.queryAsync({
                text: 'INSERT INTO Item (ItemId, ApiData) VALUES ($1, $2);',
                values: [ item.id, item ]
            });
        });
    },

    bulkInsert: function (items) {
        return Promise.all(items.map(function (item) {
            return this.insert(item);
        }).bind(this));
    },

    update: function (item) {
        var stmt = 'UPDATE Item SET ' +
                   'ItemId = $1, ' +
                   'ApiData = $2 ' +
                   'WHERE ItemId = $1;';

        return this._call(function (client) {
            return client.queryAsync({
                text: stmt,
                values: [ item.id, item ]
            });
        });
    },

    delete: function (itemId) {
        return this._call(function (client) {
            return client.queryAsync({
                text: 'DELETE FROM Item WHERE ItemId = $1;',
                values: [ itemId ]
            });
        });
    },
};

module.exports = ItemRepository;
