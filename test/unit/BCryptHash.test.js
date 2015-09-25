import { assert } from 'chai';
import BCryptHash from '../../src/BCryptHash';

const SALT = '$2a$10$8Ux95eQglaUMSn75J7MAXO';
const TEST_PASSWORD = 'MY_GREAT_PASSWORD';
const TEST_PASSWORD_IN_BCRYPT = '$2a$10$8Ux95eQglaUMSn75J7MAXOrHISe8xlR596kiYoVs2shRznjzD5CGC';

describe('BCryptHash', () => {
  it('Should properly export', () => {
    assert.isFunction(BCryptHash);
  });

  it('Should properly create bcrypt with default options', () => {
    let hash = new BCryptHash();
    assert.notOk(hash.getSalt());
    assert.equal(hash.getSaltLength(), 10);
    assert.equal(hash.getRounds(), 10);
  });

  it('Should properly get/set salt', () => {
    let hash = new BCryptHash();
    assert.notOk(hash.getSalt());
    assert.instanceOf(hash.setSalt(SALT), BCryptHash);
    assert.equal(hash.getSalt(), SALT);
  });

  it('Should properly get/set salt length', () => {
    let hash = new BCryptHash();
    assert.equal(hash.getSaltLength(), 10);
    assert.instanceOf(hash.setSaltLength(15), BCryptHash);
    assert.equal(hash.getSaltLength(), 15);
  });

  it('Should properly get/set rounds', () => {
    let hash = new BCryptHash();
    assert.equal(hash.getRounds(), 10);
    assert.instanceOf(hash.setRounds(15), BCryptHash);
    assert.equal(hash.getRounds(), 15);
  });

  it('Should properly generate salt', done => {
    let hash = new BCryptHash();

    hash
      .generateSalt()
      .then(salt => {
        assert.isString(salt);
        done();
      })
      .catch(done);
  });

  it('Should properly generate salt and throw exception', done => {
    let hash = new BCryptHash();

    hash
      .generateSalt('WRONG_SALT')
      .then(done)
      .catch(error => {
        assert.instanceOf(error, Error);
        done();
      });
  });

  it('Should properly generate salt in sync mode', () => {
    let hash = new BCryptHash();
    assert.isString(hash.generateSaltSync());
  });

  it('Should properly hash data without options', done => {
    let hash = new BCryptHash();

    hash.hash(TEST_PASSWORD).then(result => {
      assert.isString(result);
      done();
    });
  });

  it('Should properly hash data with predefined salt', done => {
    let hash = new BCryptHash({
      salt: SALT
    });

    hash.hash(TEST_PASSWORD).then(result => {
      assert.equal(result, TEST_PASSWORD_IN_BCRYPT);
      done();
    });
  });

  it('Should properly hash data with predefined salt length', () => {
    let hash = new BCryptHash({
      saltLength: 8
    });

    assert.isString(hash.hashSync(TEST_PASSWORD));
  });

  it('Should properly hash data with auto-generated salt', () => {
    let hash = new BCryptHash({
      rounds: 5
    });

    assert.instanceOf(hash.setSalt(hash.generateSaltSync()), BCryptHash);
    assert.isString(hash.hashSync(TEST_PASSWORD));
  });

  it('Should properly throw exception on hash with wrong salt', done => {
    let hash = new BCryptHash({
      salt: 'WRONG_SALT'
    });

    hash
      .hash('DATA')
      .then(done)
      .catch(error => {
        assert.instanceOf(error, Error);
        done();
      });
  });

  it('Should properly hash data in sync', () => {
    let hash = new BCryptHash({
      salt: SALT
    });

    assert.equal(hash.hashSync(TEST_PASSWORD), TEST_PASSWORD_IN_BCRYPT);
  });

  it('Should properly compare plain data with hash', done => {
    let hash = new BCryptHash();

    hash.compare(TEST_PASSWORD, TEST_PASSWORD_IN_BCRYPT).then(result => {
      assert.ok(result);
      done();
    });
  });

  it('Should properly compare plain data with hash in sync', () => {
    let hash = new BCryptHash();

    assert.ok(hash.compareSync(TEST_PASSWORD, TEST_PASSWORD_IN_BCRYPT));
    assert.notOk(hash.compareSync('WRONG_DATA', TEST_PASSWORD_IN_BCRYPT));
  });

  it('Should properly override predefined config on hash/compare', () => {
    let hash = new BCryptHash();
    let defaultSaltHash = hash.hashSync(TEST_PASSWORD);
    let overrideSaltHash = hash.hashSync(TEST_PASSWORD, {
      salt: SALT
    });

    assert.notEqual(defaultSaltHash, overrideSaltHash);
    assert.ok(hash.compareSync(TEST_PASSWORD, defaultSaltHash));
    assert.ok(hash.compareSync(TEST_PASSWORD, overrideSaltHash));
  });

  it('Should properly throw exception on compare', done => {
    let hash = new BCryptHash();

    hash
      .compare()
      .then(done)
      .catch(error => {
        assert.instanceOf(error, Error);
        done();
      });
  });
});
