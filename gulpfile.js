"use strict";

var gulp = require("gulp");
var sass = require("gulp-sass");
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var posthtml = require("gulp-posthtml");
var include = require("posthtml-include");
var autoprefixer = require("autoprefixer");
var minify = require("gulp-csso");
var imagemin = require("gulp-imagemin");
var webp = require("gulp-webp");
var svgstore = require("gulp-svgstore");
var rename = require("gulp-rename");
var server = require("browser-sync").create();
var run = require("run-sequence");
var concat = require('gulp-concat');
var uglify = require('gulp-uglifyjs');
var del = require("del");

gulp.task("library", function() {
  return gulp.src("js/library/*.js")
  .pipe(concat("library.js"))
  .pipe(gulp.dest('build/js'))
  //.pipe(rename("script.min.js"))
  //.pipe(gulp.dest('build/js'));
});

gulp.task("module", function() {
  return gulp.src("js/module/*.js")
  .pipe(concat("module.js"))
  .pipe(gulp.dest('build/js'))
  //.pipe(rename("script.min.js"))
  //.pipe(gulp.dest('build/js'));
});

gulp.task("json", function() {
  return gulp.src("json/*.json")
  .pipe(gulp.dest('build/json'))
});

gulp.task("style", function() {
  gulp.src("sass/style.scss")
    .pipe(plumber())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(gulp.dest("build/css"))
    .pipe(minify())
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest("build/css"))
    .pipe(server.stream());
});

gulp.task("images", function() {
  return gulp.src("img/**/*.{png,jpg,svg}")
    .pipe(imagemin([
      imagemin.optipng({ optimizationLevel: 3 }),
      imagemin.jpegtran({ progressive: true }),
      imagemin.svgo()
    ]))
    .pipe(gulp.dest("img"));
});

gulp.task("webp", function() {
  return gulp.src("img/**/*.{png,jpg}")
    .pipe(webp({ quality: 90 }))
    .pipe(gulp.dest("img"));
});

gulp.task("sprite", function() {
  return gulp.src(["img/svg/*.svg"])
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("build/img"));
});

gulp.task("html", function() {
  return gulp.src("*.html")
    .pipe(posthtml([
      include()
    ]))
    .pipe(gulp.dest("build"));
});

gulp.task("copy", function() {
  return gulp.src([
      "fonts/**/*.{woff,woff2,ttf}",
      "img/**",
      "js/**"
    ], {
      base: "."
    })
    .pipe(gulp.dest("build"));
});

gulp.task("clean", function() {
  return del("build");
});

/*gulp.task("cleanTwo", function() {
  return del(["build/js/*.js", "!build/js/script.js", "!build/js/script.min.js"]);
});*/

gulp.task("serve", ["style"], function() {
  server.init({
    server: "build/"
  });

  gulp.watch("sass/**/*.{scss,sass}", ["style"])
  gulp.watch("*.html", ["html"])
  gulp.watch('js/**/*.js', ["script"])
    .on("change", server.reload);
});

gulp.task("build", function(done) {
  run(
    "clean",
    "copy",
    "style",
    "sprite",
    "html",
    "library",
    "module",
    "json",
    /*"cleanTwo",*/
    done);
});