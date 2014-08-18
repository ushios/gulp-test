var gulp = require('gulp');
var gulputil = require('gulp-util');

// css
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var csso = require('gulp-csso');

// javascript
var jshint = require('gulp-jshint');

gulp.task('default',['css', 'jshint'], function(){

});

gulp.task('jshint', function(){
	return gulp.src(['js/**/*.js','!js/lib/*.js'])
	.pipe(jshint())
	.pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('css', function () { 
	gulp.src('./assets/scss/*.scss')
	.pipe(sass())
	.pipe(minifyCss())
	.pipe(csso())
	.pipe(gulp.dest('./assets/css')); 
});
