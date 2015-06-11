// === modules ===
var express = require('express');
var app = express();

// === configuration ===
var port = process.env.PORT || 8080;

app.use(express.static('public'));

// === routes ===
require('./app/routes')(app);

// === startup ===
app.listen(port);

console.log('Running server on port: ' + port);

exports = module.exports = app;
