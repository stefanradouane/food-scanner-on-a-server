const gulp = require('gulp');
const filter = require('gulp-filter');
const rev = require('gulp-rev');
const override = require('gulp-rev-css-url');

gulp
  .src([`./public/**/*.{css,js}`])
  .pipe(filter((file) => !file.path.endsWith('/service-worker.js')))
  .pipe(rev())
  .pipe(override())
  .pipe(gulp.dest(`./public/`))
  .pipe(rev.manifest('rev-manifest.json'))
  .pipe(gulp.dest(`./public/`));
