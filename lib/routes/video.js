'use strict';

var express = require('express');
var utils = require('../utils');
var _ = utils._;
var Promise = utils.Promise;
/*eslint new-cap:0*/
var route = module.exports = express.Router();
var Data = require('../data');

route.get('/video/:id', function(req, res, next) {
	var id = req.params.id;
	var links = res.app.locals.links;
	var country = res.locals.country;
	var lang = res.locals.lang;

	utils.maxageVideo(res);

	Promise.props({
		video: Data.access.getVideo(id),
		latestVideos: Data.access.getLatestVideos({
			key: country,
			limit: 5
		})
	}).then(function(result) {
		if (!result.video) {
			utils.maxage(res, 0);
			return res.redirect(links.home());
		}

		// var categories = result.article.categories;

		// if (categories && categories.length > 0 && !categories[0].id) {
		// 	result.article.categories = categories.map(function(catId) {
		// 		return Data.data.categories.getCategory(catId, lang);
		// 	});
		// }
		if (_.isNumber(result.video.category)) {
			result.video.category = Data.categories.getCategory(lang, result.video.category);
			// res.setSelectedCategory(result.video.category);
		}

		// res.locals.actionUrl = links.actions.view.video(id, Date.now());

		res.locals.site.head.title = result.video.title;
		res.locals.site.head.description = result.video.description;
		res.setCanonical(links.video(id));
		res.render('video', result);
		// res.send(result);
	}, next);
});

route.get('/embed/:id', function(req, res, next) {
	var id = req.params.id;
	var links = res.app.locals.links;
	var country = res.locals.country;
	var lang = res.locals.lang;

	utils.maxageEmbed(res);

	Promise.props({
		video: Data.access.getVideo(id)
	}).then(function(result) {
		if (!result.video) {
			utils.maxage(res, 0);
			return res.redirect(links.home());
		}
		res.locals.actionUrl = links.actions.view.video(id, Date.now());
		res.setCanonical(links.video(id));
		res.render('embed', result);
	}, next);
});
