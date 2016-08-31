var Ultron = require('../ultron');

var ultron = new Ultron('chrome');

var t1 = ultron
  .it("should open GitHub via Google")
  .describe(function() { // available commands: open, wait, fill, click, $
    var inputSelector = 'form[role="search"] input[type="text"]';
    
    this.open('http://google.com');
    this.wait(inputSelector).toAppear();
    this.fill(inputSelector).with('github');
    this.$(inputSelector).submit();
    this.wait('#ires').toAppear();
    this.click('#ires a[href="https://github.com/"]');
    this.wait.until.titleContains("GitHub");
  })
  .run().then(function() {
    ultron.end();
  })
