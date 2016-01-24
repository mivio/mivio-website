'use strict';

var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
// var sourcemaps = require('gulp-sourcemaps');
var del = require('del');
var less = require('gulp-less');
var mincss = require('gulp-minify-css');
// var path = require('path');
var RevAll = require('gulp-rev-all');
// var awspublish = require('gulp-awspublish');

var paths = {
	src: {
		less: {
			main: ['less/main.less']
		},
		img: './img/**/*',
		js: {
			main: ['js/video.js']
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

gulp.task('scripts-main', function() {
	// Minify and copy all JavaScript (except vendor scripts)
	// with sourcemaps all the way down
	return gulp.src(paths.src.js.main)
		// .pipe(sourcemaps.init())
		// .pipe(uglify())
		.pipe(concat('main.js'))
		// .pipe(sourcemaps.write())
		.pipe(gulp.dest(paths.dest.js));
});

gulp.task('less-main-dev', function() {
	return gulp.src(paths.src.less.main)
		.pipe(less())
		.pipe(concat('main.css'))
		.pipe(gulp.dest(paths.dest.css));
});

gulp.task('less', function() {
	var revAll = new RevAll();
	return gulp.src(paths.src.less)
		.pipe(less())
		.pipe(mincss())
		.pipe(revAll.revision())
		.pipe(gulp.dest(paths.dest.css));
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
gulp.task('default', ['less-main-dev', 'scripts-main', 'images']);

// gulp.task('favicon', ['favicon']);
