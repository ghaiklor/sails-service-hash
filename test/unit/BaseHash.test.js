import { assert } from 'chai';
import BaseHash from '../../src/BaseHash';

describe('BaseHash', () => {
  it('Should properly export', () => {
    assert.isFunction(BaseHash);
  });

  it('Should properly make objects configurable', () => {
    let hash = new BaseHash();

    assert.notOk(hash.get('foo'));
    assert.instanceOf(hash.set('foo', 'bar'), BaseHash);
    assert.instanceOf(hash.set('obj', {foo: 'bar'}), BaseHash);
    assert.deepEqual(hash.get('obj'), {foo: 'bar'});
    assert.equal(hash.get('obj.foo'), 'bar');
    assert.equal(hash.get('foo'), 'bar');
  });

  it('Should properly create hash with pre-defined config', () => {
    let hash = new BaseHash({
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
