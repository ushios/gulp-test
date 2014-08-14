var gulp = require('gulp');
var gulputil = require('gulp-util');
var sass = require('gulp-sass');

gulp.task('default', function(){
    gulp.run('sass');
});

gulp.task('sass', function () { 
    gulp.src('./assets/scss/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('./assets/css')); 
});
