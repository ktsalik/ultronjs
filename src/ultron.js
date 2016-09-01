import webdriver from 'selenium-webdriver';
import Test from './test'
import Logger from './logger'
import async from 'async';

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
    options.times = options.times || 'once';
    
    return new Promise((resolve, reject) => {
      if (this.tests.length > 0) {
        var series = [];
        this.tests.forEach(test => {
          series.push(function(next) {
            test.run().then(next);
          });
        });
        async.series(series, function() {
          resolve();
        });
      } else {
        resolve();
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