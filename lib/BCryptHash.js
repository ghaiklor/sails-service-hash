var util = require('util');
var Q = require('q');
var bcrypt = require('bcrypt');
var BaseHash = require('./BaseHash');

/**
 * Default salt length
 * @type {Number}
 * @private
 */
var DEFAULT_SALT_LENGTH = 10;

util.inherits(BCryptHash, BaseHash);

/**
 * Create new bcrypt hash instance
 * @constructor
 */
function BCryptHash(content) {
  BaseHash.apply(this, arguments);
}

/**
 * Hash data
 * @param {String|Number} [salt] Generated salt or length of auto generated salt
 * @returns {Promise}
 */
BCryptHash.prototype.hash = function (salt) {
  var defer = Q.defer();

  bcrypt.hash(this.getContent(), salt || DEFAULT_SALT_LENGTH, function (error, hash) {
    if (error) {
      defer.reject(error);
    } else {
      defer.resolve(hash);
    }
  });

  return defer.promise;
};

/**
 * Hash data in sync mode
 * @param {String|Number} [salt] Generated salt in string or length of auto generated salt
 * @returns {String} Returns hashed data
 */
BCryptHash.prototype.hashSync = function (salt) {
  return bcrypt.hashSync(this.getContent(), salt || DEFAULT_SALT_LENGTH);
};

/**
 * Compare hash with plain data
 * @param {String} data Plain data
 * @returns {Promise}
 */
BCryptHash.prototype.compare = function (data) {
  var defer = Q.defer();

  bcrypt.compare(data, this.getContent(), function (error, equal) {
    if (error) {
      defer.reject(error);
    } else {
      defer.resolve(equal);
    }
  });

  return defer.promise;
};

/**
 * Compare data with hash in sync mode
 * @param {String} data Plain data
 * @returns {Boolean} Returns true if equal
 */
BCryptHash.prototype.compareSync = function (data) {
  return bcrypt.compareSync(data, this.getContent());
};

module.exports = BCryptHash;
