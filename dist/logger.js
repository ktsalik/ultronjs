'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _figlet = require('figlet');

var _figlet2 = _interopRequireDefault(_figlet);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
* @class Logger
* @constructor
**/
var Logger = function Logger() {
  this.initMessage = new Promise(function (resolve) {
    (0, _figlet2.default)('UltronJS', {
      font: 'big'
    }, function (err, data) {
      var packageInformation = JSON.parse(_fs2.default.readFileSync(__dirname + '/../package.json'));
      console.log(_chalk2.default.green(data));
      console.log('UltronJS\n' + _chalk2.default.blue('   v' + packageInformation.version) + '\n\nDocumentation\n    ' + _chalk2.default.blue(packageInformation.homepage) + '\n');
      console.log(_chalk2.default.gray('please submit any issues to: ' + packageInformation.bugs.url));
      console.log('\n\n');
      resolve();
    });
  });
};

Logger.prototype = {

  /**
  * @method Logger#testStart
  * @param {Test} test
  */
  testStart: function testStart(test) {
    this.initMessage.then(function () {
      console.log('Running: ' + _chalk2.default.green(test.description));
    });
  },

  /**
  * @method Logger#testStopped
  * @param {Test} test
  */
  testStopped: function testStopped(test) {
    this.initMessage.then(function () {
      console.log('' + _chalk2.default.red('STOPPED'));
      console.log('\n');
    });
  },

  /**
  * @method Logger#testFinished
  * @param {Test} test
  */
  testFinished: function testFinished(test) {
    this.initMessage.then(function () {
      var passed = test.assertions.filter(function (r) {
        return r > 0;
      }).length;
      var failed = test.assertions.length - passed;
      if (failed > 0) {
        console.log(_chalk2.default.red('FAILED') + ' ' + failed + ' assertions failed');
      } else if (passed > 0) {
        console.log(_chalk2.default.green('OK') + ' ' + passed + ' assertions passed');
      } else {
        console.log('' + _chalk2.default.gray('No assertions detected'));
      }
      console.log('\n');
    });
  },

  /**
  * @method Logger#assertionPassed
  * @param {string} message
  */
  assertionPassed: function assertionPassed(message) {
    this.initMessage.then(function () {
      console.log(_chalk2.default.green('✓') + ' ' + message);
    });
  },

  /**
  * @method Logger#assertionFailed
  * @param {string} message
  */
  assertionFailed: function assertionFailed(message) {
    this.initMessage.then(function () {
      console.log(_chalk2.default.red('×') + ' ' + message);
    });
  }

};

exports.default = Logger;