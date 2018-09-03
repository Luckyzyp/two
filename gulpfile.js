var gulp = require("gulp");
var css = require("gulp-sass");
var mincss = require("gulp-clean-css");
var uglify = require("gulp-uglify");
var server = require("gulp-webserver");
var url = require("url");
var fs = require("fs");
var path = require("path");
//转义并且压缩代码scss
gulp.task("mincss", function() {
        return gulp.src("./src/scss/*.scss")
            .pipe(css())
            .pipe(mincss())
            .pipe(gulp.dest("build/css"))
    })
    //压缩代码js
gulp.task("minjs", function() {
        return gulp.src("./src/js/*.js")
            .pipe(uglify())
            .pipe(gulp.dest("build/js"))
    })
    //监听css
gulp.task("watch", function() {
        return gulp.watch("./src/scss/*.scss", gulp.series("mincss"));
    })
    //监听js
gulp.task("watch", function() {
        return gulp.watch("./src/js/*.js", gulp.series("minjs"));
    })
    //整理合并
gulp.task("dev", gulp.series("mincss", "minjs", "watch"));