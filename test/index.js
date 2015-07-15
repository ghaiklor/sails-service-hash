var assert = require('chai').assert;
var HashService = require('../');
var BCryptHash = HashService.BCryptHash;

describe('HashService', function () {
  it('Should properly export', function () {
    assert.isObject(HashService);
    assert.isFunction(HashService.create);
    assert.isFunction(HashService.BCryptHash);
  });

  it('Should properly create bcrypt instance', function () {
    assert.instanceOf(HashService.create('bcrypt'), BCryptHash);
  });

  it('Should properly throw Error if type is unrecognized', function () {
    assert.throw(function () {
      HashService.create('NOT_EXISTS');
    }, Error);
  });

  it('Should properly hash bcrypt', function () {
    var hasher = HashService.create('bcrypt');
    var hash = hasher.hashSync('MY_PASSWORD');

    assert.ok(hasher.compareSync('MY_PASSWORD', hash));
    assert.notOk(hasher.compareSync('WRONG_PASSWORD', hash));
  });
});
