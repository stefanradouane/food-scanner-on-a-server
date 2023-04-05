const gulp = require('gulp');

return gulp
  .src(['./src/assets/**/*.*', './service-worker.js', './src/manifest.json'])

  .pipe(gulp.dest('./public/'));
