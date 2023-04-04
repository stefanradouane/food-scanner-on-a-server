const gulp = require('gulp');
const revReplace = require('gulp-rev-replace');

gulp
  .src(['./public/service-worker.js'])
  .pipe(
    revReplace({
      manifest: gulp.src('./public/rev-manifest.json'),
    })
  )
  .pipe(gulp.dest('./public'));
