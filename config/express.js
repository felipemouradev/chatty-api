const express = require('express');
const glob = require('glob');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const compress = require('compression');
const methodOverride = require('method-override');

module.exports = function(app, config) {
  let env = process.env.NODE_ENV || 'development';
  app.locals.ENV = env;
  app.locals.ENV_DEVELOPMENT = env === 'development';

  app.use(logger(':date[clf] - :method - :url - :status - :res[content-length] - :response-time ms'));
  app.use(bodyParser.json({limit: '50mb'}));
  app.use(bodyParser.urlencoded({
    extended: true,
    limit: '50mb'
  }));
  app.use(cookieParser());
  app.use(compress());
  // app.use(express.static(config.root + '/public'));
  app.use(methodOverride());
  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    next();
  });

  let routes = glob.sync(config.root + '/app/router/*.js');
  routes.forEach(function (route) {
    require(route)(app);
  });

  return app;
};
