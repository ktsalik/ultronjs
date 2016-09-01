'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _seleniumWebdriver = require('selenium-webdriver');

var _seleniumWebdriver2 = _interopRequireDefault(_seleniumWebdriver);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
* @class Command
* @param {string} type
* @param {object} args
* @constructor
**/

var Command = function Command(type, args, test) {
  this.type = type;
  this.args = args;
  this.test = test;
};

Command.prototype = {

  /**
  * @method exec - Executes the commmand using selenium methods
  * @param {object} driver
  */
  exec: function exec(driver) {
    var _this = this;

    switch (this.type) {
      case 'open-page':
        return driver.get(this.args.url);
        break;
      case 'wait-element':
        return new Promise(function (resolve) {
          driver.wait(_seleniumWebdriver2.default.until.elementLocated(_seleniumWebdriver2.default.By.css(_this.args.selector))).then(function () {
            driver.wait(_seleniumWebdriver2.default.until.elementIsVisible(driver.findElement(_seleniumWebdriver2.default.By.css(_this.args.selector)))).then(resolve);
          });
        });
        break;
      case 'text-input':
        return driver.findElement(_seleniumWebdriver2.default.By.css(this.args.selector)).sendKeys(this.args.text);
        break;
      case 'button-click':
        return driver.findElement(_seleniumWebdriver2.default.By.css(this.args.selector)).click();
        break;
      case 'check-element-count':
        return new Promise(function (resolve) {
          driver.findElements(_seleniumWebdriver2.default.By.css(_this.args.selector)).then(function (elements) {
            if (typeof _this.args.expected == 'number') {
              if (elements.length == _this.args.expected) {
                _this.test.assertions.push(1);
                _this.test.logger.assertionPassed('found ' + _this.args.expected + ' {' + _this.args.selector + '} elements');
              } else {
                _this.test.assertions.push(-1);
                _this.test.logger.assertionFailed('could not find ' + _this.args.expected + ' {' + _this.args.selector + '} elements');
              }
            } else if (typeof _this.args.expected == 'string') {
              if (_this.args.expected == 'many') {
                if (elements.length > 1) {
                  _this.test.assertions.push(1);
                  _this.test.logger.assertionPassed('found ' + _this.args.expected + ' {' + _this.args.selector + '}');
                } else {
                  _this.test.assertions.push(-1);
                  _this.test.logger.assertionFailed('element {' + _this.args.selector + '} not found');
                }
              }
            }
            resolve();
          });
        });
        break;
      case 'check-element-content':
        return new Promise(function (resolve) {
          driver.findElement(_seleniumWebdriver2.default.By.css(_this.args.selector)).then(function (element) {
            element.getText().then(function (text) {
              if (text.indexOf(_this.args.content) > -1) {
                _this.test.assertions.push(1);
                _this.test.logger.assertionPassed('element {' + _this.args.selector + '} has content "' + _this.args.content + '"');
              } else {
                _this.test.assertions.push(-1);
                _this.test.logger.assertionFailed('expected content "' + _this.args.content + '" into element {' + _this.args.selector + '} but not found');
              }
            });
          }).catch(function () {
            _this.test.assertions.push(-1);
            _this.test.logger.assertionFailed('expected content "{' + _this.args.content + '}" into element {' + _this.args.selector + '} but element {' + _this.args.selector + '} not found');
          }).finally(resolve);
        });
        break;
      case 'submit-form':
        return new Promise(function (resolve) {
          driver.findElement(_seleniumWebdriver2.default.By.css(_this.args.selector)).then(function (element) {
            element.submit().then(resolve);
          });
        });
        break;
      case 'wait-title-is':
        driver.wait(_seleniumWebdriver2.default.until.titleIs(this.args.text));
        break;
      case 'wait-title-contains':
        return driver.wait(_seleniumWebdriver2.default.until.titleContains(this.args.text));
        break;
      case 'wait-milliseconds':
        return driver.sleep(this.args.delay);
        break;
      case 'page-title-should-contain':
        return new Promise(function (resolve) {
          driver.getTitle().then(function (title) {
            if (title.indexOf(_this.args.text) > -1) {
              _this.test.assertions.push(1);
              _this.test.logger.assertionPassed('title content ok');
            } else {
              _this.test.assertions.push(-1);
              _this.test.logger.assertionFailed('expected content "' + _this.args.text + '" into page\'s title but not found');
            }
            resolve();
          });
        });
        break;
      case 'find-element-by-text-and-click':
        return new Promise(function (resolve, reject) {
          driver.findElement(_seleniumWebdriver2.default.By.partialLinkText(_this.args.text)).then(function (element) {
            element.click().then(resolve);
          }).catch(function () {
            _this.test.logger.assertionFailed('expected to find link with content "' + _this.args.text + '" but not found');
            reject();
          });
        });
        break;
      default:
        return new Promise(function (resolve) {
          return resolve;
        });
        break;
    }
  }

};

exports.default = Command;