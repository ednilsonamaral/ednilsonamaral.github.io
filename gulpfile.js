'use strict';

// chamando as dependências
const gulp = require('gulp'),
      prefixer = require('autoprefixer-stylus'),
      browserSync = require('browser-sync'),
      cleanCss = require('gulp-clean-css'),
      concat = require('gulp-concat'),
      imagemin = require('gulp-imagemin'),
      plumber = require('gulp-plumber'),
      stylus = require('gulp-stylus'),
      uglify = require('gulp-uglify'),
      watch = require('gulp-watch'),
      jeet = require('jeet'),
      nib = require('nib'),
      rupture = require('rupture'),
      env = require('minimist')(process.argv.slice(2)),
      cp = require('child_process');

// Jekyll Build Task
gulp.task('jekyll-build', function (done) {
    browserSync.notify('Building Jekyll');

    return cp.spawn('jekyll', ['build'], {stdio: 'inherit'})
        .on('close', done);
});

// Jekyll Rebuild and Reload Browser with Browser Sync
gulp.task('jekyll-rebuild', ['jekyll-build'], function () {
	browserSync.reload();
});

// Browser Sync Task
gulp.task('browser-sync', ['jekyll-build'], function() {
    browserSync({
        server: {
            baseDir: '_site'
        }
    });
});

// Stylus Task
gulp.task('stylus', function(){
    gulp.src('source/css/main.styl')
        .pipe(plumber())
        .pipe(stylus({
            use:[prefixer(), jeet(), nib(), rupture()],
            compress: true
        }))
        .pipe(gulp.dest('_site/assets/css/'))
        .pipe(browserSync.reload({stream:true}))
        .pipe(gulp.dest('assets/css/'));
});

// Imagemin Task
gulp.task('imagemin', function() {
    return gulp.src('source/img/**/*.{jpg,png,gif}')
        .pipe(plumber())
        .pipe(imagemin({ optimizationLevel: 5, progressive: true, interlaced: true }))
        .pipe(gulp.dest('assets/img'))
        .pipe(browserSync.reload({stream: true}));
});

// JS Compile Task
gulp.task('js', function(){
    return gulp.src('source/js/**/*.js')
        //.pipe(plumber())
        //.pipe(concat('main.js'))
        //.pipe(uglify())
        .pipe(gulp.dest('assets/js'))
        .pipe(browserSync.reload({stream: true}));
});

// Watch Task
gulp.task('watch', function () {
	gulp.watch('source/css/**/*.styl', ['stylus']);
	gulp.watch('source/js/**/*.js', ['js']);
    gulp.watch('source/img/**/*.{jpg,png,gif}', ['imagemin']);
	gulp.watch(['**/*.html', 'about.md', 'index.html', '_includes/*.html', '_layouts/*.html', '_posts/*'], ['jekyll-build']);
});

// Default Task
gulp.task('default', ['js', 'stylus', 'imagemin', 'watch', 'browser-sync']);
