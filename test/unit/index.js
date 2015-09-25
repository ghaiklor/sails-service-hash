import { assert } from 'chai';
import HashService from '../../src/index';
import BCryptHash from '../../src/BCryptHash';

describe('HashService', () => {
  it('Should properly export', () => {
    assert.isFunction(HashService);
  });

  it('Should properly create bcrypt instance', () => {
    assert.instanceOf(HashService('bcrypt'), BCryptHash);
  });

  it('Should properly throw Error if type is unrecognized', () => {
    assert.throw(() => HashService.create('NOT_EXISTS'), Error);
  });

  it('Should properly hash bcrypt', () => {
    let hasher = HashService('bcrypt');
    let hash = hasher.hashSync('MY_PASSWORD');

    assert.ok(hasher.compareSync('MY_PASSWORD', hash));
    assert.notOk(hasher.compareSync('WRONG_PASSWORD', hash));
  });
});
