var gulp = require('gulp');
var rename = require('gulp-rename');
var browserify = require('browserify');
var babelify = require('babelify');
var es6ify = require('es6ify');
var reactify = require('reactify');
var source = require('vinyl-source-stream');


// TODO: Split vendor code to application

/**
gulp.watch('templates/*.tmpl.html', ['build']);
  * */

// Build the application code.
gulp.task('build', function() {
  return browserify({
    entries: ['frontend/App.jsx'],
    extensions: ['jsx'],
    debug: true
  })
  .transform('babelify', {presets: ['es2015', 'react']})
  .bundle()
  .pipe(source('bundle.js'))
  .pipe(gulp.dest('public/js'));
})

// Entry point
gulp.task('default', ['build'], function() {
  gulp.watch('frontend/*.jsx', ['build'])
});
