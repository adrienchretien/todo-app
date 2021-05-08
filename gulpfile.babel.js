import { resolve } from 'path';

import del from 'del';
import gulp from 'gulp';
import cleanCSS from 'gulp-clean-css';
import sass from 'gulp-sass';
import sourcemaps from 'gulp-sourcemaps';

import browserify from 'browserify';
import babelify from 'babelify';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';

const paths = {
  assets: [
    resolve(__dirname, 'dist/')
  ],
  styles: {
    src: resolve(__dirname, 'src/scss/*.scss'),
    dest: resolve(__dirname, 'dist/')
  },
  scripts: {
    src: resolve(__dirname, 'src/js/**/*.js'),
    entries: ['src/js/app.js'],
    dest: resolve(__dirname, 'dist/')
  }
};

export function clean() {
  return del(paths.assets);
}

export function styles() {
  return gulp.src(paths.styles.src)
    .pipe(sass().on('error', sass.logError))
    .pipe(cleanCSS())
    .pipe(gulp.dest(paths.styles.dest));
}

export function scripts() {
  const b = browserify({
    entries: paths.scripts.entries,
    debug: true,
    transform: [babelify]
  })

  return b.bundle()
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(paths.scripts.dest));
}

export function watch() {
  gulp.watch(paths.scripts.src, scripts);
  gulp.watch(paths.styles.src, styles);
}

export const build = gulp.series(clean, gulp.parallel(styles, scripts));

export default build;