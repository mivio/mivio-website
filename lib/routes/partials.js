'use strict';

var express = require('express');
var utils = require('../utils');
var Promise = utils.Promise;
/*eslint new-cap:0*/
var route = module.exports = express.Router();
var Data = require('../data');
var util = require('util');

route.get('/video_list_main', function(req, res, next) {
	var __ = res.locals.__;
	var country = res.locals.country;
	var links = req.app.locals.links;

	utils.maxageIndex(res);

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
