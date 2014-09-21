'use strict';

module.exports = function(config) {
  config.set({
    frameworks: ['jasmine'],
    files: [
        // Dependencies
        'src/bower_components/jquery/dist/jquery.js',
        'src/bower_components/bootstrap/dist/js/bootstrap.js',
        'src/bower_components/angular/angular.js',
        'src/bower_components/angular-ui/build/angular-ui.js',
        'src/bower_components/angular-bootstrap/ui-bootstrap.js',
        'src/bower_components/angular-mocks/**/*.js',

        // modules
        'src/js/**/*.js',

        // tests
        'test/karma/**/*.spec.js',        
    ],

    // coverage reporter generates the coverage
    reporters: ['progress', 'coverage'],

    preprocessors: {
      // source files, that you wanna generate coverage for
      // do not include tests or libraries
      // (these files will be instrumented by Istanbul)
      'src/js/**/*.js': ['coverage']
    },
    
  });
};


