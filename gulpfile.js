var gulp = require('gulp');
var webpack = require('webpack-stream');
var watch = require('gulp-watch');
var named = require('vinyl-named');
var sass = require('gulp-sass');
var neat = require('bourbon-neat').includePaths;
var wait = require('gulp-wait');
var autoprefixer = require('gulp-autoprefixer');
var imagemin = require('gulp-imagemin');
// paths
var jsInput = './src/scripts/app.js';
var jsOutput = './dist';
var sassInput = './src/scss/*.scss';
var sassOutput =  './dist/css/';

gulp.task('default', ['webpack', 'sass', 'imagemin', 'watch']);

gulp.task('webpack', function() {
    return gulp
        .src(jsInput)
        .pipe(named())
        .pipe(webpack(require('./webpack.config.js')))
        .pipe(gulp.dest(jsOutput));
});

gulp.task('sass', function () {
    return gulp
        .src(sassInput)
        .pipe(wait(500))
        .pipe(named())
        .pipe(sass({
            outputStyle: 'compressed',
            sourcemaps: true,
            includePaths: neat
        }).on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(gulp.dest(sassOutput));
});

gulp.task('imagemin', function() {
    gulp.src('src/images/*')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/images'))
});

gulp.task('watch', function() {
    gulp.watch('./src/scripts/**/*.js', ['webpack']);
    gulp.watch('./src/scss/**/*.scss', ['sass']);
});