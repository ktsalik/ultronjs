import webdriver from 'selenium-webdriver';
import Test from './test'

/**
* @class Ultron
* @param {string} browser - browser which tests will run
* @constructor
*/
const Ultron = function(browser) {
  this.browser = browser;
  this.driver = new webdriver.Builder().forBrowser(this.browser).build();
}

Ultron.prototype = {
  
  /**
  * @method it - Creates a test
  * @param {string} description - Test description
  * @return {Test}
  */
  it: function(description) {
    return new Test(description, this.driver);
  },
  
  /**
  * @method end - Ends test session and closes browser
  */
  end: function() {
    this.driver.quit();
  }
  
};

export { Ultron as default }
