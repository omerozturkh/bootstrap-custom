var gulp = require('gulp');

var connect = require('gulp-connect');
var uglify  = require('gulp-uglify');
var concat  = require('gulp-concat');
var sass = require('gulp-sass');
var autoprefix = require('gulp-autoprefixer');

gulp.task ('connect',function(){
    connect.server({
        port: 3000,
        root: './',
        livereload: true
    });
});

gulp.task('css', function () {
    return gulp.src('assets/styles/sass/main.scss')
        .pipe(sass({ style: 'compressed' }))
        .pipe(autoprefix('last 15 version'))
        .pipe(concat ('main.css'))
        .pipe(gulp.dest('assets/styles/css'))
        .pipe(connect.reload());
});


gulp.task('js', function () {
    gulp.src(JSFiles)
        .pipe(uglify())
        .pipe(concat('all.js'))
        .pipe(gulp.dest(JSDir))
        .pipe(connect.reload());
});


gulp.task('watch', function () {
    gulp.watch('assets/styles/scss/**/*.scss', ['css']);
    //gulp.watch(JSFiles, ['js']);
});


gulp.task('default', ['connect','css','watch']);
gulp.run('default');