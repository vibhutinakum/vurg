var gulp = require('gulp');
var concat = require('gulp-concat');
var gulpSequence = require('gulp-sequence');
var del = require('del');
var minify = require('gulp-minifier');
var cleanCSS = require('gulp-clean-css');
var stripCssComments = require('gulp-strip-css-comments');
var sass = require('gulp-sass');
var watch = require('gulp-watch');
var livereload = require('gulp-livereload');
var swiperslider = require('swiper');

var PATHS = {
    appCSS: ['assets/scss/main.scss'],
    images: ['assets/images/*.!(db)'],
    appJS: ['assets/js/general.js']
}

gulp.task('clean', function() {
    return del([
        'public/css/main.css',
        'public/js/main.js',
        'public/js/vendor.js'
        ]);
});

gulp.task('sass', function() {
	return gulp.src(PATHS.appCSS)
	.pipe(sass())
	.pipe(concat('main.css'))
	.pipe(cleanCSS({ compatibility: 'ie8' }))
	.pipe(stripCssComments({ preserve: false }))
	.pipe(minify({ minify: true, minifyCSS: true }))
	.pipe(gulp.dest('public/css'))
	.on('end', function() {
		livereload.changed('main.css');
	})
});

gulp.task('images', function() {
    return gulp.src(PATHS.images)
    .pipe(gulp.dest('public/images'));
});

gulp.task('customJS', function() {
    return gulp.src(PATHS.appJS)
    .pipe(concat('main.js'))
    .pipe(minify({ minify: true, minifyJS: true }))
    .pipe(gulp.dest('public/js/'));
});

gulp.task('livereload', function() {
    livereload.reload();
});

gulp.task('build', function(cb) {
    gulpSequence('clean', 'sass', 'customJS', 'images');
    cb();
});

gulp.task('default', gulp.series('build', function a(cb) {
    livereload.listen(35732);
    gulp.watch('assets/js/**/*.js', gulp.series('customJS'));
    gulp.watch('assets/scss/**/*.scss', gulp.series('sass'));
    gulp.watch('assets/images/*', gulp.series('images'));
    gulp.watch('assets/**', gulp.series('livereload'));
    cb();
}));