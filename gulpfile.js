var gulp = require('gulp');
var gulputil = require('gulp-util');

// css
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var csso = require('gulp-csso');

gulp.task('default',['css'], function(){

});

gulp.task('css', function () { 
    gulp.src('./assets/scss/*.scss')
    .pipe(sass())
	.pipe(minifyCss())
    .pipe(csso())
    .pipe(gulp.dest('./assets/css')); 
});
