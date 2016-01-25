'use strict';

var utils = require('../utils');
var util = {
	format: require('util').format,
	wrapAt: utils.wrapAt
};
var Data = require('../data');

module.exports = function(req, res, next) {
	var __ = res.locals.__;
	var lang = res.locals.lang;
	var config = res.locals.config;
	var links = req.app.locals.links;
	res.locals.util = util;
	res.locals.site = {
		name: config.name,
		head: {
			title: __('project_title'),
			description: __('project_description')
		}
	};

	var categories = Data.categories.getCategories(lang);
	res.locals.pageMenu = config.mainCategories.map(function(id) {
		var category = Data.categories.getCategory(lang, id);
		return {
			href: links.category(category.id),
			text: category.name,
			id: category.id
		};
	});

	res.setCanonical = function(url) {
		this.locals.site.head.canonical = 'http://' + config.host + url;
	};

	utils.maxage(res, 60);

	next();
};
