'use strict';

var urlset = require('urlset');
var path = require('path');

urlset.load(path.join(__dirname, 'sitemap.json'));

module.exports = urlset.url;
