// should open GitHub via Google

export default function() {
  var inputSelector = 'form[role="search"] input[type="text"]';
  this.open('http://google.com');
  this.wait(inputSelector).toAppear();
  this.fill(inputSelector).with('github');
  this.$(inputSelector).submit();
  this.wait('#ires').toAppear();
  this.click('#ires a[href="https://github.com/"]');
  this.wait.for(500);
  this.page.title.should.contain("GitHub");
};