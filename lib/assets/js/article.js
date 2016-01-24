(function(win, doc) {
	var charts = win.articleCharts;
	if (!charts || charts.length < 1) {
		return;
	}

	function createElement(name, src) {
		var head = doc.getElementsByTagName('head')[0];
		var element = doc.createElement(name);
		element.async = 1;
		if (name === 'link') {
			element.href = src;
			element.rel = 'stylesheet';
			element.type = 'text/css';
		} else {
			element.src = src;
		}
		head.appendChild(element);
	}

	createElement('script', '/assets/js/charts.js');
	createElement('link', '/assets/css/charts.css');

	function clearElement(selector) {
		try {
			var element = doc.querySelector(selector);
			element.innerHTML = '';
		} catch (e) {}
	}

	function createCharts() {
		for (var i = 0; i < charts.length; i++) {
			var opts = charts[i];
			clearElement(opts.selector);

			if (opts.type === 'line') {
				var options = {
					low: 0,
					showArea: true,
					plugins: [
						Chartist.plugins.ctPointLabels({
							textAnchor: 'middle',
							labelClass: 'ct-value'
						})
					]
				};
				var chart = new Chartist.Line(opts.selector, opts.data, options);
			}
		}
	}

	var time;

	function testChartist() {
		if (win.Chartist) {
			clearInterval(time);
			createCharts();
		}
	}

	time = setInterval(testChartist, 50);

})(window, document);
