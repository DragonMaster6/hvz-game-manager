var browserify = require('browserify');
var gulp = require('gulp');
var clean = require('gulp-clean');
var sass = require('gulp-sass');
var source = require('vinyl-source-stream');

/** Variables holding data about the project structure **/
var basePath = 'app';
var resources = {
  js: basePath + '/src/**/*.js',
  sass: basePath + '/src/assets/sass/**/*.scss',
  html: basePath + '/**/*.html',
}

var entryPoints = {
  sass: basePath + '/src/assets/sass/app.scss',
  js: basePath + '/src/index.js',
}

var destination = {
  dev: {
    src: 'dev',
    html: 'dev',
    js: 'dev',
    css: 'dev/assets/css'
  },
  prod: {
    src: 'dist',
    html: 'dist',
    js: 'dist',
    css: 'dist/assets/css'
  }
}

/** Functions to be used in gulp tasks **/
// var outputSource = function(options) {}

// Compiles sass into css and returns the stream. Doesn't create files.
var compileSass = function(dest) {
  return gulp.src(entryPoints.sass)
    .pipe(sass().on('error', sass.logError))
}

var compileSassDev = function() {
  return compileSass()
    .pipe(gulp.dest(destination.dev.css));
}

var compileSassProd = function() {
  return compileSass()
    .pipe(gulp.dest(destination.prod.css));
}

// Combines all javascript files into one file and creates a source map.
var compileJs = function() {
  return browserify({entries: entryPoints.js, debug: true}).bundle()
    .pipe(source('app.js'))
}

var compileJsDev = function() {
  return compileJs()
    .pipe(gulp.dest(destination.dev.js));
}

var compileJsProd = function() {
  return compileJs()
    .pipe(gulp.dest(destination.prod.js));
}

// Copies over html to the proper destination.
var copyHtml = function() {
  return gulp.src(resources.html)
}

var copyHtmlDev = function() {
  return copyHtml()
    .pipe(gulp.dest(destination.dev.html));
}

var copyHtmlProd = function() {
  return copyHtml()
    .pipe(gulp.dest(destination.prod.html));
}

var cleanDev = function() {
  return gulp.src(destination.dev.src)
    .pipe(clean());
}

/** Gulp tasks to build the application **/
gulp.task('sass:dev', compileSassDev);
gulp.task('build:dev', gulp.series(compileSassDev, compileJsDev, copyHtmlDev));
gulp.task('build:dev:js', compileJsDev);
gulp.task('clean:dev', cleanDev);





// // Task that compiles all the sass into css
// gulp.task('sass', function(){
//   gulp.src('app/assets/sass/app.scss')
//     .pipe(sass().on('error', sass.logError))
//     .pipe(gulp.dest('app/assets/css/'));
// });
//
// // Watchful tasks
// gulp.task('sass-watch', function(){
//   gulp.watch('app/assets/sass/*.scss', ['sass']);
// });
