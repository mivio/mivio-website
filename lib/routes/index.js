'use strict';

var home = require('./home');
var video = require('./video');

module.exports = function(app) {
	app.use('/actions', require('./actions'));
	app.use(require('../middlewares/root.js'));
	app.use(require('../middlewares/videos.js'));
	app.use(home);
	app.use(video);
};
