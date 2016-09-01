'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _command = require('./command');

var _command2 = _interopRequireDefault(_command);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var commands = function commands() {
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
    titleIs: function titleIs(text) {
      test.commands.push(new _command2.default('wait-title-is', {
        text: text
      }, test));
    },

    /**
    * @method Test.wait.until#titleContains
    * @param {string} text
    */
    titleContains: function titleContains(text) {
      test.commands.push(new _command2.default('wait-title-contains', {
        text: text
      }, test));
    }
  };

  /**
  * @method Test.wait#for
  * @param {number} delay
  */
  wait.for = function (delay) {
    test.commands.push(new _command2.default('wait-milliseconds', {
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
        contain: function contain(text) {
          test.commands.push(new _command2.default('page-title-should-contain', {
            text: text
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
        linkText: function linkText(text) {
          return {

            /**
            * @method Test.page.findElement.by#linkText#click
            */
            click: function click() {
              test.commands.push(new _command2.default('find-element-by-text-and-click', {
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
    toAppear: function toAppear() {
      test.commands.push(new _command2.default('wait-element', {
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
    with: function _with(text) {
      test.commands.push(new _command2.default('text-input', {
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
  test.commands.push(new _command2.default('open-page', {
    url: url
  }, test));
}

/**
* @method Test#click
* @param {string} selector
*/
function click(selector) {
  var test = this;
  test.commands.push(new _command2.default('button-click', {
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
    submit: function submit() {
      test.commands.push(new _command2.default('submit-form', {
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
      count: function count(expected) {
        test.commands.push(new _command2.default('check-element-count', {
          selector: selector,
          expected: expected
        }, test));
      },

      /**
      * @method Test.$.should#haveContent
      * @param {string} content
      */
      haveContent: function haveContent(content) {
        test.commands.push(new _command2.default('check-element-content', {
          selector: selector,
          content: content
        }, test));
      }
    }
  };
}

exports.default = commands;