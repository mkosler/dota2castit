var path = require('path');

module.exports = function (app) {
    // === frontend routes ===
    app.get('*', function (req, res) {
        res.sendFile(path.resolve('public/index.html'));
    });
};
