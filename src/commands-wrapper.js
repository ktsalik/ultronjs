import Command from './command'

const commands = function() {
  this.wait = wait;
  this.fill = fill;
  this.open = open;
  this.click = click;
  this.$ = $;
  
  var test = this;
  
  wait.until = {
    titleIs: (text) => {
      test.commands.push(new Command('wait-title-is', {
        text: text
      }));
    },
    titleContains: (text) => {
      test.commands.push(new Command('wait-title-contains', {
        text: text
      }));
    }
  };
  
  wait.for = function(delay) {
    test.commands.push(new Command('wait-milliseconds', {
      delay: delay
    }));
  };
};

function wait(selector) {
  var test = this;
  return {
    toAppear: function() {
      test.commands.push(new Command('wait-element', {
        selector: selector
      }));
    }
  };
}

function fill(selector) {
  var test = this;
  return {
    with: function(text) {
      test.commands.push(new Command('text-input', {
        selector: selector,
        text: text
      }));
    }
  };
}

function open(url) {
  var test = this;
  test.commands.push(new Command('open-page', {
    url: url
  }));
}

function click(selector) {
  var test = this;
  test.commands.push(new Command('button-click', {
    selector: selector
  }));
}

function $(selector) {
  var test = this;
  return {
    submit: function() {
      test.commands.push(new Command('submit-form', {
        selector: selector
      }));
    },
    should: {
      count: function(expected) {
        test.commands.push(new Command('check-element-count', {
          selector: selector,
          expected: expected
        }));
      },
      haveContent: function(content) {
        test.commands.push(new Command('check-element-content', {
          selector: selector,
          content: content
        }));
      }
    }
  };
}

export default commands;
