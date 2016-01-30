'use strict';

module.exports = function(req, res, next) {

	res.setSelectedCategory = function(category) {
		res.locals.selectedCategory = category;
		res.locals.contentTitle = res.locals.contentTitle || category.name;
	};

	next();
};
