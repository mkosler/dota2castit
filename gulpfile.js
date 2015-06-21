var gulp = require('gulp');
var karma = require('karma').server;
var mocha = require('gulp-mocha');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var rename = require('gulp-rename');
var glob = require('glob');
var buffer = require('vinyl-buffer');
var nodemon = require('gulp-nodemon');

var files = {
    client: {
        js: 'public/js/**/*.js',
        notJs: 'public/**/!(*.js)',
    },
    mocha: [ 'app/**/*.js', 'test/app/**/*-spec.js' ]
};

gulp.task('default', [ 'mocha', 'karma', 'client', 'copy', 'watch', 'start' ]);

gulp.task('test', [ 'mocha', 'karma' ]);

gulp.task('karma', [ 'mocha' ], function (done) {
    return karma.start({
        configFile: __dirname + '/karma.config.js',
        singleRun: true
    }, done);
});

gulp.task('mocha', function () {
    return gulp.src(files.mocha, { read: false })
        .pipe(mocha({ reporter: 'spec' }));
});

gulp.task('client', function (done) {
    glob(files.client.js, function (err, files) {
        var b = browserify({ debug: true });

        files.forEach(function (file) {
            b.add(file);
        });

        b.bundle()
            .pipe(source('bundle.js'))
            .pipe(buffer())
            .pipe(sourcemaps.init({ loadMaps: true }))
            .pipe(uglify())
            .pipe(rename({ suffix: '.min' }))
            .pipe(sourcemaps.write('./'))
            .pipe(gulp.dest('dist'));

        done();
    });
});

gulp.task('copy', function () {
    return gulp.src(files.client.notJs)
        .pipe(gulp.dest('dist'));
});

gulp.task('start', [ 'karma', 'copy' ], function () {
    nodemon({
        script: 'server.js',
        env: { PORT: '3000' },
        watch: [ 'app' ],
        cwd: __dirname,
        nodeArgs: [ '--debug' ],
    });
});

gulp.task('watch', function () {
    gulp.watch(files.client.js, [ 'client' ]).on('change', function (event) {
        console.log('File ' + event.path + ' was ' + event.type +', running tasks...');
    });

    gulp.watch(files.client.notJs, [ 'copy' ]).on('change', function (event) {
        console.log('File ' + event.path + ' was ' + event.type +', running tasks...');
    });
});
