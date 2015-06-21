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
                    watch: [ 'app' ],
                    cwd: __dirname,
                    nodeArgs: [ '--debug' ],
                }
            }
        },
        karma: {
            unit: {
                configFile: 'karma.config.js'
            }
        },
        mochaTest: {
            unit: {
                reporter: 'spec',
                ui: 'bdd',
                src: [ 'test/app/**/*-spec.js' ],
            },
        },
        browserify: {
            client: {
                src: [
                    'public/js/**/*.js',
                    '!public/js/bundle.js'
                ],
                dest: 'public/js/bundle.js',
            },
            options: {
                browserifyOptions: {
                    debug: true
                }
            }
        },
        watch: {
            client: {
                files: [ '<%= browserify.client.src %>' ],
                tasks: [ 'browserify:client' ],
            },
        },
        concurrent: {
            dev: {
                tasks: ['nodemon', 'node-inspector', 'watch'],
                options: {
                    logConcurrentOutput: true
                }
            }
        },
        'node-inspector': {
            dev: {}
        },
    });

    grunt.loadNpmTasks('grunt-nodemon');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-mocha-test');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-node-inspector');
    grunt.loadNpmTasks('grunt-concurrent');

    grunt.registerTask('test', ['mochaTest', 'karma']);
    grunt.registerTask('default', ['browserify:client', 'test', 'concurrent:dev' ]);
};
