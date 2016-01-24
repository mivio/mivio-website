'use strict';

var express = require('express');
var utils = require('../utils');
var Promise = utils.Promise;
/*eslint new-cap:0*/
var route = module.exports = express.Router();
var Data = require('../data');

route.get('/video/:id.html', function(req, res, next) {
	var id = req.params.id;
	var links = res.app.locals.links;
	var country = res.locals.country;

	utils.maxageVideo(res);

	Promise.props({
		video: Data.access.getVideo(id),
		latestVideos: Data.access.getLatestVideos({
			key: country,
			limit: 10
		})
	}).then(function(result) {
		if (!result.video) {
			return res.redirect(links.home());
		}

		// var categories = result.article.categories;

		// if (categories && categories.length > 0 && !categories[0].id) {
		// 	result.article.categories = categories.map(function(catId) {
		// 		return Data.data.categories.getCategory(catId, lang);
		// 	});
		// }

		res.locals.actionUrl = links.actions.view.video(id, Date.now());

		res.locals.site.head.title = result.video.title;
		res.locals.site.head.description = result.video.description;
		res.setCanonical(links.video(id));
		res.render('video', result);
		// res.send(result);
	}, next);
});
