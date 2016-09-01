'use strict';

var path = require('path');
var logMiddleware = require('morgan')('dev');

var rootPath = path.join(__dirname, '../../../');
var indexPath = path.join(rootPath, './index.html');


module.exports = function (app) {
  app.setValue('projectRoot', rootPath);
  app.setValue('indexHTMLPath', indexPath);
  app.setValue('log', logMiddleware);
};
