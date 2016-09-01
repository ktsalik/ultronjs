'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _seleniumWebdriver = require('selenium-webdriver');

var _seleniumWebdriver2 = _interopRequireDefault(_seleniumWebdriver);

var _test = require('./test');

var _test2 = _interopRequireDefault(_test);

var _logger = require('./logger');

var _logger2 = _interopRequireDefault(_logger);

var _async = require('async');

var _async2 = _interopRequireDefault(_async);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
* @class Ultron
* @param {string} browser - browser which tests will run
* @constructor
*/
var Ultron = function Ultron(browser) {
  this.logger = new _logger2.default();
  this.browser = browser;
  this.driver = new _seleniumWebdriver2.default.Builder().forBrowser(this.browser).build();
  this.tests = [];
};

Ultron.prototype = {

  /**
  * @method it - Creates a test
  * @param {string} description - Test description
  * @return {Test}
  */
  it: function it(description) {
    var test = new _test2.default(description, this.driver, this.logger);
    this.tests.push(test);
    return test;
  },

  start: function start(options) {
    var _this = this;

    options = options || {};
    options.times = options.times || 'once';

    return new Promise(function (resolve, reject) {
      if (_this.tests.length > 0) {
        var series = [];
        _this.tests.forEach(function (test) {
          series.push(function (next) {
            test.run().then(next);
          });
        });
        _async2.default.series(series, function () {
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
  end: function end() {
    this.driver.quit();
  }

};

exports.default = Ultron;