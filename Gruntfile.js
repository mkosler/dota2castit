module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        nodemon: {
            dev: {
                script: '<%= pkg.main %>',
                options: {
                    env: {
                        PORT: '8080'
                    },
                    ignore: [
                        'node_modules/**'
                    ],
                    cwd: __dirname
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-nodemon');

    grunt.registerTask('default', ['nodemon']);
};
