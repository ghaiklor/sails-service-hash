import _ from 'lodash';
import bcrypt from 'bcrypt';
import BaseHash from './BaseHash';

/**
 * Default salt length
 * @type {Number}
 * @private
 */
const DEFAULT_SALT_LENGTH = 10;

/**
 * Default cost of processing the data
 * @type {Number}
 * @private
 */
const DEFAULT_ROUNDS = 10;

export default class BCryptHash extends BaseHash {
  constructor(...args) {
    super(...args);
  }

  /**
   * Get salt
   * @returns {String}
   */
  getSalt() {
    return this.get('salt');
  }

  /**
   * Set new salt for bcrypt
   * @param {String} salt New salt
   * @returns {BCryptHash}
   */
  setSalt(salt) {
    this.set('salt', salt);
    return this;
  }

  /**
   * Get current salt length
   * @returns {Number}
   */
  getSaltLength() {
    return this.get('saltLength') || DEFAULT_SALT_LENGTH;
  }

  /**
   * Set new salt length
   * @param {Number} length Length of salt
   * @returns {BCryptHash}
   */
  setSaltLength(length) {
    this.set('saltLength', length);
    return this;
  }

  /**
   * Get current rounds for generating salt
   * @returns {Number}
   */
  getRounds() {
    return this.get('rounds') || DEFAULT_ROUNDS;
  }

  /**
   * Set rounds for generating salt
   * @param {Number} rounds
   * @returns {BCryptHash}
   */
  setRounds(rounds) {
    this.set('rounds', rounds);
    return this;
  }

  /**
   * Generate new bcrypt salt
   * @param {Number} [rounds]
   * @returns {Promise}
   */
  generateSalt(rounds) {
    return new Promise((resolve, reject) => {
      bcrypt.genSalt(rounds || this.getRounds(), (error, salt) => error ? reject(error) : resolve(salt));
    });
  }

  /**
   * Generates new bcrypt salt in sync mode
   * @param {Number} [rounds]
   * @returns {String}
   */
  generateSaltSync(rounds) {
    return bcrypt.genSaltSync(rounds || this.getRounds());
  }

  /**
   * Hash data
   * @param {String} data Data to hash with bcrypt
   * @param {Object} [_config] Additional configuration where you can override pre-defined config
   * @returns {Promise}
   */
  hash(data, _config) {
    let config = _.merge({}, this.get(), {
      salt: this.getSalt(),
      saltLength: this.getSaltLength()
    }, _config);

    return new Promise((resolve, reject) => {
      bcrypt.hash(data, config.salt || config.saltLength, (error, hash) => error ? reject(error) : resolve(hash));
    });
  }

  /**
   * Hash data in sync mode
   * @param {String} data Data to hash with bcrypt
   * @param {Object} [_config] Additional configuration where you can override pre-defined config
   * @returns {String} Returns hashed data
   */
  hashSync(data, _config) {
    let config = _.merge({}, this.get(), {
      salt: this.getSalt(),
      saltLength: this.getSaltLength()
    }, _config);

    return bcrypt.hashSync(data, config.salt || config.saltLength);
  }

  /**
   * Compare hash with plain data
   * @param {String} plainData Plain data
   * @param {String} hash Hash to compare with
   * @returns {Promise}
   */
  compare(plainData, hash) {
    return new Promise((resolve, reject) => {
      bcrypt.compare(plainData, hash, (error, equal) => error ? reject(error) : resolve(equal));
    });
  }

  /**
   * Compare data with hash in sync mode
   * @param {String} plainData Plain data
   * @param {String} hash Hash to compare with
   * @returns {Boolean} Returns true if equal
   */
  compareSync(plainData, hash) {
    return bcrypt.compareSync(plainData, hash);
  }
};
