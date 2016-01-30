'use strict';

var express = require('express');
/*eslint new-cap:0*/
var route = module.exports = express.Router();
var Data = require('../data');
var RSS = require('rss');
var utils = require('../utils');

function sendVideos(req, res, next) {
	var method = 'getLatestVideos';
	var category = req.params.category;
	var country = res.locals.country;
	var config = res.locals.config;
	var links = req.app.locals.links;
	var lang = res.locals.lang;
	var __ = res.locals.__;

	utils.maxage(res, 60 * 60);

	var options = {
		limit: 10,
		key: country
	};

	if (category) {
		category = Data.categories.getCategory(lang, category);
	}

	if (category) {
		method = 'getLatestCategoryVideos';
		options.key = [country, category].join('-');
	}

	// console.log(options);

	Data.access[method](options)
		.then(function(videos) {

			var rssOptions = {
				title: __('project_title'),
				site_url: 'http://' + config.host,
				feed_url: links.rss.videos(),
				language: lang
			};

			if (category) {
				rssOptions.title = util.format(__('page_title_by_category'), category.name);
				rssOptions.feed_url = links.rss.videosByCategory(category.id);
			}

			var rss = new RSS(rssOptions);

			videos.forEach(function(video) {
				rss.item({
					guid: video.id,
					url: 'http://' + config.host + links.video(video.id),
					title: video.title,
					description: video.description,
					date: new Date(video.createdAt),
					enclosure: {
						url: 'https:' + links.videoImage2(video.sourceId),
						type: 'image/jpeg'
					}
				});
			});

			res.set('Content-Type', 'application/rss+xml');
			res.send(rss.xml());
		}, next);
}

route.get('/videos/:category(\\d+)?.rss', sendVideos);
