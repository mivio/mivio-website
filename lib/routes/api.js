'use strict';

var express = require('express');
/*eslint new-cap:0*/
var route = module.exports = express.Router();
var Data = require('../data');

function sendVideos(req, res, next) {
	var method = 'getLatestVideos';
	var category = req.params.category;
	var country = req.params.country;
	var limit = req.params.limit;

	var options = {
		limit: limit && parseInt(limit) || 10,
		key: country
	};

	if (category) {
		method = 'getLatestCategoryVideos';
		options.key = [country, category].join('-');
	}

	Data.access[method](options)
		.then(function(videos) {
			res.send(videos || []);
		}, next);
}

route.get('/videos.json', sendVideos);
route.get('/videos/limit-:limit.json', sendVideos);
route.get('/videos/category-:category.json', sendVideos);
route.get('/videos/category-:category/limit-:limit.json', sendVideos);
