/* eslint-disable no-console */

const gulp = require('gulp');
const eslint = require('gulp-eslint');
const nodemon = require('gulp-nodemon');
const browserSync = require('browser-sync');
const babel = require('gulp-babel');
const coveralls = require('gulp-coveralls');
const minify = require('gulp-minify');
const cleanCSS = require('gulp-clean-css');
const htmlmin = require('gulp-htmlmin');

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


gulp.task('jsx', () => {
  gulp.src('./client/public/js/components/*.jsx')
    .pipe(babel({
      plugins: ['transform-react-jsx']
    }))
    // .pipe(babel({
    //   presets: ['es2015']
    // }))
    .pipe(gulp.dest('client/public/js/components'));
});

gulp.task('transpile', ['jsx'], () =>
  gulp.src('client/public/js/components/homePage.js')
        .pipe(babel({
          presets: ['es2015']
        }))
        .pipe(gulp.dest('./client/dist/transpiled'))
);

gulp.task('coveralls', () => {
  gulp.src('coverage/**/lcov.info')
    .pipe(coveralls());
});

gulp.task('minify-js', () => {
  gulp.src('./client/dist/bundled/*.js')
    .pipe(minify({
      ext: {
        src: '-orig.js',
        min: '.js'
      },
      // exclude: [],
      // ignoreFiles: ['.combo.js', '-min.js']
    }))
    .pipe(gulp.dest('./client/dist/minified'));
});

gulp.task('minify-css', () =>
  gulp.src('./client/dist/bundled/*.css')
    .pipe(cleanCSS({ compatibility: 'ie8' }))
    .pipe(gulp.dest('./client/dist/minified'))
);

gulp.task('minify-html', () =>
  gulp.src('client/views/*.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('./client/dist/minified'))
);

gulp.task('minify', ['minify-js', 'minify-css']);

gulp.task('default', ['reload'], () => {
  gulp.watch(['client/**/**'], browserSync.reload());
});
