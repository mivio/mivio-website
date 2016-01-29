'use strict';

var express = require('express');
var utils = require('../utils');
var Promise = utils.Promise;
/*eslint new-cap:0*/
var route = module.exports = express.Router();
var Data = require('../data');
var util = require('util');

// var categoriesRegex = _.pluck(Data.data.categories.getCategories(), 'id').join('|');

route.get('/', function(req, res, next) {
	var __ = res.locals.__;
	var country = res.locals.country;
	var links = req.app.locals.links;

	utils.maxageIndex(res);

	res.locals.contentTitle = __('latest_videos');

	Promise.props({
		latestVideos: Data.access.getLatestVideos({
			key: country,
			limit: 15
		})
	}).then(function(result) {
		res.locals.site.head.canonical = links.home();
		res.render('index', result);
	}, next);
});

route.get('/category-:category(\\d+)', function(req, res, next) {
	var category = req.params.category.trim().toLowerCase();
	var lang = res.locals.lang;
	var __ = res.locals.__;
	var country = res.locals.country;
	var links = req.app.locals.links;

	utils.maxageCategory(res);

	category = Data.categories.getCategory(lang, category);

	res.setSelectedCategory(category);

	Promise.props({
		latestVideos: Data.access.getLatestCategoryVideos({
			key: country + '-' + category.id,
			limit: 15
		})
	}).then(function(result) {
		res.locals.site.head.title = util.format(__('page_title_by_category'), category.name);
		res.locals.site.head.description = util.format(__('page_description_by_category'), category.name);
		res.locals.site.head.canonical = links.category(category.id);
		res.render('index', result);
	}, next);
});


route.get('/iframe/:limit(\\d+)?', function(req, res, next) {
	// var category = req.query.category;
	var limit = req.params.limit || 5;

	var lang = res.locals.lang;
	var __ = res.locals.__;
	var country = res.locals.country;
	var links = req.app.locals.links;

	utils.maxage(res, 60 * 30);

	Promise.props({
		videos: Data.access.getLatestVideos({
			key: country,
			limit: limit
		})
	}).then(function(result) {
		res.render('iframe', result);
	}, next);
});
