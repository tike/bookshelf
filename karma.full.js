'use strict';

var baseConfig = require('./karmaBase');

module.exports = function(config) {
  baseConfig(config);
  config.set({
    browsers: ['Firefox', 'PhantomJS'],
    singleRun: true,
    coverageReporter: {
      reporters: [
        // full annotated src-code as browseable html to coverage/<browsername> 
        { type: 'html', dir: 'coverage/'},
        // detailed coverage report to coverage/<browsername>/coverage.txt
        { type : 'text', dir : 'coverage/', file : 'coverage.txt'},
        // detailed coverage report to coverage/<browsername>/coverage-summary.txt
        { type : 'text', dir : 'coverage/', file : 'coverage-summary.txt'},
        // output summary to console
        { type: 'text-summary'},
      ]
    }
  });
};

