'use strict';

var i18n = require('i18n');
var path = require('path');

i18n.configure({
	// setup some locales - other locales default to en silently
	locales: ['ru'],

	// where to store json files - defaults to './locales' relative to modules directory
	directory: path.join(__dirname, 'locales')
});

module.exports = function(req, res, next) {
	var lang = res.locals.lang;
	res.locals.locale = res.locale = lang;
	i18n.init(req, res);
	res.setLocale(lang);

	return next();
};
