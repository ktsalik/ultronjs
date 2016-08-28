'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _seleniumWebdriver = require('selenium-webdriver');

var _seleniumWebdriver2 = _interopRequireDefault(_seleniumWebdriver);

var _test = require('./test');

var _test2 = _interopRequireDefault(_test);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
* @class Ultron
* @param {string} browser - browser which tests will run
* @constructor
*/
var Ultron = function Ultron(browser) {
  this.browser = browser;
  this.driver = new _seleniumWebdriver2.default.Builder().forBrowser(this.browser).build();
};

Ultron.prototype = {

  /**
  * @method it - Creates a test
  * @param {string} description - Test description
  * @return {Test}
  */
  it: function it(description) {
    return new _test2.default(description, this.driver);
  },

  /**
  * @method end - Ends test session and closes browser
  */
  end: function end() {
    this.driver.quit();
  }

};

exports.default = Ultron;