import chalk from 'chalk';
import webdriver from 'selenium-webdriver';

/**
* @class Command
* @param {string} type
* @param {object} args
* @constructor
**/

const Command = function(type, args) {
  this.type = type;
  this.args = args;
};

Command.prototype = {
  
  /**
  * @method exec - Executes the commmand using selenium methods
  * @param {object} driver
  */
  exec: function(driver) {
    switch (this.type) {
      case 'open-page':
        return driver.get(this.args.url);
        break;
      case 'wait-element':
        return new Promise((resolve, reject) => {
          driver.wait(webdriver.until.elementLocated(webdriver.By.css(this.args.selector))).then(() => {
            driver.wait(webdriver.until.elementIsVisible(driver.findElement(webdriver.By.css(this.args.selector)))).then(resolve);
          })
        });
        break;
      case 'text-input':
        return driver.findElement(webdriver.By.css(this.args.selector)).sendKeys(this.args.text);
        break;
      case 'button-click':
        return driver.findElement(webdriver.By.css(this.args.selector)).click();
        break;
      case 'check-element-count':
        var args = this.args;
        return new Promise(function(resolve, reject) {
          driver.findElements(webdriver.By.css(args.selector)).then(function(elements) {
            if (typeof args.expected == 'number') {
              // TODO
            } else if (typeof args.expected == 'string') {
              if (args.expected == 'many') {
                if (elements.length > 1) {
                  console.log(chalk.underline("found some " + args.selector) + chalk.green(' [✓]'));
                } else {
                  console.log(chalk.underline("could not found " + args.selector) + chalk.red(' [x]'));
                }
              }
            }
            resolve();
          });
        });
        break;
      case 'check-element-content':
        var args = this.args;
        return new Promise(function(resolve, reject) {
          driver.findElement(webdriver.By.css(args.selector)).then(function(element) {
            element.getText().then(function(text) {
              if (text.indexOf(args.content) > -1) {
                console.log(chalk.underline("found the right content on " + args.selector) + chalk.green(' [✓]'));
              } else {
                console.log(chalk.underline("could not find {" + args.content + "} on " + args.selector) + chalk.red(' [x]'));
              }
              resolve();
            });
          });
        });
        break;
      case 'submit-form':
        return new Promise((resolve, reject) => {
          driver.findElement(webdriver.By.css(this.args.selector)).then(function(element) {
            element.submit().then(resolve);
          });
        })
        break;
      case 'wait-title-is':
        driver.wait(webdriver.until.titleIs(this.args.text));
        break;
      case 'wait-title-contains':
        return driver.wait(webdriver.until.titleContains(this.args.text));
        break;
    }
  }
  
};

export default Command;
