module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        nodemon: {
            dev: {
                script: '<%= pkg.main %>',
                options: {
                    env: {
                        PORT: '3000'
                    },
                    ignore: [
                        'node_modules/**'
                    ],
                    cwd: __dirname,
                    nodeArgs: [ '--debug' ]
                }
            }
        },
        karma: {
            unit: {
                configFile: 'karma.config.js'
            }
        },
        mochaTest: {
            test: {
                reporter: 'spec',
                ui: 'bdd',
            },
            src: [ 'test/app/**/*-spec.js' ]
        },
        browserify: {
            js: {
                src: [
                    'public/js/**/*.js',
                    'test/public/js/**/*-spec.js',
                    '!public/js/bundle.js'
                ],
                dest: 'public/js/bundle.js'
            }
        },
    });

    grunt.loadNpmTasks('grunt-nodemon');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-mocha-test');
    grunt.loadNpmTasks('grunt-browserify');

    grunt.registerTask('default', ['nodemon']);
    grunt.registerTask('test', ['mochaTest', 'karma']);
};
