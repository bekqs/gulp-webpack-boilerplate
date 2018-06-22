const gulp = require('gulp');
const webpack = require('webpack-stream');
const watch = require('gulp-watch');
const named = require('vinyl-named');
const sass = require('gulp-sass');
const neat = require('bourbon-neat').includePaths;
const wait = require('gulp-wait');
const autoprefixer = require('gulp-autoprefixer');
const imagemin = require('gulp-imagemin');
const del = require('del');

const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';

// Paths
const paths = {
    js: {
        input: './src/scripts/**/*.js',
        output: './dist'
    },
    sass: {
        input: './src/scss/**/*.scss',
        output: './dist/css/'
    },
    images: {
        input: 'src/images/*',
        output: 'dist/images'
    }
}

// Tasks
gulp.task('webpack', () => {
    return gulp
        .src(paths.js.input)
        .pipe(named())
        .pipe(webpack(require('./webpack.config.js')))
        .pipe(gulp.dest(paths.js.output));
});

gulp.task('sass', () => {
    return gulp
        .src(paths.sass.input)
        .pipe(wait(500))
        .pipe(named())
        .pipe(sass({
            outputStyle: 'compressed',
            sourcemaps: true,
            includePaths: neat
        }).on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(gulp.dest(paths.sass.output));
});

gulp.task('imagemin', () => {
    gulp.src(paths.images.input)
    .pipe(imagemin())
    .pipe(gulp.dest(paths.images.output))
});

gulp.task('watch', () => {
    gulp.watch(paths.js.input, gulp.series('webpack'));
    gulp.watch(paths.sass.input, gulp.series('sass'));
});

gulp.task('clean', () => {
    return del('dist');
});

gulp.task('default', 
    gulp.series('clean', gulp.parallel('webpack', 'sass', 'imagemin', 'watch'))
);