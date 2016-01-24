'use strict';

var express = require('express');
var utils = require('../utils');
/*eslint new-cap:0*/
var route = module.exports = express.Router();
var Data = require('../data');

route.get('/view/video/:id/:time', function(req, res, next) {
	var time = req.params.time.trim().toLowerCase();
	var id = req.params.id.trim().toLowerCase();
	utils.maxage(res, 0);

	time = time - Date.now();
	time = Math.abs(time);

	if (time > 1000 * 4) {
		return res.sendStatus(400);
	}

	Data.access.getVideo(id)
		.then(function(video) {
			if (!video) {
				return res.sendStatus(400);
			}
			Data.control.updateVideo({
				id: id,
				countViews: (video.countViews || 1) + 1
			}).then(function(article) {
				res.sendStatus(article ? 200 : 404);
			});
		}).catch(next);
});
