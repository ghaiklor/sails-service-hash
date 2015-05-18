var assert = require('chai').assert;
var HashService = require('../');

describe('HashService', function () {
  it('Should properly export', function () {
    assert.isObject(HashService);
    assert.isFunction(HashService.create);
    assert.isFunction(HashService.BCrypt);
  });
});
