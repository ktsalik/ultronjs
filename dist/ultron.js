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

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

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
    options.run = options.run || 'once';
    options.delay = options.delay || 5000;
    options.watch = options.watch || [];
    options.recursive = options.recursive || false;

    return new Promise(function (resolve, reject) {

      if (!_this.tests.length) resolve();

      var series = [];
      _this.tests.forEach(function (test) {
        series.push(function (next) {
          test.run().then(next);
        });
      });

      var running;
      var repeatAfter;

      (function () {
        switch (options.run) {
          case 'once':
            _async2.default.series(series, function () {
              resolve();
            });
            break;
          case 'repeat':
            var runSeries = function runSeries() {
              _async2.default.series(series, function () {
                setTimeout(runSeries, options.delay);
              });
            };

            runSeries();
            break;
          case 'watch':
            running = false;
            repeatAfter = false;

            options.watch.forEach(function (file) {
              _fs2.default.watch(file, { persistent: true, recursive: options.recursive }, function () {
                if (running) {
                  repeatAfter = true;
                  return;
                } else {
                  running = true;
                  _async2.default.series(series, function () {
                    if (repeatAfter) {
                      setTimeout(function () {
                        _async2.default.series(series, function () {
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
      })();
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