exports.config = {
  //seleniumAddress: seleniumUrl ,
  seleniumServerJar: './node_modules/protractor/selenium/selenium-server-standalone-2.42.2.jar',

  // Options to be passed to Jasmine-node.
  jasmineNodeOpts: {
    showColors: true,
    isVerbose: true,
    includeStackTrace: true,
    defaultTimeoutInterval: 30000
  }
};

exports.browsers = {
  firefox: { browserName: 'firefox' }, 
  phantomjs: { browserName: 'phantomjs' }
};

