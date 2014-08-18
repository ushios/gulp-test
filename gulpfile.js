var gulp = require('gulp');
var gulputil = require('gulp-util');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');

gulp.task('default',['css'], function(){

});

gulp.task('css', function () { 
    gulp.src('./assets/scss/*.scss')
    .pipe(sass())
	.pipe(minifyCss())
    .pipe(gulp.dest('./assets/css')); 
});
