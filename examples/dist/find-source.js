'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  this.open('http://github.com');
  this.fill('input[name="q"]').with('ultronjs');
  this.$('input[name="q"]').submit();
  this.page.findElement.by.linkText('masterakos/ultronjs').click();
  this.wait.for(1000);
  this.page.findElement.by.linkText('examples').click();
  this.wait.for(1000);
  this.page.findElement.by.linkText('src').click();
  this.wait.for(1000);
  this.page.findElement.by.linkText('find-source.js').click();
  this.wait.for(1000);
  this.$('.file').should.haveContent('this.$(\'.file\').should.haveContent'); // this is pretty interesting actually
};

; // should find the source-code of itself