var gulp = require('gulp');
var gulputil = require('gulp-util');

// css
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var csso = require('gulp-csso');

// javascript
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglifyjs');

gulp.task('default',['uglify', 'css'], function(){

});

gulp.task('uglify', ['jshint'], function(){
	return gulp.src(['./src/js/**/*.js'], {
	})
	.pipe(uglify())
	.pipe(gulp.dest('./web/assets/js'));
});

gulp.task('jshint', function(){
	return gulp.src(['./src/js/**/*.js','!src/js/lib/*.js'])
	.pipe(jshint())
	.pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('css', function () { 
	return gulp.src('./src/scss/*.scss')
	.pipe(sass())
	.pipe(minifyCss())
	.pipe(csso())
	.pipe(gulp.dest('./web/assets/css')); 
});
