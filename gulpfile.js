var gulp = require('gulp');
var gulputil = require('gulp-util');

// html
var htmlhint = require('gulp-htmlhint');
var minifyHtml = require('gulp-minify-html');

// css
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var csso = require('gulp-csso');

// javascript
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglifyjs');

gulp.task('default',['uglify', 'minify-css', 'minify-html'], function(){

});

gulp.task('watch', function(){
	gulp.watch('./src/js/**/*.js', function(e){
		gulp.run('uglify');
	});

	gulp.watch('./src/html/**/*.html', function(e){
		gulp.run('minify-html');
	});

	gulp.watch('./src/scss/**/*.scss', function(e){
		gulp.run('minify-css');
	});
});

gulp.task('uglify', ['js-hint'], function(){
	return gulp.src(['./src/js/**/*.js'], {
	})
	.pipe(uglify())
	.pipe(gulp.dest('./web/assets/js'));
});

gulp.task('js-hint', function(){
	return gulp.src(['./src/js/**/*.js','!src/js/lib/*.js'])
	.pipe(jshint())
	.pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('minify-html', ['html-hint'],function(){
	return gulp.src(['./src/html/**/*.html'])
	.pipe(minifyHtml())
	.pipe(gulp.dest('./web'))
})

gulp.task('html-hint', function(){
	return gulp.src(['./src/html/**/*.html'])
	.pipe(htmlhint())
	.pipe(htmlhint.reporter())
})

gulp.task('minify-css', function () { 
	return gulp.src('./src/scss/*.scss')
	.pipe(sass())
	.pipe(minifyCss())
	.pipe(csso())
	.pipe(gulp.dest('./web/assets/css')); 
});
