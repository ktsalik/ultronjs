import commands from './commands-wrapper';

/**
* @class Test
* @param {string} description - Test description
* @param {object} driver
* @constructor
**/
const Test = function(description, driver) {
  this.description = description;
  this.driver = driver;
  this.fn = null;
  this.commands = [];
  commands.apply(this);
};

Test.prototype = {
  
  /**
  * @method describe - Describe the test using specific built-in commands
  * @param {function} fn
  * @return {Test}
  **/
  describe: function(fn) {
    this.fn = fn;
    return this;
  },
  
  /**
  * @method run - Starts the test
  * @return {Promise}
  */
  run: function() {
    var test = this;
    return new Promise(function(resolve, reject) {
      test.fn.apply(test);
      var lastCommand = test.commands[0].exec(test.driver);
      for (var i = 1; i < test.commands.length; i++) {
        lastCommand = lastCommand.then((function(i) {
          return test.commands[i].exec(test.driver);
        })(i));
      }
      lastCommand.then(resolve);
    });
  }
  
};

export default Test;
