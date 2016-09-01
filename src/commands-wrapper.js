import Command from './command'

var commands = function() {
  this.wait = wait;
  this.fill = fill;
  this.open = open;
  this.click = click;
  this.$ = $;
  this.page;
  
  var test = this;
  
  /**
  * @property {object} Test.wait.until
  */
  wait.until = {
    
    /**
    * @method Test.wait.until#titleIs
    * @param {string} text
    */
    titleIs: (text) => {
      test.commands.push(new Command('wait-title-is', {
        text: text
      }, test));
    },
    
    /**
    * @method Test.wait.until#titleContains
    * @param {string} text
    */
    titleContains: (text) => {
      test.commands.push(new Command('wait-title-contains', {
        text: text
      }, test));
    }
  };
  
  /**
  * @method Test.wait#for
  * @param {number} delay
  */
  wait.for = function(delay) {
    test.commands.push(new Command('wait-milliseconds', {
      delay: delay
    }, test));
  };
  
  /**
  * @property {object} Test.page
  */
  this.page = {
    
    /**
    * @property {object} Test.page.title
    */
    title: {
      
      /**
      * @property {object} Test.page.title.should
      */
      should: {
        
        /**
        * @method Test.page.should#contain
        * @param {stirng} text
        */
        contain: function(text) {
          test.commands.push(new Command('page-title-should-contain', {
            text: text,
          }, test));
        }
        
      }
      
    },
    
    /**
    * @property {object} Test.page.findElement
    */
    findElement: {
      
      /**
      * @property {object} Test.page.findElement.by
      */
      by: {
        
        /**
        * @method Test.page.findElement.by#linkText
        * @param text
        */
        linkText: function(text) {
          return {
            
            /**
            * @method Test.page.findElement.by#linkText#click
            */
            click: function() {
              test.commands.push(new Command('find-element-by-text-and-click', {
                text: text
              }, test));
            }
            
          };
        }
        
      }
      
    }
    
  };
  
};

/**
* @method Test#wait
* @param {string} selector
* @returns {object}
*/
function wait(selector) {
  var test = this;
  return {
    
    /**
    * @method Test.wait#toAppear
    */
    toAppear: function() {
      test.commands.push(new Command('wait-element', {
        selector: selector
      }, test));
    }
    
  };
}

/**
* @method Test#fill
* @param {string} selector
* @returns {object}
*/
function fill(selector) {
  var test = this;
  return {
    
    /**
    * @method Test.fill#with
    * @param {string} text
    */
    with: function(text) {
      test.commands.push(new Command('text-input', {
        selector: selector,
        text: text
      }, test));
    }
    
  };
}

/**
* @method Test#open
* @param {string} url
*/
function open(url) {
  var test = this;
  test.commands.push(new Command('open-page', {
    url: url
  }, test));
}

/**
* @method Test#click
* @param {string} selector
*/
function click(selector) {
  var test = this;
  test.commands.push(new Command('button-click', {
    selector: selector
  }, test));
}

/**
* @method Test#$
* @param {string} selector
* @returns {object}
*/
function $(selector) {
  var test = this;
  return {
    
    /**
    * @method Test.$#submit
    */
    submit: function() {
      test.commands.push(new Command('submit-form', {
        selector: selector
      }, test));
    },
    
    /**
    * @property {object} Test.$.should
    */
    should: {
      
      /**
      * @method Test.$.should#count
      * @param {number|string} expected
      */
      count: function(expected) {
        test.commands.push(new Command('check-element-count', {
          selector: selector,
          expected: expected,
        }, test));
      },
      
      /**
      * @method Test.$.should#haveContent
      * @param {string} content
      */
      haveContent: function(content) {
        test.commands.push(new Command('check-element-content', {
          selector: selector,
          content: content,
        }, test));
      }
    }
  };
}

export default commands;
