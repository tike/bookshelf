'use strict';

var baseConfig = require('./karmaBase');

module.exports = function(config) {
  baseConfig(config);
  config.set({
    browsers: ['PhantomJS'],
    autoWatch: true,
    autoWatchBatchDelay: 1000,
    //logLevel: 'debug',

    coverageReporter: {
      reporters: [
        // output detailed coverage report to console
        { type: 'text' },
        // output summary to console
        { type: 'text-summary'},
      ],
    },
  });
};

