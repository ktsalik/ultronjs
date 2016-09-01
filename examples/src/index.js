import Ultron from '../../ultron';
import testGithub from './github-search';
import testUltronSource from './find-source';

const ultron = new Ultron('chrome');

ultron
  .it("should open GitHub via Google")
  .describe(testGithub)

ultron
  .it("should find the source-code of itself")
  .describe(testUltronSource)
  
ultron.start({
  run: 'once'
}).then(function() {
  ultron.end();
});