'use strict';

var utils = require('../utils');
var moment = require('moment');
var util = {
	format: require('util').format,
	wrapAt: utils.wrapAt,
	moment: moment
};
var Data = require('../data');

module.exports = function(req, res, next) {
	var __ = res.locals.__;
	var lang = res.locals.lang;
	var config = res.locals.config;
	var links = req.app.locals.links;
	res.locals.util = util;
	var site = res.locals.site = {
		name: config.name,
		head: {
			title: __('project_title'),
			description: __('project_description'),
			links: [{
				rel: 'alternate',
				type: 'application/rss+xml',
				title: __('project_title'),
				href: links.rss.videos()
			}]
		}
	};

	var categories = Data.categories.getCategories(lang);
	res.locals.pageMenu = config.mainCategories.map(function(id) {
		var category = Data.categories.getCategory(lang, id);

		site.head.links.push({
			rel: 'alternate',
			type: 'application/rss+xml',
			title: util.format(__('page_title_by_category'), category.name),
			href: links.rss.videosByCategory(category.id)
		});

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
