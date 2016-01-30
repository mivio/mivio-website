'use strict';

var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var rename = require('gulp-rename');
// var sourcemaps = require('gulp-sourcemaps');
var del = require('del');
var less = require('gulp-less');
var mincss = require('gulp-minify-css');
// var path = require('path');
var RevAll = require('gulp-rev-all');
var merge = require('merge-stream');

var paths = {
	src: {
		less: {
			main: ['less/main.less'],
			iframe: ['less/iframe.less']
		},
		img: './img/**/*',
		js: {
			main: ['js/more-videos.js', '../../node_modules/jquery-lazyload/jquery.lazyload.js']
		}
	},
	dest: {
		img: '../public/assets/img',
		css: '../public/assets/css',
		js: '../public/assets/js'
	}
};

// Not all tasks need to use streams
// A gulpfile is just another node program and you can use all packages available on npm
gulp.task('clean', function(cb) {
	// You can use multiple globbing patterns as you would with `gulp.src`
	del(['build'], cb);
});

gulp.task('scripts', function() {
	// Minify and copy all JavaScript (except vendor scripts)
	// with sourcemaps all the way down
	return gulp.src(paths.src.js.main)
		// .pipe(sourcemaps.init())
		// .pipe(uglify())
		.pipe(concat('main.js'))
		// .pipe(sourcemaps.write())
		.pipe(gulp.dest(paths.dest.js))
		.pipe(uglify())
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(gulp.dest(paths.dest.js))
});

gulp.task('less-main-dev', function() {
	return gulp.src(paths.src.less.main)
		.pipe(less())
		.pipe(concat('main.css'))
		.pipe(gulp.dest(paths.dest.css));
});

gulp.task('less', function() {

	// var revAll = new RevAll();
	var mainCss = gulp.src(paths.src.less.main)
		.pipe(less())
		.pipe(concat('main.css'))
		.pipe(gulp.dest(paths.dest.css))
		.pipe(mincss({
			processImport: false
		}))
		.pipe(rename({
			suffix: '.min'
		}))
		// .pipe(revAll.revision())
		.pipe(gulp.dest(paths.dest.css));

	var iframeCss = gulp.src(paths.src.less.iframe)
		.pipe(less())
		.pipe(concat('iframe.css'))
		.pipe(gulp.dest(paths.dest.css))
		.pipe(mincss({
			processImport: false
		}))
		.pipe(rename({
			suffix: '.min'
		}))
		// .pipe(revAll.revision())
		.pipe(gulp.dest(paths.dest.css));

	return merge(mainCss, iframeCss);
});

// Copy all static images
gulp.task('images', function() {
	return gulp.src(paths.src.img)
		// Pass in options to the task
		.pipe(imagemin({
			optimizationLevel: 5
		}))
		.pipe(gulp.dest(paths.dest.img));
});

// Copy all static images
gulp.task('favicon', function() {
	return gulp.src('../public/favicon.ico')
		.pipe(imagemin({
			optimizationLevel: 5
		}))
		.pipe(gulp.dest('../public/favicon.ico'));
});

// // Rerun the task when a file changes
// gulp.task('watch', function() {
//   gulp.watch(paths.scripts, ['scripts']);
//   gulp.watch(paths.images, ['images']);
// });

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['less', 'scripts', 'images']);

// gulp.task('favicon', ['favicon']);
