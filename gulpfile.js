var gulp = require('gulp')
  , jade = require('gulp-jade')
  , sass = require('gulp-sass')
  , browserify = require('gulp-browserify')
  ;

gulp.task('templates', function () {
  var locals = {

  };

  gulp.src(process.cwd() + '/src/templates/www/**/*.jade')
    .pipe(jade({
      locals  : locals,
      basedir : process.cwd() + '/src/templates',
      pretty  : true,
    }))
    .pipe(gulp.dest(process.cwd() + '/www/'));
});

gulp.task('sass', function () {
  gulp.src(process.cwd() + '/src/scss/*.scss')
    .pipe(sass())
    .pipe(gulp.dest(process.cwd() + '/www/css'));
});

gulp.task('scripts', function() {
  gulp.src(process.cwd() + '/src/js/*.js')
    .pipe(browserify({
      insertGlobals : true,
      debug         : !gulp.env.production
    }))
    .pipe(gulp.dest(process.cwd() + '/www/js'));
});

gulp.task('watch', function () {
  gulp.watch(process.cwd() + '/src/templates/**/*.jade', ['templates']);
  gulp.watch(process.cwd() + '/src/scss/**/*.scss',      ['sass']);
  gulp.watch(process.cwd() + '/src/js/**/*.js',          ['scripts']);
});

gulp.task('build', ['templates', 'sass', 'scripts']);
