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

gulp.task('default', ['build', 'watch']);