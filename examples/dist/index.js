'use strict';

var _ultron = require('../../ultron');

var _ultron2 = _interopRequireDefault(_ultron);

var _githubSearch = require('./github-search');

var _githubSearch2 = _interopRequireDefault(_githubSearch);

var _findSource = require('./find-source');

var _findSource2 = _interopRequireDefault(_findSource);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ultron = new _ultron2.default('chrome');

ultron.it("should open GitHub via Google").describe(_githubSearch2.default);

ultron.it("should find the source-code of itself").describe(_findSource2.default);

ultron.start({
  run: 'once'
}).then(function () {
  ultron.end();
});