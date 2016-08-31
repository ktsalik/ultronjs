# UltronJS

Ultron is a JavaScript/NodeJS library for creating automated tests running on the browser of your choice.

## Example

````javascript
var Ultron = require('ultronjs');
var ultron = new Ultron('chrome'); // open Chrome

ultron
  .it("should open GitHub via Google")
  .describe(function() {
    
    this.open('http://google.com');
    
    this.wait('input[type="text"]').toAppear();
    
    this.fill('input[type="text"]').with('GitHub');
    
    this.$('input[type="text"]').submit();
    
    this.wait('#ires').toAppear(); // results container
    
    this.click('#ires a[href="https://github.com/"]'); // first result
    
    this.wait.until.titleContains('GitHub');
    
  })
  .run()
  .then(function() {
    ultron.end(); // close browser
  });
````

## Installation

### Using npm
````bash
$ npm install ultronjs

# or

$ npm i -D ultronjs
````

You also need to download and include in your PATH the driver of the browser of your choice in order to use Ultron.
#### Drivers downloads
* Chrome: http://chromedriver.storage.googleapis.com/index.html
* Firefox: https://github.com/mozilla/geckodriver/releases/
* Internet Explorer: http://selenium-release.storage.googleapis.com/index.html
* Safari: http://selenium-release.storage.googleapis.com/index.html
* Opera: https://github.com/operasoftware/operachromiumdriver/releases

## Documentation

*(work in progress)*
