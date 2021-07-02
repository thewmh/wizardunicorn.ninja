'use strict';
const {dest, src, watch, series, parallel} = require('gulp');
const concat = require('gulp-concat');
const plumber = require('gulp-plumber');
const terser = require('gulp-terser');

// Transpile, concatenate and minify scripts
function js() {
  return src('./assets/js/**/*', {sourcemaps: false})
      .pipe(plumber())
      .pipe(terser())
      .pipe(concat('wizardUnicornNinja.js'))
      .pipe(dest('./assets/js', {sourcemaps: '.'}))
}

exports.js = js;
