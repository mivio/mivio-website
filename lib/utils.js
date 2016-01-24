'use strict';

var _ = require('lodash');
var Promise = require('bluebird');

var NO_CACHE = 'private, max-age=0, no-cache';
var PUBLIC_CACHE = 'public, max-age=';
var CACHE_CONTROL = 'Cache-Control';

/**
 * Set response Cache-Control
 * @maxage integet in minutes
 */
exports.maxage = function(res, maxage) {
	maxage = 0;
	var cache = NO_CACHE;
	if (maxage > 0) {
		cache = PUBLIC_CACHE + (maxage * 60);
	}
	res.set(CACHE_CONTROL, cache);
};

exports.maxageVideo = function(res) {
	exports.maxage(res, 60 * 3);
};

exports.maxageRedirect = function(res) {
	exports.maxage(res, 60 * 12);
};

exports.maxageIndex = function(res) {
	exports.maxage(res, 60);
};

exports.maxageCategory = function(res) {
	exports.maxage(res, 60 * 3);
};

exports.maxageSearch = function(res) {
	exports.maxage(res, 60 * 6);
};

exports.wrapAt = function(target, len) {
	if (target && target.length > len) {
		return target.substr(0, len - 3) + '...';
	}
	return target;
};

exports._ = _;
exports.Promise = Promise;
exports.logger = console;
