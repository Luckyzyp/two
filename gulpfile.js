var gulp = require("gulp");
var css = require("gulp-sass");
var mincss = require("gulp-clean-css");
var uglify = require("gulp-uglify");
var server = require("gulp-webserver");
var url = require("url");
var fs = require("fs");
var path = require("path");
var data = require("./src/data.json");
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
gulp.task("devServer", function() {
        return gulp.src("./src")
            .pipe(server({
                port: 8090,
                middleware: function(req, res, next) {
                    var pathname = url.parse(req.url).pathname;
                    if (pathname === "/favicon.ico") {
                        res.end();
                        return;
                    }
                    if (pathname === "/") {
                        res.end(fs.readFileSync(path.join(__dirname, "src", "index.html")));
                    } else if (pathname === "/api/datajson") {
                        var query = url.parse(req.url, true).query;
                        var arr = [];
                        if (query.val === "") {
                            arr = [];
                        } else {
                            data.forEach(function(v) {
                                if (v.match(query.val)) {
                                    arr.push(v);
                                }
                            })
                        }
                        res.end(JSON.stringify({ code: 1, data: arr }));
                    } else {
                        res.end(fs.readFileSync(path.join(__dirname, "src", pathname)));
                    }
                }
            }))
    })
    //整理合并
gulp.task("dev", gulp.series("mincss", "devServer", "minjs", "watch"));