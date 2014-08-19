var gulp = require('gulp');
var gulputil = require('gulp-util');
var concat = require('gulp-concat');
var plumber = require('gulp-plumber');
var connect = require('gulp-connect');

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

var onError = function (err) {  
	gulputil.beep();
	console.log(err);
};

gulp.task('default',['uglify', 'minify-css', 'minify-html'], function(){

});

gulp.task('connect', ['pre-connect'], function(){
	gulp.watch(__dirname + '/src/js/**/*.js', function(e){
		gulp.run('uglify');
		gulp.src(e.path).pipe(connect.reload());
	});

	gulp.watch(__dirname + '/src/html/**/*.html', function(e){
		gulp.run('minify-html');
		gulp.src(e.path).pipe(connect.reload());
	});

	gulp.watch(__dirname + '/src/scss/**/*.scss', function(e){
		gulp.run('minify-css');
		gulp.src(e.path).pipe(connect.reload());
	});
});

gulp.task('watch', ['default'], function(){
	gulp.watch(__dirname + '/src/js/**/*.js', function(e){
		gulp.run('uglify');
	});

	gulp.watch(__dirname + '/src/html/**/*.html', function(e){
		gulp.run('minify-html');
	});

	gulp.watch(__dirname + '/src/scss/**/*.scss', function(e){
		gulp.run('minify-css');
	});
});

gulp.task('uglify', ['js-hint'], function(){
	return gulp.src([__dirname + '/src/js/lib/*.js', __dirname + '/src/js/**/*.js'], {
	})
	.pipe(concat('main.js'))
	.pipe(plumber())
	.pipe(uglify())
	.pipe(gulp.dest(__dirname + '/web/assets/js'));
});

gulp.task('js-hint', function(){
	return gulp.src([__dirname + '/src/js/**/*.js','!'+ __dirname + '/src/js/lib/*.js'])
	.pipe(jshint())
	.pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('minify-html', ['html-hint'],function(){
	return gulp.src([__dirname + '/src/html/**/*.html'])
	.pipe(minifyHtml())
	.pipe(gulp.dest(__dirname + '/web'))
})

gulp.task('html-hint', function(){
	return gulp.src([__dirname + '/src/html/**/*.html'])
	.pipe(htmlhint())
	.pipe(htmlhint.reporter())
})

gulp.task('minify-css', function () { 
	return gulp.src(__dirname + '/src/scss/*.scss')
	.pipe(plumber({errorHandler: onError}))
	.pipe(sass())
	.pipe(minifyCss())
	.pipe(csso())
	.pipe(gulp.dest(__dirname + '/web/assets/css')); 
});

gulp.task('pre-connect', ['default'], function() {
	connect.server({
		root: [__dirname + '/web/'],
		port: 9001,
		livereload: true
	});
});
