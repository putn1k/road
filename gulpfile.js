"use strict";

var gulp = require("gulp");
var less = require("gulp-less");
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var browserSync = require("browser-sync").create();
var mincss = require("gulp-csso");
var rename = require("gulp-rename");
var imagemin = require("gulp-imagemin");
var webp = require("gulp-webp");
var csscomb = require("gulp-csscomb");
var del = require("del");
var htmlmin = require("gulp-htmlmin");

var ghPages = require('gulp-gh-pages');

gulp.task('deploy', function() {
  return gulp.src("build/**/*")
    .pipe(ghPages());
});

gulp.task("clean", function () {
  return del("build");
})

gulp.task("copy", function () {
  return gulp.src([
    "source/fonts/**/*.{woff,woff2}",
    "source/img/**",
    "source/video/**",
    "source/js/**"
  ], {
    base: "source"
  })
  .pipe(gulp.dest("build"))
});

gulp.task("style", function() {
  return gulp.src("source/less/style.less")
  .pipe(plumber())
  .pipe(less())
  .pipe(postcss([
    autoprefixer()
  ]))
  .pipe(gulp.dest("build/css"))
  .pipe(csscomb())
  .pipe(gulp.dest("build/css"))
  .pipe(mincss())
  .pipe(rename("style.min.css"))
  .pipe(gulp.dest("build/css"))
  .pipe(browserSync.stream());
});

gulp.task("image", function() {
  return gulp.src("source/img/**/*.{png,jpg,jpeg,svg}")
  .pipe (imagemin([
    imagemin.optipng({optimizationLevel: 3}),
    imagemin.mozjpeg({progressive: true}),
    imagemin.svgo()
  ]))
  .pipe(gulp.dest("build/img"));
});

gulp.task("webp", function() {
  return gulp.src("source/img/**/*.{png,jpg,jpeg}")
  .pipe(webp({quality:80}))
  .pipe(gulp.dest("build/img/webp"));
});

gulp.task("html", function () {
  return gulp.src("source/*.html")
  .pipe(htmlmin({ collapseWhitespace: true }))
  .pipe(gulp.dest("build"));
});

gulp.task("sync", function(done) {
  browserSync.init({
    server: "build/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });
  browserSync.watch("source/*.html", gulp.series("html")).on("change", browserSync.reload);
  done();
});

gulp.task("serve", gulp.series("sync", function(done) {
  gulp.watch("source/less/**/*.less", gulp.series("style"));
  done();
}));

gulp.task("build", gulp.series(
  "clean",
  "copy",
  "html",
  "style"
));
