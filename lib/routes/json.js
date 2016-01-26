'use strict';

var express = require('express');
/*eslint new-cap:0*/
var route = module.exports = express.Router();
var Data = require('../data');

function sendVideos(req, res, next) {
	var method = 'getLatestVideos';
	var category = req.query.category;
	var country = res.locals.country;
	var limit = req.query.limit;
	var config = res.locals.config;
	var links = req.app.locals.links;

	var options = {
		limit: limit && parseInt(limit) || 10,
		key: country
	};

	if (req.query.startKey) {
		options.startKey = req.query.startKey;
		options.startKey.createdAt = parseInt(options.startKey.createdAt);
	}

	if (category) {
		method = 'getLatestCategoryVideos';
		options.key = [country, category].join('-');
	}

	// console.log(options);

	Data.access[method](options)
		.then(function(videos) {
			videos = videos.map(function(video) {
				return {
					id: video.id,
					url: 'http://' + config.host + links.video(video.id),
					title: video.title,
					createdAt: video.createdAt,
					category: video.category,
					sourceId: video.sourceId,
					countViews: video.countViews,
					imageSrc: 'https:' + links.videoImage(video.sourceId)
				};
			});
			res.send(videos);
		}, next);
}

route.get('/latest_videos', sendVideos);
