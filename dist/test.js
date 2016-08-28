'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _commandsWrapper = require('./commands-wrapper');

var _commandsWrapper2 = _interopRequireDefault(_commandsWrapper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
* @class Test
* @param {string} description - Test description
* @param {object} driver
* @constructor
**/
var Test = function Test(description, driver) {
  this.description = description;
  this.driver = driver;
  this.fn = null;
  this.commands = [];
  _commandsWrapper2.default.apply(this);
};

Test.prototype = {

  /**
  * @method describe - Describe the test using specific built-in commands
  * @param {function} fn
  * @return {Test}
  **/
  describe: function describe(fn) {
    this.fn = fn;
    return this;
  },

  /**
  * @method run - Starts the test
  * @return {Promise}
  */
  run: function run() {
    var test = this;
    return new Promise(function (resolve, reject) {
      test.fn.apply(test);
      var lastCommand = test.commands[0].exec(test.driver);
      for (var i = 1; i < test.commands.length; i++) {
        lastCommand = lastCommand.then(function (i) {
          return test.commands[i].exec(test.driver);
        }(i));
      }
      lastCommand.then(resolve);
    });
  }

};

exports.default = Test;