var path = require('path');

module.exports = function (app) {
    app.use('/dota', require('./routes/dota-routes'));
    app.use('/auth', require('./routes/auth-routes'));

    // serve the main route
    app.get('/', function (req, res) {
        res.sendFile(path.resolve('public/index.html'));
    });
};
