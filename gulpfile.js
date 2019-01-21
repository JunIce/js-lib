var gulp = require("gulp");
var ts = require("gulp-typescript");
var browserify = require("browserify");
var buffer = require('vinyl-buffer');
var source = require("vinyl-source-stream");
var tsProject = ts.createProject("tsconfig.json");


gulp.task("typescript", function() {
    return tsProject.src()
        .pipe(tsProject())
        .js.pipe(gulp.dest("dist"));
})

gulp.task('browserify', gulp.series("typescript", function () {
    return browserify({
            entries: './dist/app.js'
        })
        .bundle()
        .pipe(source('app.js'))
        .pipe(gulp.dest("dist/js"))

    })
);
gulp.task("default", function(){
    gulp.watch("src/**/*.ts", gulp.series('browserify'))
});
