const gulp = require('gulp');
const pug = require('gulp-pug');
const less = require('gulp-less');
const minifyCSS = require('gulp-csso');
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();

function html() {
  return gulp.src('./src/pug/pages/*.pug')
    .pipe(pug())
	.pipe(gulp.dest('./dist'))
	.pipe(browserSync.stream());
}

function style() {
	return gulp.src('./src/less/*.less')
		.pipe(less())
		.pipe(minifyCSS())
		.pipe(gulp.dest('./dist/css'))
		.pipe(browserSync.stream());
}

function javascript() {
  return gulp.src('./src/js/*.js', { sourcemaps: true })
    .pipe(concat('theme.min.js'))
	.pipe(gulp.dest('./dist/js', { sourcemaps: true }))
	.pipe(browserSync.stream());
}

function watch() {
	browserSync.init({
		server: {
			baseDir: './dist/'
		}
	});

	gulp.watch('./src/less/**/*.less', style);
	gulp.watch('./src/pug/**/*.pug', html);
	gulp.watch('./src/js/*.js', javascript);
}

exports.javascript = javascript;
exports.style = style;
exports.html = html;
exports.watch = watch;