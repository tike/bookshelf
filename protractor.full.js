// pull in the baseconfig
var baseConfig = require('./protractorBase').config;
var browsers = require('./protractorBase').browsers;

// add run specific configuration
baseConfig.multiCapabilities = [
  browsers.phantomjs,
  browsers.firefox
];

// export patched object
exports.config = baseConfig;
