'use strict';

require('dotenv').load();

var express = require('express');
var bodyParser = require('body-parser');
var responseTime = require('response-time');
var methodOverride = require('method-override');
var routes = require('./routes');
var utils = require('./utils');
var i18n = require('./i18n');
var path = require('path');
var links = require('./links');
var boot = require('./boot');
var isProduction = process.env.NODE_ENV === 'production';

function exit(error) {
	if (error) {
		utils.logger.error('Exit with error: ' + error.message, error);
	}
	/*eslint no-process-exit:0*/
	process.exit(0);
}

function catchError(req, res, error) {
	utils.logger.error(error.message || 'errorHandler', {
		hostname: req.hostname,
		url: req.originalUrl,
		stack: error.stack
	});

	utils.maxage(res, 0);

	res.status(error.code || error.statusCode || 500).send('Error!');
}

function createApp() {
	var app = express();

	app.disable('x-powered-by');
	app.set('view engine', 'jade');
	app.set('views', path.join(__dirname, 'views'));
	app.disable('etag');

	app.use(bodyParser.json()); // to support JSON-encoded bodies
	app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
		extended: true
	}));
	app.use(methodOverride());
	app.use(responseTime());
	if (!isProduction) {
		app.use(require('morgan')('dev'));
	}

	app.use(express.static(path.join(__dirname, '/public'), {
		maxAge: isProduction ? (1000 * 60 * 15) : 0
	}));

	// app locals
	app.locals.links = links;

	app.use(boot);

	app.use(i18n);
	// app routes
	routes(app);

	app.all('*', function(req, res) {
		res.status(404).end();
	});

	app.use(function(error, req, res) {
		catchError(req, res, error);
	});

	app.on('uncaughtException', function(req, res, route, error) {
		catchError(req, res, error);
	});

	app.listen(process.env.PORT);
	utils.logger.log('listening on ', process.env.PORT);
}

createApp();

process.on('uncaughtException', exit);

process.on('SIGINT', exit);

process.on('message', function(msg) {
	if (msg === 'shutdown') {
		utils.logger.warn('Exit with shutdown message!');
		exit();
	}
});
