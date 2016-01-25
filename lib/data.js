'use strict';

var Data = require('trevid-data');

exports.control = new Data.ControlService();
exports.access = new Data.AccessService();
exports.helpers = Data.helpers;
exports.categories = Data.categories;
