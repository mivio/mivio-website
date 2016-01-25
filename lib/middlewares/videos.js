'use strict';

// var utils = require('../utils');
// var Promise = utils.Promise;
// var _ = utils._;
// var Data = require('../data');

module.exports = function(req, res, next) {

	res.setSelectedCategory = function(category) {
		res.locals.selectedCategory = category;
		res.locals.contentTitle = res.locals.contentTitle || category.name;
	};

	next();
};
