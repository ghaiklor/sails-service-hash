var assert = require('chai').assert;
var bcrypt = require('bcrypt');
var BCryptHash = require('../lib/BCryptHash');

var SALT = '$2a$10$8Ux95eQglaUMSn75J7MAXO';
var TEST_PASSWORD = 'MY_GREAT_PASSWORD';
var TEST_PASSWORD_IN_BCRYPT = '$2a$10$8Ux95eQglaUMSn75J7MAXOrHISe8xlR596kiYoVs2shRznjzD5CGC';

describe('BCryptHash', function () {
  it('Should properly export', function () {
    assert.isFunction(BCryptHash);
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

  it('Should properly hash data without options', function (done) {
    var hasher = new BCryptHash();
    hasher.hash(TEST_PASSWORD).then(function (result) {
      assert.isString(result);
      done();
    });
  });

  it('Should properly hash data with predefined salt', function (done) {
    var hasher = new BCryptHash({
      salt: SALT
    });

    hasher.hash(TEST_PASSWORD).then(function (result) {
      assert.equal(result, TEST_PASSWORD_IN_BCRYPT);
      done();
    });
  });

  it('Should properly hash data in sync', function () {
    var hasher = new BCryptHash({
      salt: SALT
    });
    assert.equal(hasher.hashSync(TEST_PASSWORD), TEST_PASSWORD_IN_BCRYPT);
  });

  it('Should properly compare plain data with hash', function (done) {
    var hasher = new BCryptHash();

    hasher.compare(TEST_PASSWORD, TEST_PASSWORD_IN_BCRYPT).then(function (result) {
      assert.ok(result);
      done();
    });
  });

  it('Should properly compare plain data with hash in sync', function () {
    var hasher = new BCryptHash();

    assert.ok(hasher.compareSync(TEST_PASSWORD, TEST_PASSWORD_IN_BCRYPT));
    assert.notOk(hasher.compareSync('WRONG_DATA', TEST_PASSWORD_IN_BCRYPT));
  });
});
