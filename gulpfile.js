'use strict';
const gulp = require('gulp');
const {dest, src, watch, series, parallel} = require('gulp');
const clean = require('gulp-clean');``
const concat = require('gulp-concat');
const plumber = require('gulp-plumber');
const terser = require('gulp-terser');

function del() {
  return src('./assets/js/wizardUnicornNinja.js', {read: false})
    .pipe(clean())
}

// Transpile, concatenate and minify scripts
function js() {
  return src('./assets/js/**/*', {sourcemaps: false})
      .pipe(plumber())
      .pipe(terser())
      .pipe(concat('wizardUnicornNinja.js'))
      .pipe(dest('./assets/js', {sourcemaps: '.'}))
}

exports.scripts = gulp.series(del, js);
