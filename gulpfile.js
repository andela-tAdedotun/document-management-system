const gulp = require('gulp');
const eslint = require('gulp-eslint');
const nodemon = require('gulp-nodemon');
const browserSync = require('browser-sync');
const babel = require('gulp-babel');
const coveralls = require('gulp-coveralls');

gulp.task('lint', () =>
  gulp.src(['**/*.js', '!node_modules/**'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
);

gulp.task('serve', () => {
  const stream = nodemon({ script: 'server.js',
    ext: 'html js',
    ignore: ['ignored.js'],
  });

  stream
    .on('restart', () => {
      console.log('App restarted due to changes.');
    })
    .on('crash', () => {
      console.error('Application has crashed!\n');
      stream.emit('restart', 10);
    });
});

gulp.task('reload', ['serve'], () => {
  browserSync.init(null, {
    proxy: 'http://localhost:3000',
    port: 5000,
    files: ['client/**/**'],
  });
});

gulp.task('transpile', () => {
  return gulp.src('server.js')
        .pipe(babel({
          presets: ['es2015']
        }))
        .pipe(gulp.dest('transpiled'));
});

gulp.task('coveralls', () => {
  gulp.src('coverage/**/lcov.info')
    .pipe(coveralls());
});

gulp.task('default', ['reload'], () => {
  gulp.watch(['client/**/**'], browserSync.reload());
});
