'use strict';

var _ = require('../utils')._;

var packageInfo = require('../../package.json');

var config = {
	version: packageInfo.version,
	name: 'Trevid',
	languagesNames: {
		ro: 'Română',
		ru: 'Русский',
		bg: 'Български'
	},
	monthFormat: 'D MMMM',
	favicon: 'http://assets.ournetcdn.net/ournet/img/icons/ournet-icon-16.png',
	international: {
		ru: {
			it: 'Russia',
			en: 'Russia',
			ro: 'Rusia',
			ru: 'Россия',
			bg: 'Руска федерация',
			cs: 'Rusko',
			hu: 'Oroszországi Föderáció',
			pl: 'Rosja',
			sq: 'Rusi',
			url: 'http://news.zborg.ru'
		},
		it: {
			it: 'Italia',
			en: 'Italy',
			ro: 'Italia',
			ru: 'Италия',
			bg: 'Италия',
			cs: 'Itálie',
			hu: 'Olaszország',
			pl: 'Włochy',
			sq: 'Itali',
			url: 'http://news.ournet.it'
		}
	}
};

var data = {};

module.exports = function(country) {
	if (!country) {
		throw new Error('Loading config for NO country');
	}
	if (!data[country]) {
		data[country] = _.assign({}, config, require('./' + country + '.json'));
	}

	return data[country];
};
