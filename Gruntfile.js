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
        mochaTest: {
            test: {
                options: {
                    reporter: 'spec',
                },
                src: [ 'test/app/**/*.js' ]
            }
        },
        mocha: {
            test: {
                src: [ 'test/public/TestRunner.html' ],
                options: {
                    run: true,
                    reporter: 'Spec',
                    logErrors: true
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-nodemon');
    grunt.loadNpmTasks('grunt-mocha-test');
    grunt.loadNpmTasks('grunt-mocha');

    grunt.registerTask('default', ['nodemon']);
    grunt.registerTask('test', ['mochaTest', 'mocha' ]);
};
