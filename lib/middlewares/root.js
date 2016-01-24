'use strict';

var utils = require('../utils');
var util = {
	format: require('util').format,
	wrapAt: utils.wrapAt
};
// var Data = require('../data');

module.exports = function(req, res, next) {
	var __ = res.locals.__;
	var config = res.locals.config;
	// var links = res.locals.links;
	res.locals.util = util;
	res.locals.site = {
		name: config.name,
		head: {
			title: __('project_title'),
			description: __('project_description')
		}
	};

	// var mainCategories = Data.categories.getRootCategories(lang);
	// var pageMenu = mainCategories.map(function(category) {
	// 	return {
	// 		href: links.category(category.id, {
	// 			lang: lang
	// 		}),
	// 		text: category.name
	// 	};
	// });

	res.locals.pageMenu = [];

	res.setSelectedCategory = function(category) {
		this.locals.selectedCategory = category;
		this.locals.contentTitle = this.locals.contentTitle || category.name;
	};

	res.setCanonical = function(url) {
		this.locals.site.head.canonical = 'http://' + config.host + url;
	};

	utils.maxage(res, 60);

	next();
};
