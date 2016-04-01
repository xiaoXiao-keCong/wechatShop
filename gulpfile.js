var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat');

// 压缩js文件
gulp.task('buildjs', function () {
	return gulp.src('src/js/*.js')
	    .pipe(jshint())
	    .pipe(jshint.reporter('default'))
	    .pipe(uglify())
	    .pipe(concat('app.js'))
	    .pipe(gulp.dest('build'));
});
