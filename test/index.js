var assert = require('chai').assert;
var HashService = require('../');
var BCryptHash = require('../lib/BCryptHash');

describe('HashService', function () {
  it('Should properly export', function () {
    assert.isObject(HashService);
    assert.isFunction(HashService.create);
    assert.isFunction(HashService.BCrypt);
  });

  it('Should properly create bcrypt instance', function () {
    assert.instanceOf(HashService.create('bcrypt'), BCryptHash);
  });

  it('Should properly throw Error if type is unrecognized', function () {
    assert.throw(function () {
      HashService.create('NOT_EXISTS');
    }, Error);
  });
});
