const gulp = require('gulp');
const babel = require('gulp-babel');

gulp.task('build', () =>
  gulp.src('src/*.js')
    .pipe(babel({
        presets: ['es2015']
    }))
    .pipe(gulp.dest('dist'))
);

gulp.task('watch', () => { gulp.watch('./src/*.js', ['build']) });

gulp.task('build-examples', () =>
  gulp.src('examples/src/*.js')
    .pipe(babel({
        presets: ['es2015']
    }))
    .pipe(gulp.dest('examples/dist'))
);

gulp.task('watch-examples', () => { gulp.watch('./examples/src/*.js', ['build-examples']) });

gulp.task('default', ['build', 'watch', 'build-examples', 'watch-examples']);