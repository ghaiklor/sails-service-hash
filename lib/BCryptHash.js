var util = require('util');
var _ = require('lodash');
var Promise = require('bluebird');
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
function BCryptHash() {
  BaseHash.apply(this, arguments);
}

/**
 * Get salt
 * @returns {String}
 */
BCryptHash.prototype.getSalt = function () {
  return this.getConfig('salt');
};

/**
 * Set new salt for bcrypt
 * @param {String} salt New salt
 * @returns {BCryptHash}
 */
BCryptHash.prototype.setSalt = function (salt) {
  this.setConfig('salt', salt);
  return this;
};

/**
 * Get current salt length
 * @returns {Number}
 */
BCryptHash.prototype.getSaltLength = function () {
  return this.getConfig('saltLength') || DEFAULT_SALT_LENGTH;
};

/**
 * Set new salt length
 * @param {Number} length Length of salt
 * @returns {BCryptHash}
 */
BCryptHash.prototype.setSaltLength = function (length) {
  this.setConfig('saltLength', length);
  return this;
};

/**
 * Hash data
 * @param {String} data Data to hash with bcrypt
 * @param {Object} [_config] Generated salt or length of auto generated salt
 * @returns {Promise}
 */
BCryptHash.prototype.hash = function (data, _config) {
  var config = _.merge({}, {
    salt: this.getSalt(),
    saltLength: this.getSaltLength()
  }, _config);

  return new Promise(function (resolve, reject) {
    bcrypt.hash(data, config.salt || config.saltLength, function (error, hash) {
      return error ? reject(error) : resolve(hash);
    });
  }.bind(this));
};

/**
 * Hash data in sync mode
 * @param {String} data Data to hash with bcrypt
 * @param {Object} [_config] Generated salt in string or length of auto generated salt
 * @returns {String} Returns hashed data
 */
BCryptHash.prototype.hashSync = function (data, _config) {
  var config = _.merge({}, {
    salt: this.getSalt(),
    saltLength: this.getSaltLength()
  }, _config);

  return bcrypt.hashSync(data, config.salt || config.saltLength);
};

/**
 * Compare hash with plain data
 * @param {String} plainData Plain data
 * @param {String} hash Hash to compare with
 * @returns {Promise}
 */
BCryptHash.prototype.compare = function (plainData, hash) {
  return new Promise(function (resolve, reject) {
    bcrypt.compare(plainData, hash, function (error, equal) {
      return error ? reject(error) : resolve(equal);
    });
  }.bind(this));
};

/**
 * Compare data with hash in sync mode
 * @param {String} plainData Plain data
 * @param {String} hash Hash to compare with
 * @returns {Boolean} Returns true if equal
 */
BCryptHash.prototype.compareSync = function (plainData, hash) {
  return bcrypt.compareSync(plainData, hash);
};

module.exports = BCryptHash;
