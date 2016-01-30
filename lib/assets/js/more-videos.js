(function(doc) {
	'use strict';

	function getParams($el) {
		var last = $el.data('last').split('|');
		var category = $el.data('category');
		var limit = $el.data('limit') || 15;
		return {
			limit: limit,
			category: category,
			'startKey.id': last[0],
			'startKey.createdAt': last[1]
		};
	}

	function getVideos(params, cb) {
		$.ajax({
			url: '/json/videos',
			data: params,
			dataType: 'json'
		}).done(cb);
	}

	$(doc).ready(function() {
		var $el = $('#more-videos');
		$el.click(function() {
			var params = getParams($el);
			getVideos(params, function(videos) {
				render($el, videos);
				setParams($el, params, videos);
			});
		});
	});

	function render($el, videos) {
		var list = '<ul class="video-list view-main">';
		videos.forEach(function(video) {
			list += '<li class="main-item xs-cols-1 sm-cols-2 md-cols-3"><div class="main-inner">';
			list += '<a href="/video/' + video.id + '" class="fine-image">';
			list += '<img src="https://i.ytimg.com/vi/' + video.sourceId + '/hqdefault.jpg" class="vi-img"/></a>';
			list += '<h3 class="vi-t"><a href="/video/' + video.id + '">' + video.title.substr(0, 64) + '</a></h3>';
			list += '<ul class="vi-stats"><li class="vi-views">' + video.countViews + '</li></ul>';
			list += '</li>';
		});
		list += '</ul>';

		$(list).insertBefore($el);
	}

	function setParams($el, params, videos) {
		if (videos && videos.length === params.limit) {
			var last = videos[videos.length - 1];
			$el.data('last', [last.id, last.createdAt].join('|'));
		} else {
			$el.hide();
		}
	}

})(document);
