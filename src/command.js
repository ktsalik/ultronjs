import chalk from 'chalk';
import webdriver from 'selenium-webdriver';

/**
* @class Command
* @param {string} type
* @param {object} args
* @constructor
**/

const Command = function(type, args, test) {
  this.type = type;
  this.args = args;
  this.test = test;
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
        return new Promise(resolve => {
          driver.wait(webdriver.until.elementLocated(webdriver.By.css(this.args.selector))).then(() => {
            driver.wait(webdriver.until.elementIsVisible(driver.findElement(webdriver.By.css(this.args.selector)))).then(resolve);
          });
        });
        break;
      case 'text-input':
        return driver.findElement(webdriver.By.css(this.args.selector)).sendKeys(this.args.text);
        break;
      case 'button-click':
        return driver.findElement(webdriver.By.css(this.args.selector)).click();
        break;
      case 'check-element-count':
        return new Promise(resolve => {
          driver.findElements(webdriver.By.css(this.args.selector)).then(elements => {
            if (typeof this.args.expected == 'number') {
              if (elements.length == this.args.expected) {
                this.test.assertions.push(1);
                this.test.logger.assertionPassed(`found ${this.args.expected} {${this.args.selector}} elements`);
              } else {
                this.test.assertions.push(-1);
                this.test.logger.assertionFailed(`could not find ${this.args.expected} {${this.args.selector}} elements`);
              }
            } else if (typeof this.args.expected == 'string') {
              if (this.args.expected == 'many') {
                if (elements.length > 1) {
                  this.test.assertions.push(1);
                  this.test.logger.assertionPassed(`found ${this.args.expected} {${this.args.selector}}`);
                } else {
                  this.test.assertions.push(-1);
                  this.test.logger.assertionFailed(`element {${this.args.selector}} not found`);
                }
              }
            }
            resolve();
          });
        });
        break;
      case 'check-element-content':
        return new Promise(resolve => {
          driver.findElement(webdriver.By.css(this.args.selector)).then(element => {
            element.getText().then(text => {
              if (text.indexOf(this.args.content) > -1) {
                this.test.assertions.push(1);
                this.test.logger.assertionPassed(`element {${this.args.selector}} has content "${this.args.content}"`);
              } else {
                this.test.assertions.push(-1);
                this.test.logger.assertionFailed(`expected content "${this.args.content}" into element {${this.args.selector}} but not found`);
              }
            });
          }).catch(() => {
            this.test.assertions.push(-1);
            this.test.logger.assertionFailed(`expected content "{${this.args.content}}" into element {${this.args.selector}} but element {${this.args.selector}} not found`);
          }).finally(resolve);
        });
        break;
      case 'submit-form':
        return new Promise(resolve => {
          driver.findElement(webdriver.By.css(this.args.selector)).then(element => {
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
      case 'wait-milliseconds':
        return driver.sleep(this.args.delay);
        break;
      case 'page-title-should-contain':
        return new Promise(resolve => {
          driver.getTitle().then(title => {
            if (title.indexOf(this.args.text) > -1) {
              this.test.assertions.push(1);
              this.test.logger.assertionPassed(`title content ok`);
            } else {
              this.test.assertions.push(-1);
              this.test.logger.assertionFailed(`expected content "${this.args.text}" into page's title but not found`);
            }
            resolve();
          });
        });
        break;
      case 'find-element-by-text-and-click':
        return new Promise((resolve, reject) => {
          driver.findElement(webdriver.By.partialLinkText(this.args.text)).then(element => {
            element.click().then(resolve);
          }).catch(() => {
            this.test.logger.assertionFailed(`expected to find link with content "${this.args.text}" but not found`);
            reject();
          });
        });
        break;
      default:
        return new Promise(resolve => resolve);
        break;
    }
  }
  
};

export default Command;
