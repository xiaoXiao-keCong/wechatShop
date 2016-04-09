var gulp = require('gulp'),
    jshint = require('gulp-jshint'), // 语法检查
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'), //合并文件
    less = require('gulp-less'),
    minifycss = require('gulp-minify-css'),
    rename = require('gulp-rename');

// 压缩js文件
gulp.task('buildJs', function () {
	return gulp.src('src/js/*.js')
	    .pipe(jshint())
	    .pipe(jshint.reporter('default'))
	    .pipe(uglify())
	    .pipe(concat('app.js'))
	    .pipe(gulp.dest('build/js'));
});

// 编译less文件并压缩
gulp.task('buildLess', function () {
    return gulp.src('src/less/*.less')
        .pipe(less())
        .pipe(minifycss())
        .pipe(concat('app.min.css'))
        .pipe(gulp.dest('build/css'));
});

gulp.task('watchLess', function () {
    gulp.watch('src/less/*.less', ['buildLess']);
});