'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var cleanCSS = require('gulp-clean-css');
var rename = require("gulp-rename");



var scssSourceFilesGlob = './src/scss/**/*.scss';
var cssDest = './dist/css';

gulp.task('sass', function () {
    return gulp.src(scssSourceFilesGlob)
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(cssDest))
});
gulp.task('minify-css',['sass'], function () {
    return gulp.src('./dist/css/*.css')
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest(cssDest));
});

gulp.task('deploy-html', function () {
   return gulp.src('./src/*.html')
       .pipe(gulp.dest('dist'), {base: './src'})
});

gulp.task('default', ['sass', 'minify-css', 'deploy-html']);

gulp.task('watch', ['default'], function () {
    gulp.watch('./src/*', ['default']);
});
