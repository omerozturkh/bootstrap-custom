var gulp = require('gulp');
var connect = require('gulp-connect');
var uglify  = require('gulp-uglify');
var concat  = require('gulp-concat');
var sass = require('gulp-sass');
var autoprefix = require('gulp-autoprefixer');
var notify = require("gulp-notify");

gulp.task ('connect',function(){
    connect.server({
        port: 3000,
        root: './',
        livereload: true
    });
});

var config = {
    bootstrapDir: './bower_components/bootstrap-sass',
    publicDir: './public'
};

gulp.task('css', function () {
    return gulp.src('assets/styles/sass/main.scss')
        .pipe(sass({
            includePaths: [config.bootstrapDir + '/assets/stylesheets'],
        }))
        .pipe(autoprefix('last 15 version'))
        .pipe(concat('main.css'))
        .pipe(gulp.dest('assets/styles/css'))
        .pipe(connect.reload());
});


gulp.task('js', function () {
    gulp.src('assets/scripts/js/main.js')
        .pipe(uglify())
        .pipe(concat('all.js'))
        .pipe(gulp.dest('assets/scripts/js'))
        .pipe(connect.reload());
});


gulp.task('watch', function () {
    gulp.watch('assets/styles/sass/**/*.scss', ['css']);
    gulp.watch('assets/scripts/js/**/*.js', ['js']);
});


gulp.task('default', ['connect','watch','css']);
