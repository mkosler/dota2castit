// Karma configuration
// Generated on Wed Jun 17 2015 19:16:13 GMT-0500 (CDT)

module.exports = function(config) {
  config.set({
      browsers: ['PhantomJS'],
      files: [
          'public/libs/requirejs/require.js',
          'public/libs/**/*.js',
          'test/public/js/**/*-spec.js',
      ],
      frameworks: ['mocha', 'browserify'],
      reporters: ['spec'],
      autoWatch: false,
      singleRun: true,
      preprocessors: {
        'test/public/js/**/*-spec.js': ['browserify']
      },
  });
};
