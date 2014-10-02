'use strict';
/**
 *  P L U G I N S
 */
var gulp = require('gulp');
           // use gulp-help to automatically render a help screen
           require('gulp-help')(gulp);

// BUILD AND DEBUG DEPENDENCIES
  // see .jshint.rc for config and http://www.jshint.com/docs/ for details.
  var jshint = require('gulp-jshint'),
  
  // live reloader with proxying, selective live reloading, etc.
  // see: https://github.com/shakyShane/gulp-browser-sync
  // and: http://www.browsersync.io/docs/gulp/
  browserSync = require('browser-sync'),


// TESTING DEPENDENCIES
  karma = require('karma').server,
  protractor = require('gulp-protractor').protractor,
  webdriverStandalone = require('gulp-protractor').webdriver_standalone, // jshint ignore:line
  webdriverUpdate = require('gulp-protractor').webdriver_update,         // jshint ignore:line
  
// DEPLOYMENT DEPENDENCIES
  rimraf = require('gulp-rimraf'),
  uglify = require('gulp-uglify'),
  minifyHtml = require('gulp-minify-html'),
  minifyCss = require('gulp-minify-css'),
  usemin = require('gulp-usemin'),
  rev = require('gulp-rev');



/**
 * P R O J E C T   C O N F I G U R A T I O N
 */
// base directories
var src = 'src/';
var dist = 'dist/';
var tests = 'test/';


// configuration for different file types
// for an overview of gulp path syntax see:
// http://www.smashingmagazine.com/2014/06/11/building-with-gulp/  ( under GULP.SRC() )
var cnf = {
  pkg: [ '*.js' ],
  
  files: {
    js: [ src + 'js/**/*.js'],
    css:  [ src + 'css/**/*.css' ],
    html: [ src + '**/*.html', '!**/bower_components/**' ],
    img: [ src + 'img/**/*.+(svg|jpg|png|ico)'],
    assets: [src + 'bower_components/bootstrap/dist/**/*.+(svg|eot|woff|ttf)'],
  },

  tests: {
    unit: [ tests + 'karma/**/*.js' ],
    e2e: [ tests + 'protractor/**/*.js' ],
  },

  karma: {
    dev: {
      configFile: __dirname + '/karma.dev.js',
    },
    full:{
      configFile: __dirname + '/karma.full.js',
    }
  },

  protractor: {
    dev: {
        configFile: 'protractor.dev.js',
    },
    full:{
      configFile: 'protractor.full.js',
    }
  },
  
  browserSync: {
    options: {
      //see: http://www.browsersync.io/docs/options/
      host: '127.0.0.1',            // [ null | string ]: ip browser-sync server should listen on (null: all)
      port: 9000,                   // [ int ]: port for browser-sync server 
      //https: true,                // [ true | undefined ]: (Don't) serve https
      
      server: {
        baseDir: [ src ],           // [ Array of strings | string ]: serve files from these director(y|ies)
        //directory: true,          // [ true | false ]: (Don't) allow directory listings (overrides index.html resolution for host/xyz/ urls)
      },
      //proxy: 'local.dev',         // [ string ]: Using a vhost or url
      //proxy: 'localhost:8000',    // [ string ]: Using a localhost address with a port
      //proxy: 'localhost/site1',   // [ string ]: Using localhost sub directories
    
      browser: ['firefox'],         // [ Array of strings | string ]: browsers to open, e.g. [ 'google chrome', 'firefox' ]
      open: true,                   // [ true | false ]: (Don't) open browsers upon start [ true | false | 'external' | 'tunnel' ]
      startPath: '/',               // [ null | string ]: Open the first browser window at e.g. "/info.php"
      scrollProportionally: false,  // [ true | false ]: (Don't) sync viewports to TOP position
      scrollThrottle: 0,            // [ int ]: only send scroll events every n milliseconds
      minify: false,                // [ true | false ]: (Don't) minify the client-side JS
      notify: false,                // [ true | false ]: (Don't) show any notifications in the browser. 
      injectChanges: false,          // [ true | false ]: (Don't) try to inject. false -> just do a page refresh
      codeSync: true,               // [ true | false ]: (Don't) send any file-change events to browsers
      timestamps: false,            // [ true | false ]: (Don't) append timestamps to injected files
      
      logLevel: 'debug',            // [ 'debug' | 'info' | 'silent' ]: loglevel
      logConnections: true,         // [ true | false ]: (Don't) log connections
      logFileChanges: true,         // [ true | false ]: (Don't) log file changes
    },
  },
  
  // see: https://www.npmjs.org/package/gulp-minify-html#options
  minifyHTML:{
    empty: true,
    conditionals: true,
  },
  
  // see: https://www.npmjs.org/package/gulp-minify-css#options
  minifyCSS:{
    keepBreaks: false,
  },
  
  // see: https://www.npmjs.org/package/gulp-uglify#options
  uglify:{
  },
};



/**
 *  W A T C H   T A S K S
 */
 
