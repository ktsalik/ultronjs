import webdriver from 'selenium-webdriver';
import Test from './test'
import Logger from './logger'
import async from 'async';
import fs from 'fs';

/**
* @class Ultron
* @param {string} browser - browser which tests will run
* @constructor
*/
const Ultron = function(browser) {
  this.logger = new Logger();
  this.browser = browser;
  this.driver = new webdriver.Builder().forBrowser(this.browser).build();
  this.tests = [];
}

Ultron.prototype = {
  
  /**
  * @method it - Creates a test
  * @param {string} description - Test description
  * @return {Test}
  */
  it: function(description) {
    var test = new Test(description, this.driver, this.logger);
    this.tests.push(test);
    return test;
  },
  
  start(options) {
    options = options || {};
    options.run = options.run || 'once';
    options.delay = options.delay || 5000;
    options.watch = options.watch || [];
    options.recursive = options.recursive || false;
    
    return new Promise((resolve, reject) => {
      
      if (!this.tests.length) resolve();
      
      var series = [];
      this.tests.forEach(test => {
        series.push(function(next) {
          test.run().then(next);
        });
      });
      
      switch (options.run) {
        case 'once':
          async.series(series, function() {
            resolve();
          });
          break;
        case 'repeat':
          function runSeries() {
            async.series(series, function() {
              setTimeout(runSeries, options.delay);
            });
          }
          runSeries();
          break;
        case 'watch':
          var running = false;
          var repeatAfter = false;
          options.watch.forEach(function(file) {
            fs.watch(file, { persistent: true, recursive: options.recursive }, function() {
              if (running) {
                repeatAfter = true;
                return;
              } else {
                running = true;
                async.series(series, function() {
                  if (repeatAfter) {
                    setTimeout(function() {
                      async.series(series, function() {
                        running = false;
                        repeatAfter = false;
                      });
                    }, options.delay);
                  } else {
                    running = false;
                  }
                }); 
              }
            });
          });
          break;
      }
    });
  },
  
  /**
  * @method end - Ends test session and closes browser
  */
  end: function() {
    this.driver.quit();
  }
  
};

export { Ultron as default }