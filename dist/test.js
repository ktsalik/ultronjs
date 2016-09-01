'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _commandsWrapper = require('./commands-wrapper');

var _commandsWrapper2 = _interopRequireDefault(_commandsWrapper);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _async = require('async');

var _async2 = _interopRequireDefault(_async);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
* @class Test
* @param {string} description - Test description
* @param {object} driver
* @param {object} logger
* @constructor
**/
var Test = function Test(description, driver, logger) {
  this.description = description;
  this.driver = driver;
  this.fn = null;
  this.commands = [];
  _commandsWrapper2.default.apply(this);
  this.logger = logger;
  this.assertions = [];
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
    var _this = this;

    return new Promise(function (resolve, reject) {
      _this.logger.testStart(_this);
      _this.fn.apply(_this);
      var series = [];
      _this.commands.forEach(function (command) {
        series.push(function (next) {
          command.exec(_this.driver).then(function () {
            next();
          }).catch(function () {
            next('stop');
          });
        });
      });
      _async2.default.series(series, function (err) {
        if (!err) {
          _this.logger.testFinished(_this);
        } else {
          _this.logger.testStopped(_this);
        }
        resolve();
      });
    });
  }

};

exports.default = Test;