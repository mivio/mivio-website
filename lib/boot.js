'use strict';

// try {
global.Intl = require('intl');
// } catch (e) {}

var config = require('./config');

var hosts = {
	'mivio.ru': 'ru'
};

function getCountry(req) {
	return hosts[req.hostname] || process.env.COUNTRY;
}

module.exports = function(req, res, next) {
	var country = getCountry(req);
	if (!country) {
		return next(new Error('Invalid hostname', {
			hostname: req.hostname
		}));
	}
	var conf = config(country);

	res.locals.config = conf;
	res.locals.country = conf.country;
	res.locals.lang = conf.lang || conf.language;

	next();
};
