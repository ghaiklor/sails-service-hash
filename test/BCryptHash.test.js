var assert = require('chai').assert;
var BCryptHash = require('../lib/BCryptHash');

describe('BCryptHash', function () {
  it('Should properly export', function () {
    assert.isFunction(BCryptHash);
  });
});
