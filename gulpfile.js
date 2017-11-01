var gulp = require('gulp');
var babelify = require('babelify');
var browserify = require('browserify');
var buffer = require('vinyl-buffer');
var concat = require('gulp-concat');
var del = require('del');
var es6ify = require('es6ify');
var reactify = require('reactify');
var rename = require('gulp-rename');
var source = require('vinyl-source-stream');
var sourcemaps = require('gulp-sourcemaps');
var stylus = require('gulp-stylus');

const vendors = ['react'];

// Compile stylus into css
gulp.task('styles', function() {
  return gulp.src('frontend/*.styl')
    .pipe(concat('styles.css'))
    .pipe(sourcemaps.init())
    .pipe(stylus())
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest('public/css'));
});

// Build just vendor code so we don't have to rebuild all on app changes.
gulp.task('vendor', function() {
  const build = browserify({
    debug: true
  });

  vendors.forEach(lib => build.require(lib));

  build.bundle()
    .pipe(source('vendor.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest('public/js'));
});

// Build the application code.
gulp.task('build', function() {
  const build = browserify({
    entries: ['frontend/App.jsx'],
    extensions: ['jsx'],
    debug: true
  });

  build.external(vendors);
  build.transform('babelify', {presets: ['es2015', 'react']});

  build.bundle()
  .pipe(source('bundle.js'))
  .pipe(buffer())
  .pipe(sourcemaps.init({loadMaps: true}))
  .pipe(sourcemaps.write('./maps'))
  .pipe(gulp.dest('public/js'));
});

// Cleanup
gulp.task('clean', function() {
  return del(['public/js/*', 'public/css/*']);
});

// Entry point
gulp.task('default', ['styles', 'build'], function() {
  gulp.watch('frontend/*.jsx', ['build']);
  gulp.watch('frontend/*.styl', ['styles'])
});
