'use strict';

module.exports = function(app) {
	app.use('/json', require('./json'));
	app.use('/actions', require('./actions'));
	app.use(require('../middlewares/root.js'));
	app.use(require('../middlewares/videos.js'));
	app.use(require('./home'));
	app.use(require('./video'));
};
