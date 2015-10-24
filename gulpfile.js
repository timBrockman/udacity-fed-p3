var gulp  = require('gulp');
var browserSync = require('browser-sync').create();

// Static Server is fine
gulp.task('browser-sync', function(){
  browserSync.init({
    server: {
      baseDir:"./"}
  });
});
gulp.task('default',['browser-sync']);