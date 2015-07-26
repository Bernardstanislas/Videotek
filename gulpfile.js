var gulp = require('gulp');
var babel = require('gulp-babel');
var concat = require('gulp-concat');
var spawn = require('child_process').spawn;

// Node process container
var node;

var paths = {
    babel: './server/src/**/*.js'
};

// Babel task
gulp.task('babel', function() {
    return gulp.src(paths.babel)
    .pipe(babel())
    .pipe(gulp.dest('./server/dist/'));
});

// Node task
gulp.task('node', function() {
    if (node) node.kill()
    node = spawn('node', ['server/dist/index.js'], {stdio: 'inherit'})
    node.on('close', function (code) {
        if (code === 8) {
            gulp.log('Error detected, waiting for changes...');
        }
    });
});

gulp.task('default', ['babel', 'node']);

// Watch task
gulp.task('watch', ['babel', 'node'], function() {
    gulp.watch(paths.babel, ['babel', 'node']);
});
