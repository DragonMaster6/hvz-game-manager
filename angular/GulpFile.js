var gulp = require('gulp');
var sass = require('gulp-sass');

// Task that compiles all the sass into css
gulp.task('sass', function(){
  gulp.src('app/assets/sass/app.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('app/assets/css/'));
});

// Watchful tasks
gulp.task('sass-watch', function(){
  gulp.watch('app/assets/sass/*.scss', ['sass']);
});