// run gulpfile through jshint
//TODO: add gulp restart with browser-sync killing
gulp.task('lint.pkg', 'lint pkg files', function(){
  return gulp
    .src(cnf.pkg)
      .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'));
});

// pass jslint the script files
gulp.task('lint.scripts', 'lint javascript sources', function() {
  var files = cnf.files.js
      .concat(cnf.tests.unit)
      .concat(cnf.tests.e2e);

  return gulp
    .src(files)
      .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'));
});


// checks wether browserSync is running
// and causes it to reload & inject the
// changed file
function BrowserSyncReload(evt){
  console.log('     ', evt.type, ':', evt.path);
  if (browserSync.active){
    browserSync.notify('HTML <div style="{background: green; border: 2px solid black}">Reloading'+evt.path+'</div>', 1000);
    browserSync.reload(evt.path);
  }
}


// restart the gulp task completely
// not implemented yet
function gulpRestart(evt){
  console.log('     ', evt.type, ':', evt.path);
  
  /*var p;

  gulp.watch('gulpfile.js', spawnChildren);
  spawnChildren();

  function spawnChildren(e) {
    // kill previous spawned process
    if(p) { p.kill(); }

    // `spawn` a child `gulp` process linked to the parent `stdio`
    p = spawn('gulp', [argv.task], {stdio: 'inherit'});
  }
  if (browserSync.active){
    browserSync.exit();
    browserSync.init(cnf.browserSync.options);
  }
  */
}

// watch files for changes and execute task(s)
gulp.task('watch', false, function(){

  // Watch pkg Files
  gulp.watch(cnf.pkg, ['lint.pkg'])
    .on('change', gulpRestart);

  // Watch .js files
  var files = cnf.files.js
      .concat(tests + '*.js')
      .concat(cnf.tests.unit)
      .concat(cnf.tests.e2e);
  gulp.watch(files, ['lint.scripts', 'protractor.dev'])
    .on('change', BrowserSyncReload);
  
  // Watch .html files
  gulp.watch(cnf.files.html, ['protractor.dev'])
    .on('change', BrowserSyncReload);

  //Watch .css files
  gulp.watch(cnf.files.css, ['protractor.dev'])
    .on('change', BrowserSyncReload);
});


// Start browser-sync
gulp.task('serve', 'as default, additionally start brower-sync', ['lint.scripts', 'watch'], function () {
  browserSync.init(cnf.browserSync.options);
});


/**
 * T E S T I N G   T A S K S
 */

gulp.task('karma.dev', 'run karma with karma.dev.js config', function (done) {
  karma.start(cnf.karma.dev, done);
});

gulp.task('karma.full', 'run karma with karma.full.js config', function (done) {
  karma.start(cnf.karma.full, done);
});

gulp.task('test.unit', 'run karma.full tests (may include further things)', ['karma.full']);


// selenium related tasks
gulp.task('wd.update', 'update selenium webdriver', webdriverUpdate);
gulp.task('wd.standalone', 'run a standalone selenium webdriver (does run indefinitely)', webdriverStandalone);

// running end to end (e2e) tests in dev mode
gulp.task('protractor.dev', 'run end 2 end tests phantomjs only',
    /*['wd.update'],*/ function () {
    return gulp.src(cnf.tests.e2e)
        .pipe(protractor(cnf.protractor.dev))
        .on('error', function(e){
          console.error('e2e FAILED:', e);
          throw(e);
        });
});

// running end to end (e2e) tests
gulp.task('protractor.full', 'run end 2 end tests all browsers',
    /*['wd.update'],*/ function () {
    return gulp.src(cnf.tests.e2e)
        .pipe(protractor(cnf.protractor.full))
        .on('error', function(e){
          console.error('e2e FAILED:', e);
          throw(e);
        });
});

gulp.task('test.e2e', 'run end to end tests', ['protractor.full']);

gulp.task('test', 'run end to end and unit tests', ['test.unit','test.e2e']);


/**
 *  D E P L O Y M E N T   T A S K S
 */
gulp.task('dist.clean', false, function () {
    return gulp.src(dist, {read: false})
        .pipe(rimraf());
});

gulp.task('dist.images', false, ['dist.clean'], function(){
  gulp.src(cnf.files.img)
    .pipe(gulp.dest(dist + 'img/'));
});

gulp.task('dist.assets', false, ['dist.clean'], function(){
  gulp.src(cnf.files.assets)
    .pipe(gulp.dest(dist));
});

gulp.task('dist', 'concat, minifiy, rewrite html/css/js to dist directory',
          [ 'dist.clean', 'test', 'dist.images', 'dist.assets'], function() {
  gulp.src(cnf.files.html)
    .pipe(usemin({
      css: [minifyCss(cnf.minifyCSS), 'concat', rev()],
      html: [minifyHtml(cnf.minifyHTML)],
      js: [uglify(cnf.uglify), rev()]
    }))
  .pipe(gulp.dest(dist));
});



gulp.task('default', 'watch files for changes, output jshint on .js files', ['lint.scripts', 'karma.dev', 'protractor.dev', 'watch']);
