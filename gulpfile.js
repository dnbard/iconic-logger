var watchify = require('watchify');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var gutil = require('gulp-util');
var sourcemaps = require('gulp-sourcemaps');
var assign = require('lodash.assign');

var gulp = require('gulp'),
    DataUri = require('datauri'),
    fs = require('fs'),
    path = {
        icons: './icons',
        iconsOutput: './src/icons.js'
    };

// add custom browserify options here
var customOpts = {
  entries: ['./src/source.js'],
  debug: false
};
var opts = assign({}, watchify.args, customOpts);
var b = watchify(browserify(opts));

// add transformations here
// i.e. b.transform(coffeeify);

gulp.task('build:js', ['build:images'], bundle); // so you can run `gulp js` to build the file
b.on('update', bundle); // on any dep update, runs the bundler
b.on('log', gutil.log); // output build logs to terminal

function bundle() {
  return b.bundle()
    // log errors if they happen
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .pipe(source('loge.js'))
       // Add transformation tasks to the pipeline here.
    .pipe(gulp.dest('./dist'));
}

gulp.task('build:images', function(){
    fs.readdir(path.icons, function(err, files){
        var nameRegexp = /\.[a-z0-9]*/i,
            sizeRegexp = /[-|_]([0-9]*)\./i,
            content = files.map(function(file){
            var dUri =  new DataUri(path.icons + '/' + file);

            return {
                path: dUri.content,
                name: file.replace(nameRegexp, ''),
                size: sizeRegexp.test(file) ? file.match(sizeRegexp)[1] : 16
            }
        });

        fs.writeFile(path.iconsOutput, 'module.exports=' + JSON.stringify(content), function(err){
            if (err) throw err;
        });
    });
});

gulp.task('default', ['build:js'], function(){
    gulp.watch(['src/**/*.js', 'icons/**/*'], ['build:js']);
});
