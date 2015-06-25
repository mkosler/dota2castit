var pg = require('pg');
var Promise = require('bluebird');

var ItemRepository = function (uri) {
    this.uri = uri;
};

ItemRepository.prototype = {
    getAll: function () {
        var self = this;

        return new Promise(function (resolve, reject) {
            pg.connect(self.uri, function (err, client, done) {
                if (err) {
                    done(client);
                    return reject(err);
                }

                var query = client.query('SELECT itemid, apidata FROM item;');

                query.on('error', function (reason) {
                    done(client);
                    reject(reason);
                });

                query.on('row', function (row, result) {
                    result.addRow(row);
                });

                query.on('end', function (result) {
                    resolve(result.rows);
                    done();
                });
            });
        });
    },

    insert: function (item) {
        var self = this;

        return new Promise(function (resolve, reject) {
            pg.connect(self.uri, function (err, client, done) {
                if (err) {
                    done(client);
                    return reject(err);
                }

                var query = client.query(
                    'INSERT INTO item (itemid, apidata) VALUES ($1, $2);',
                    [ item.id, item ]);

                query.on('error', function (reason) {
                    done(client);
                    reject(reason);
                });

                query.on('end', function (result) {
                    resolve();
                    done();
                });
            });
        });
    },

    bulkInsert: function (items) {
        var self = this;
        return Promise.all(items.map(function (item) {
            return self.insert(item);
        }));
    },
};

module.exports = ItemRepository;
