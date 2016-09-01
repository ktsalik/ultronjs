import figlet from 'figlet';
import chalk from 'chalk';
import fs from 'fs';

/**
* @class Logger
* @constructor
**/
const Logger = function() {
  this.initMessage = new Promise(resolve => {
      figlet('UltronJS', {
      font: 'big',
    }, function(err, data) {
      var packageInformation = JSON.parse(fs.readFileSync(__dirname + '/../package.json'));
      console.log(chalk.green(data));
      console.log(`UltronJS\n${chalk.blue(`   v${packageInformation.version}`)}\n\nDocumentation\n    ${chalk.blue(packageInformation.homepage)}\n`);
      console.log(chalk.gray(`please submit any issues to: ${packageInformation.bugs.url}`));
      console.log(`\n\n`);
      resolve();
    });
  });
};

Logger.prototype = {
  
  /**
  * @method Logger#testStart
  * @param {Test} test
  */
  testStart: function(test) {
    this.initMessage.then(() => {
      console.log(`Running: ${chalk.green(test.description)}`);
    });
  },
  
  /**
  * @method Logger#testStopped
  * @param {Test} test
  */
  testStopped: function(test) {
    this.initMessage.then(() => {
      console.log(`${chalk.red(`STOPPED`)}`);
      console.log(`\n`);
    });
  },
  
  /**
  * @method Logger#testFinished
  * @param {Test} test
  */
  testFinished: function(test) {
    this.initMessage.then(() => {
      var passed = test.assertions.filter(r => r > 0).length;
      var failed = test.assertions.length - passed;
      if (failed > 0) {
        console.log(`${chalk.red(`FAILED`)} ${failed} assertions failed`);
      } else if (passed > 0) {
        console.log(`${chalk.green(`OK`)} ${passed} assertions passed`);
      } else {
        console.log(`${chalk.gray(`No assertions detected`)}`);
      }
      console.log(`\n`);
    });
  },
  
  /**
  * @method Logger#assertionPassed
  * @param {string} message
  */
  assertionPassed: function(message) {
    this.initMessage.then(() => {
      console.log(`${chalk.green(`✓`)} ${message}`);
    });
  },
  
  /**
  * @method Logger#assertionFailed
  * @param {string} message
  */
  assertionFailed: function(message) {
    this.initMessage.then(() => {
      console.log(`${chalk.red(`×`)} ${message}`);
    });
  },
  
};

export default Logger;