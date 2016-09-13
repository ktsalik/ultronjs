[![npm](https://img.shields.io/npm/v/ultronjs.svg)](https://www.npmjs.com/package/ultronjs) [![npm](https://img.shields.io/npm/dt/ultronjs.svg)](https://www.npmjs.com/package/ultronjs) <img src="https://img.shields.io/badge/syntax-easy-brightgreen.svg"> <img src="https://img.shields.io/badge/examples-ready-brightgreen.svg"> <img src="https://img.shields.io/badge/docs-partially ready-green.svg">

# UltronJS

Ultron is a JavaScript/NodeJS library for creating automated tests running on the browser of your choice.

<img src="https://s13.postimg.org/6ktgvswrb/ultronjs_example.png">

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
    
    this.wait.for(1000); // wait for just a sec
    
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

**You also need to download** and include in your PATH the driver of the browser of your choice in order to use Ultron.
#### Drivers downloads
* Chrome: http://chromedriver.storage.googleapis.com/index.html
* Firefox: https://github.com/mozilla/geckodriver/releases/
* Internet Explorer: http://selenium-release.storage.googleapis.com/index.html
* Safari: http://selenium-release.storage.googleapis.com/index.html
* Opera: https://github.com/operasoftware/operachromiumdriver/releases

## API Reference

Table of Contents
* [open](#test.open)
* [wait](#wait)
* [fill](#fill)
* [click](#click)
* [$][#$](#$)
* [page](#page)

#### Open
`Test.open(url)`
* ````url```` {string} - The url to open in the browser.
##### Example
````javascript
new require('ultronjs')
  .it("Should open GitHub")
  .describe(function() {
    
      this.open('http://github.com');
      
    })
````

<br>
#### Wait
`Test.wait(selector)`
* ````selector```` {string} - CSS selector of the target element.
##### methods
`toAppear()` - Waits until the element appears.
##### Example
````javascript
new require('ultronjs')
  .it("Should wait for the search input")
  .describe(function() {
    
      this.wait('#search-input').toAppear();
      
    })
````
<br>
`until.titleIs(text)` - Waits until the title matches the given text.
##### Example
````javascript
new require('ultronjs')
  .it("Should wait until the page title contains the word GitHub")
  .describe(function() {
    
      this.wait.until.titleIs('GitHub');
      
    })
````
<br>
`until.titleContains(text)` - Waits until the title of the page contains the given text.
##### Example
````javascript
new require('ultronjs')
  .it("Should wait until the page title is GitHub")
  .describe(function() {
    
      this.wait.until.titleContains('GitHub');
      
    })
````
<br>
`for(milliseconds)` - Waits for the given time in milliseconds.
##### Example
````javascript
new require('ultronjs')
  .it("Should wait for 2 seconds")
  .describe(function() {
    
      this.wait.for(2000);
      
    })
````

<br>
#### Fill
`Test.fill(selector)`
* ````selector```` {string} - CSS selector of the target element.

##### methods
`with(text)`

##### Example
````javascript
new require('ultronjs')
  .it("Should fill GitHub search input with `UltronJS`")
  .describe(function() {
    
      this.fill('input[name="q"]').with('UltronJS');
      
    })
````

<br>
#### Click
`Test.Click(selector)`
* ````selector```` {string} - CSS selector of the target element.
##### Example
````javascript
new require('ultronjs')
  .it("Should click link to GitHub")
  .describe(function() {
      
      this.click('#ires a[href="https://github.com/"]');
      
    })
````

<br>
#### Page
`Test.page.title`

##### methods
`should.contain(text)`
* text {string}

##### Example
````javascript
new require('ultronjs')
  .it("Should find the word GitHub in page's title")
  .describe(function() {
      
      this.page.title.should.contain('GitHub');
      
    })
````

<br>
`findElement.by.linkText(text)`
* text {string}

##### methods
`click()`

##### Example
````javascript
new require('ultronjs')
  .it("Should find and click the link of UltronJS repository")
  .describe(function() {
      
      this.page.findElement.by.linkText('masterakos/ultronjs').click();
      
    })
````

<br>
#### $
`Test.$(selector)`
* selector {string} - Css selector of the target element.

##### methods
`submit()`

##### Example
````javascript
new require('ultronjs')
  .it("Should submit the search form")
  .describe(function() {
      
      // submit by selecting the form
      this.$('form').submit();
      // or by selecting an input inside the form
      this.$('input[name="q"]').submit();
      // or by selecting the submit button
      this.$('button[type="submit"]').submit();
      
    })
````
<br>
`should`
##### methods
`count(number)`
##### Example
````javascript
new require('ultronjs')
  .it("Should submit the search form")
  .describe(function() {
      
      // submit by selecting the form
      this.$('form').submit();
      // or by selecting an input inside the form
      this.$('input[name="q"]').submit();
      // or even by selecting the submit button
      this.$('button[type="submit"]').submit();
      
    })
````
<br>
`haveContent(text)`
##### Example
````javascript
new require('ultronjs')
  .it("Should find the right content in body element")
  .describe(function() {
      
      this.$('body').should.haveContent(`Browser Automated Testing library`);
      
    })
````
