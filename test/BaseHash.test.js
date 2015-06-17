var assert = require('chai').assert;
var BaseHash = require('../lib/BaseHash');

describe('BaseHash', function () {
  it('Should properly export', function () {
    assert.isFunction(BaseHash);
    assert.isFunction(BaseHash.prototype.getConfig);
    assert.isFunction(BaseHash.prototype.setConfig);
    assert.isFunction(BaseHash.prototype.hash);
    assert.isFunction(BaseHash.prototype.hashSync);
    assert.isFunction(BaseHash.prototype.compare);
    assert.isFunction(BaseHash.prototype.compareSync);

    assert.throws(function () {
      BaseHash.prototype.hash();
    }, Error);

    assert.throws(function () {
      BaseHash.prototype.hashSync();
    }, Error);

    assert.throws(function () {
      BaseHash.prototype.compare();
    }, Error);

    assert.throws(function () {
      BaseHash.prototype.compareSync();
    }, Error);
  });

  it('Should properly make objects configurable', function () {
    var hash = new BaseHash();

    assert.notOk(hash.getConfig('foo'));
    assert.instanceOf(hash.setConfig('foo', 'bar'), BaseHash);
    assert.equal(hash.getConfig('foo'), 'bar');
  });

  it('Should properly create hash with pre-defined config', function () {
    var hash = new BaseHash({
      foo: 'bar'
    });

    assert.equal(hash.getConfig('foo'), 'bar');
    assert.notOk(hash.getConfig('NOT_EXISTS'));
  });
});
