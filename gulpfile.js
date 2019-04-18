
const gulp = require('gulp');
const ttf2woff2 = require('gulp-ttf2woff2');
 
gulp.task('ttf2woff2', function(){
  gulp.src(['src/assets/fonts/**/*.ttf'])
    .pipe(ttf2woff2())
    .pipe(gulp.dest('src/assets/fonts/'));
});

gulp.task('default', ['ttf2woff2']);