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

var Command = function Command(type, args) {
  this.type = type;
  this.args = args;
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
        return new Promise(function (resolve, reject) {
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
        var args = this.args;
        return new Promise(function (resolve, reject) {
          driver.findElements(_seleniumWebdriver2.default.By.css(args.selector)).then(function (elements) {
            if (typeof args.expected == 'number') {
              // TODO
            } else if (typeof args.expected == 'string') {
              if (args.expected == 'many') {
                if (elements.length > 1) {
                  console.log(_chalk2.default.underline("found some " + args.selector) + _chalk2.default.green(' [✓]'));
                } else {
                  console.log(_chalk2.default.underline("could not found " + args.selector) + _chalk2.default.red(' [x]'));
                }
              }
            }
            resolve();
          });
        });
        break;
      case 'check-element-content':
        var args = this.args;
        return new Promise(function (resolve, reject) {
          driver.findElement(_seleniumWebdriver2.default.By.css(args.selector)).then(function (element) {
            element.getText().then(function (text) {
              if (text.indexOf(args.content) > -1) {
                console.log(_chalk2.default.underline("found the right content on " + args.selector) + _chalk2.default.green(' [✓]'));
              } else {
                console.log(_chalk2.default.underline("could not find {" + args.content + "} on " + args.selector) + _chalk2.default.red(' [x]'));
              }
              resolve();
            });
          });
        });
        break;
      case 'submit-form':
        return new Promise(function (resolve, reject) {
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
    }
  }

};

exports.default = Command;