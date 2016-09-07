import commands from './commands-wrapper';
import chalk from 'chalk';
import async from 'async';

/**
* @class Test
* @param {string} description - Test description
* @param {object} driver
* @param {object} logger
* @constructor
**/
const Test = function(description, driver, logger) {
  this.description = description;
  this.driver = driver;
  this.fn = null;
  this.commands = [];
  commands.apply(this);
  this.logger = logger;
  this.assertions = [];
};

Test.prototype = {
  
  /**
  * @method describe - Describe the test using specific built-in commands
  * @param {function} fn
  * @return {Test}
  **/
  describe: function(fn) {
    this.fn = fn;
    this.fn.apply(this);
    return this;
  },
  
  /**
  * @method run - Starts the test
  * @return {Promise}
  */
  run: function() {
    return new Promise((resolve, reject) => {
      this.logger.testStart(this);
      var series = [];
      this.commands.forEach(command => {
        series.push(next => {
          command.exec(this.driver)
            .then(() => {
              next();
            })
            .catch(() => {
              next('stop');
            });
        });
      });
      async.series(series, err => {
        if (!err) {
          this.logger.testFinished(this);
        } else {
          this.logger.testStopped(this);
        }
        resolve();
      });
    });
  }
  
};

export default Test;
