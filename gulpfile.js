'use strict';
// Generated on 2014-03-07 using generator-gulp-webapp 0.0.4

var gulp = require('gulp');
var wiredep = require('wiredep').stream;

// Load plugins
var $ = require('gulp-load-plugins')();


// Styles
gulp.task('styles', function () {
  return gulp.src('app/styles/main.scss')
    .pipe($.rubySass({
      style: 'expanded',
      loadPath: ['app/bower_components']
    }))
    .pipe($.autoprefixer('last 1 version'))
    .pipe(gulp.dest('app/styles'))
    .pipe($.size());
});

// Scripts
gulp.task('scripts', function () {
  return gulp.src('app/scripts/**/*.js')
    .pipe($.jshint('.jshintrc'))
    .pipe($.jshint.reporter('default'))
    .pipe($.size());
});

// HTML
gulp.task('html', function () {
  var filter = {
    css: $.filter('styles/**/*.css'),
    js: $.filter('scripts/**/*.js')
  };
  var useref = $.useref();

  gulp.src(['app/**/*.html', '!app/bower_components/**/*.html'])
    .pipe(useref.assets())
    .pipe(filter.js)
    .pipe($.ngmin())
    .pipe($.uglify({
      mangle: false
    }))
    .pipe(filter.js.restore())
    .pipe(filter.css)
    .pipe($.minifyCss())
    .pipe(filter.css.restore())
    .pipe(useref.restore())
    .pipe(useref)
    .pipe(gulp.dest('dist'))
    .pipe($.size());

  gulp.src('app/bower_components/bootstrap/fonts/*')
    .pipe(gulp.dest('dist/fonts'));
});

// Images
gulp.task('images', function () {
  return gulp.src('app/images/**/*')
    .pipe($.cache($.imagemin({
      optimizationLevel: 3,
      progressive: true,
      interlaced: true
    })))
    .pipe(gulp.dest('dist/images'))
    .pipe($.size());
});

// Clean
gulp.task('clean', function () {
  return gulp.src(['dist'], {read: false}).pipe($.clean());
});

// Build
gulp.task('build', ['styles', 'html', 'images']);

// Default task
gulp.task('default', ['clean'], function () {
  gulp.start('build');
});

// Connect
gulp.task('connect', $.connect.server({
  root: ['app'],
  port: 9000,
  livereload: true
}));

// Inject Bower components
gulp.task('wiredep', function () {
  gulp.src('app/styles/*.scss')
    .pipe(wiredep({
      directory: 'app/bower_components',
      ignorePath: 'app/bower_components/'
    }))
    .pipe(gulp.dest('app/styles'));

  gulp.src('app/*.html')
    .pipe(wiredep({
      directory: 'app/bower_components',
      ignorePath: 'app/'
    }))
    .pipe(gulp.dest('app'));
});

// Watch
gulp.task('watch', ['connect'], function () {
  // Watch for changes in `app` folder
  gulp.watch([
    'app/*.html',
    'app/styles/**/*.css',
    'app/scripts/**/*.js',
    'app/images/**/*'
  ], function(event) {
    return gulp.src(event.path)
      .pipe($.connect.reload());
  });

  // Watch .scss files
  gulp.watch('app/styles/**/*.scss', ['styles']);

  // Watch .js files
  gulp.watch('app/scripts/**/*.js', ['scripts']);

  // Watch bower files
  gulp.watch('bower.json', ['wiredep']);
});
