var gulp = require('gulp');
var plumber = require('gulp-plumber');
var rename = require('gulp-rename');
var wait= require('gulp-wait');

var browserSync = require('browser-sync').create();
var reload = browserSync.reload;

var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');


// var pug = require('gulp-pug');
// var data = require('gulp-data');

// TODO: implement imagemin @1
// var imagemin = require('gulp-imagemin');

// var exec = require('child_process').exec;
// var child = require('child_process');
// var path = require('path');


// TODO: @1
// gulp.task('img', function() {
//     gulp.src('front/images/**/*')
//         .pipe(imagemin())
//         .pipe(gulp.dest('front/images'));
// });


// Static Server
// gulp.task('browserSync', function() {
//     browserSync.init({
//         // notify: false,
//         server: {
//           baseDir: [".", "_html"]
//           }
//         }
//     );
// });

// .pug with json parser
// gulp.task('pug', function buildHTML() {
//   return gulp.src('_pug/pages/*.pug')
//   .pipe(data(function() {
//     return require('./db.json');
//   }))
//   .pipe(plumber())
//   .pipe(pug({
//     pretty: true
//     // Your options in here.
//   }))
//   .pipe(gulp.dest('_html'))
//   .pipe(browserSync.reload({
//       stream: true
//   }));
// });

// sass compiler
// var bowerPath = 'bower_components'
var sassPaths = [
    '/front/sass'
//   bowerPath + '/bootstrap-sass/assets/stylesheets',
//   bowerPath + '/font-awesome/scss/',
//   bowerPath + '/material-design-lite/src/'
];

gulp.task('sass', function() {
    gulp.src('./front/sass/*.{sass,scss}')
        .pipe(sourcemaps.init())
        .pipe(wait(500))
        .pipe(sass({
            includePaths: sassPaths,
            outputStyle: ''
        }).on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: [
                "Android 2.3",
                "Android >= 4",
                "Chrome >= 20",
                "Firefox >= 24",
                "Explorer >= 8",
                "iOS >= 6",
                "Opera >= 12",
                "Safari >= 6"
            ],
            cascade: false
        }))
        .pipe(sourcemaps.write(''))
        .pipe(gulp.dest('front/css'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

// watch
gulp.task('front', ['sass'], function() {
    browserSync.init({
        // notify: false,
      server: {
        baseDir: ["./front"]
      }
    });
    // gulp.watch("_pug/**/*.pug", ['pug']);
    gulp.watch("front/sass/**/*.{sass,scss}", ['sass']);
    gulp.watch("front/js/**/*.js").on('change', reload);
    gulp.watch("front/js/**/*.html").on('change', reload);
});
