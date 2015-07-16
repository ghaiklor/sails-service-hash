var assert = require('chai').assert;
var BCryptHash = require('../lib/BCryptHash');

var SALT = '$2a$10$8Ux95eQglaUMSn75J7MAXO';
var TEST_PASSWORD = 'MY_GREAT_PASSWORD';
var TEST_PASSWORD_IN_BCRYPT = '$2a$10$8Ux95eQglaUMSn75J7MAXOrHISe8xlR596kiYoVs2shRznjzD5CGC';

describe('BCryptHash', function () {
  it('Should properly export', function () {
    assert.isFunction(BCryptHash);
  });

  it('Should properly create bcrypt with default options', function () {
    var hash = new BCryptHash();
    assert.notOk(hash.getSalt());
    assert.equal(hash.getSaltLength(), 10);
    assert.equal(hash.getRounds(), 10);
  });

  it('Should properly get/set salt', function () {
    var hash = new BCryptHash();
    assert.notOk(hash.getSalt());
    assert.instanceOf(hash.setSalt(SALT), BCryptHash);
    assert.equal(hash.getSalt(), SALT);
  });

  it('Should properly get/set salt length', function () {
    var hash = new BCryptHash();
    assert.equal(hash.getSaltLength(), 10);
    assert.instanceOf(hash.setSaltLength(15), BCryptHash);
    assert.equal(hash.getSaltLength(), 15);
  });

  it('Should properly get/set rounds', function () {
    var hash = new BCryptHash();
    assert.equal(hash.getRounds(), 10);
    assert.instanceOf(hash.setRounds(15), BCryptHash);
    assert.equal(hash.getRounds(), 15);
  });

  it('Should properly generate salt', function (done) {
    var hash = new BCryptHash();

    hash
      .generateSalt()
      .then(function (salt) {
        assert.isString(salt);
        done();
      })
      .catch(done);
  });

  it('Should properly generate salt in sync mode', function () {
    var hash = new BCryptHash();
    assert.isString(hash.generateSaltSync());
  });

  it('Should properly hash data without options', function (done) {
    var hash = new BCryptHash();

    hash.hash(TEST_PASSWORD).then(function (result) {
      assert.isString(result);
      done();
    });
  });

  it('Should properly hash data with predefined salt', function (done) {
    var hash = new BCryptHash({
      salt: SALT
    });

    hash.hash(TEST_PASSWORD).then(function (result) {
      assert.equal(result, TEST_PASSWORD_IN_BCRYPT);
      done();
    });
  });

  it('Should properly hash data with predefined salt length', function () {
    var hash = new BCryptHash({
      saltLength: 8
    });

    assert.isString(hash.hashSync(TEST_PASSWORD));
  });

  it('Should properly hash data with auto-generated salt', function () {
    var hash = new BCryptHash({
      rounds: 5
    });

    assert.instanceOf(hash.setSalt(hash.generateSaltSync()), BCryptHash);
    assert.isString(hash.hashSync(TEST_PASSWORD));
  });

  it('Should properly hash data in sync', function () {
    var hash = new BCryptHash({
      salt: SALT
    });

    assert.equal(hash.hashSync(TEST_PASSWORD), TEST_PASSWORD_IN_BCRYPT);
  });

  it('Should properly compare plain data with hash', function (done) {
    var hash = new BCryptHash();

    hash.compare(TEST_PASSWORD, TEST_PASSWORD_IN_BCRYPT).then(function (result) {
      assert.ok(result);
      done();
    });
  });

  it('Should properly compare plain data with hash in sync', function () {
    var hash = new BCryptHash();

    assert.ok(hash.compareSync(TEST_PASSWORD, TEST_PASSWORD_IN_BCRYPT));
    assert.notOk(hash.compareSync('WRONG_DATA', TEST_PASSWORD_IN_BCRYPT));
  });

  it('Should properly override predefined config on hash/compare', function () {
    var hash = new BCryptHash();
    var defaultSaltHash = hash.hashSync(TEST_PASSWORD);
    var overrideSaltHash = hash.hashSync(TEST_PASSWORD, {
      salt: SALT
    });

    assert.notEqual(defaultSaltHash, overrideSaltHash);
    assert.ok(hash.compareSync(TEST_PASSWORD, defaultSaltHash));
    assert.ok(hash.compareSync(TEST_PASSWORD, overrideSaltHash));
  });
});
