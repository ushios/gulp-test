var gulp = require('gulp');
var gulputil = require('gulp-util');
var concat = require('gulp-concat');
var plumber = require('gulp-plumber');
var webserver = require('gulp-webserver');

// html
var htmlhint = require('gulp-htmlhint');
var minifyHtml = require('gulp-minify-html');

// css
var minifyCss = require('gulp-minify-css');
var csso = require('gulp-csso');
var compass = require('gulp-compass');

// javascript
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglifyjs');

var onError = function (err) {  
	gulputil.beep();
	console.log(err);
};

var paths = {
	connectServerRoot: [__dirname + '/web/'],
	scripts: {
		all: [__dirname + '/src/js/lib/*.js', __dirname + '/src/js/**/*.js'],
		withoutLib: [__dirname + '/src/js/**/*.js','!'+ __dirname + '/src/js/lib/*.js']
	},
	scss: [__dirname + '/src/scss/**/*.scss'],
	html: [__dirname + '/src/html/**/*.html'],
	compass: {
		config: __dirname + '/src/scss/config.rb',
		scss: 'src/scss/',
		css: 'web/assets/css/',
		image: 'src/images'
	},

	destCss: __dirname + '/web/assets/css',
	destJs: __dirname + '/web/assets/js',
	destHtml: __dirname + '/web'
}

gulp.task('default',['uglify', 'minify-css', 'minify-html'], function(){

});

gulp.task('watch', ['pre-connect'], function(){
	gulp.watch(paths.scripts.all, function(e){
		gulp.start('js-watch');
	});

	gulp.watch(paths.html, function(e){
		gulp.start('html-watch');
	});

	gulp.watch(paths.scss, function(e){
		gulp.start('css-watch');
	});
});

gulp.task('js-watch', ['uglify'], function(){
	//gulp.src(paths.scripts.all).pipe(connect.reload());
});

gulp.task('html-watch', ['minify-html'], function(){
	//gulp.src(paths.html).pipe(connect.reload());
});

gulp.task('css-watch', ['minify-css'], function(){
	//gulp.src(paths.scss).pipe(connect.reload());
});

gulp.task('uglify', ['js-hint'], function(){
	return gulp.src(paths.scripts.all, {
	})
	.pipe(plumber())
	.pipe(concat('main.js'))
	.pipe(uglify({
		'preserveComments': 'some'
	}))
	.pipe(gulp.dest(paths.destJs));
});

gulp.task('js-hint', function(){
	return gulp.src(paths.scripts.withoutLib)
	.pipe(plumber())
	.pipe(jshint())
	.pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('minify-html', ['html-hint'],function(){
	return gulp.src(paths.html)
	.pipe(plumber())
	.pipe(minifyHtml())
	.pipe(gulp.dest(paths.destHtml))
})

gulp.task('html-hint', function(){
	return gulp.src(paths.html)
	.pipe(htmlhint())
	.pipe(htmlhint.reporter())
})

gulp.task('minify-css', function () { 
	return gulp.src(paths.scss)
	.pipe(plumber({errorHandler: onError}))
	.pipe(compass({
		config_file: paths.compass.config,
		comments: true,
		compressed: true,
		sass: paths.compass.scss,
		css: paths.compass.css,
		image: paths.compass.image
	}))
	.pipe(minifyCss())
	.pipe(csso())
	.pipe(gulp.dest(paths.destCss)); 
	;
});

gulp.task('pre-connect', ['default'], function() {
	gulp.src('web') //Webサーバーで表示するサイトのルートディレクトリを指定
	.pipe(webserver({
		livereload: true,
		open: true
	}));
});
