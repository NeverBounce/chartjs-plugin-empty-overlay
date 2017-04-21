var argv = require('yargs').argv
var gulp = require('gulp');
var eslint = require('gulp-eslint');
var insert = require('gulp-insert');
var file = require('gulp-file');
var rename = require('gulp-rename');
var replace = require('gulp-replace');
var streamify = require('gulp-streamify');
var uglify = require('gulp-uglify');
var gutil = require('gulp-util');
var zip = require('gulp-zip');
var merge = require('merge2');
var path = require('path');
var package = require('./package.json');

var srcDir = './src/';
var outDir = './dist/';
var samplesDir = './samples/';

var date = new Date();
var header = "/*!\n\
 * " + package.name + "\n\
 * http://neverbounce.com/\n\
 * Version: {{ version }}\n\
 *\n\
 * Copyright " + date.getUTCFullYear() + " NeverBounce\n\
 * Released under the MIT license\n\
 * https://github.com/neverbounce/chartjs-plugin-empty-overlay/blob/master/LICENSE.md\n\
 */\n";

gulp.task('build', buildTask);
gulp.task('lint', lintTask);
gulp.task('package', packageTask);
gulp.task('default', ['build']);

function watch(glob, task) {
    gutil.log('Waiting for changes...');
    return gulp.watch(glob, function(e) {
      gutil.log('Changes detected for', path.relative('.', e.path), '(' + e.type + ')');
      var r = task();
      gutil.log('Waiting for changes...');
      return r;
    });
}

function buildTask() {
  var task = function() {
    return gulp.src(srcDir + 'plugin.js')
      .pipe(rename(package.name + '.js'))
      .pipe(insert.prepend(header))
      .pipe(streamify(replace('{{ version }}', package.version)))
      .pipe(gulp.dest(outDir))
      .pipe(rename(package.name + '.min.js'))
      .pipe(streamify(uglify({ preserveComments: 'license' })))
      .pipe(gulp.dest(outDir));
  };

  if (argv.watch) {
    return task(), watch(srcDir + '**/*.js', task);
  } else {
    return task();
  }
}

function lintTask() {
  var files = [
    srcDir + '**/*.js',
    samplesDir + '**/*.js'
  ];

  return gulp.src(files)
    .pipe(eslint({fix: true}))
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
}

function packageTask() {
  return merge(
      // gather "regular" files landing in the package root
      gulp.src([outDir + '*.js', 'LICENSE.md']),

      // dist files in the package are in the root, so we need to rewrite samples
      // src="../dist/ to src="../ and then copy them in the /samples directory.
      gulp.src(samplesDir + '**/*', { base: '.' })
        .pipe(streamify(replace('src="../dist/', 'src="../')))
  )
  // finally, create the zip archive
  .pipe(zip(package.name + '.zip'))
  .pipe(gulp.dest(outDir));
}