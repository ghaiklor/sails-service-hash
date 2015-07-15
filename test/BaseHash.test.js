var assert = require('chai').assert;
var BaseHash = require('../lib/BaseHash');

describe('BaseHash', function () {
  it('Should properly export', function () {
    assert.isFunction(BaseHash);
    assert.isFunction(BaseHash.prototype.get);
    assert.isFunction(BaseHash.prototype.set);
    assert.isFunction(BaseHash.prototype.hash);
    assert.isFunction(BaseHash.prototype.hashSync);
    assert.isFunction(BaseHash.prototype.compare);
    assert.isFunction(BaseHash.prototype.compareSync);
  });

  it('Should properly make objects configurable', function () {
    var hash = new BaseHash();

    assert.notOk(hash.get('foo'));
    assert.instanceOf(hash.set('foo', 'bar'), BaseHash);
    assert.instanceOf(hash.set('obj', {foo: 'bar'}), BaseHash);
    assert.deepEqual(hash.get('obj'), {foo: 'bar'});
    assert.equal(hash.get('obj.foo'), 'bar');
    assert.equal(hash.get('foo'), 'bar');
  });

  it('Should properly create hash with pre-defined config', function () {
    var hash = new BaseHash({
      foo: 'bar',
      obj: {
        foo: 'bar'
      }
    });

    assert.equal(hash.get('foo'), 'bar');
    assert.equal(hash.get('obj.foo'), 'bar');
    assert.deepEqual(hash.get('obj'), {foo: 'bar'});
    assert.notOk(hash.get('NOT_EXISTS'));
  });
});
