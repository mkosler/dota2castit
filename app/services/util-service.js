var bignum = require('bignum');
var pg = require('pg');

var _conversionMagicNumber = bignum('76561197960265728');

module.exports = {
    convertIdToInt64: function (i) {
        var bi = bignum(i);

        return bi.add(_conversionMagicNumber);
    },

    convertIdToInt32: function (i) {
        var bi = bignum(i);

        return bi.sub(_conversionMagicNumber);
    },

    getConnection: function (connectionString) {
        var close;

        return pg.connectAsync(connectionString).spread(function (client, done) {
            close = done;
            return client;
        }).disposer(function () {
            if (close) close();
        });
    },
};
