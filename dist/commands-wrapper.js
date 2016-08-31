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

  var test = this;

  wait.until = {
    titleIs: function titleIs(text) {
      test.commands.push(new _command2.default('wait-title-is', {
        text: text
      }));
    },
    titleContains: function titleContains(text) {
      test.commands.push(new _command2.default('wait-title-contains', {
        text: text
      }));
    }
  };

  wait.for = function (delay) {
    test.commands.push(new _command2.default('wait-milliseconds', {
      delay: delay
    }));
  };
};

function wait(selector) {
  var test = this;
  return {
    toAppear: function toAppear() {
      test.commands.push(new _command2.default('wait-element', {
        selector: selector
      }));
    }
  };
}

function fill(selector) {
  var test = this;
  return {
    with: function _with(text) {
      test.commands.push(new _command2.default('text-input', {
        selector: selector,
        text: text
      }));
    }
  };
}

function open(url) {
  var test = this;
  test.commands.push(new _command2.default('open-page', {
    url: url
  }));
}

function click(selector) {
  var test = this;
  test.commands.push(new _command2.default('button-click', {
    selector: selector
  }));
}

function $(selector) {
  var test = this;
  return {
    submit: function submit() {
      test.commands.push(new _command2.default('submit-form', {
        selector: selector
      }));
    },
    should: {
      count: function count(expected) {
        test.commands.push(new _command2.default('check-element-count', {
          selector: selector,
          expected: expected
        }));
      },
      haveContent: function haveContent(content) {
        test.commands.push(new _command2.default('check-element-content', {
          selector: selector,
          content: content
        }));
      }
    }
  };
}

exports.default = commands;