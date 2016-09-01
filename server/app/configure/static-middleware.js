'use strict';

var path = require('path');
var express = require('express');
// var favicon = require('serve-favicon');

module.exports = function (app) {

  var root = app.getValue('projectRoot');

  var npmPath = path.join(root, './node_modules');
  var browserPath = path.join(root, './browser');
  var buildPath = path.join(root, './build');

  app.use(express.static(npmPath));
  app.use(express.static(browserPath));
  app.use(express.static(buildPath));

};
