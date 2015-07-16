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

/**
 * Default cost of processing the data
 * @type {Number}
 * @private
 */
var DEFAULT_ROUNDS = 10;

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
  return this.get('salt');
};

/**
 * Set new salt for bcrypt
 * @param {String} salt New salt
 * @returns {BCryptHash}
 */
BCryptHash.prototype.setSalt = function (salt) {
  this.set('salt', salt);
  return this;
};

/**
 * Get current salt length
 * @returns {Number}
 */
BCryptHash.prototype.getSaltLength = function () {
  return this.get('saltLength') || DEFAULT_SALT_LENGTH;
};

/**
 * Set new salt length
 * @param {Number} length Length of salt
 * @returns {BCryptHash}
 */
BCryptHash.prototype.setSaltLength = function (length) {
  this.set('saltLength', length);
  return this;
};

/**
 * Get current rounds for generating salt
 * @returns {Number}
 */
BCryptHash.prototype.getRounds = function () {
  return this.get('rounds') || DEFAULT_ROUNDS;
};

/**
 * Set rounds for generating salt
 * @param {Number} rounds
 * @returns {BCryptHash}
 */
BCryptHash.prototype.setRounds = function (rounds) {
  this.set('rounds', rounds);
  return this;
};

/**
 * Generates new bcrypt salt in sync mode
 * @param {Number} [rounds]
 * @returns {String}
 */
BCryptHash.prototype.generateSaltSync = function (rounds) {
  return bcrypt.genSaltSync(rounds || this.getRounds());
};

/**
 * Generate new bcrypt salt
 * @param {Number} [rounds]
 * @returns {Promise}
 */
BCryptHash.prototype.generateSalt = function (rounds) {
  return new Promise(function (resolve, reject) {
    bcrypt.genSalt(rounds || this.getRounds(), function (error, salt) {
      return error ? reject(error) : resolve(salt);
    });
  }.bind(this));
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
