'use strict';
var path = require('path');
var chalk = require('chalk');
var express = require('express');
var app = express();
module.exports = app;

// Pass our express application pipeline into the configuration
// function located at server/app/configure/index.js
require('./configure')(app);

app.get('/*', function (req, res) {
    res.sendFile(app.get('indexHTMLPath'));
});

var PORT = process.env.PORT || 1337;

app.listen(PORT, function () {
	console.log(chalk.blue('Server started on port', chalk.magenta(PORT)));
});