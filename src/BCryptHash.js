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
   * @param {String} _salt New salt
   * @returns {BCryptHash}
   */
  setSalt(_salt) {
    this.set('salt', _salt);
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
   * @param {Number} _length Length of salt
   * @returns {BCryptHash}
   */
  setSaltLength(_length) {
    this.set('saltLength', _length);
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
   * @param {Number} _rounds
   * @returns {BCryptHash}
   */
  setRounds(_rounds) {
    this.set('rounds', _rounds);
    return this;
  }

  /**
   * Generate new bcrypt salt
   * @param {Number} [_rounds]
   * @returns {Promise}
   */
  generateSalt(_rounds) {
    return new Promise((resolve, reject) => {
      bcrypt.genSalt(_rounds || this.getRounds(), (error, salt) => error ? reject(error) : resolve(salt));
    });
  }

  /**
   * Generates new bcrypt salt in sync mode
   * @param {Number} [_rounds]
   * @returns {String}
   */
  generateSaltSync(_rounds) {
    return bcrypt.genSaltSync(_rounds || this.getRounds());
  }

  /**
   * Hash data
   * @param {String} _data Data to hash with bcrypt
   * @param {Object} [_config] Additional configuration where you can override pre-defined config
   * @returns {Promise}
   */
  hash(_data, _config) {
    let config = _.merge({}, this.get(), {
      salt: this.getSalt(),
      saltLength: this.getSaltLength()
    }, _config);

    return new Promise((resolve, reject) => {
      bcrypt.hash(_data, config.salt || config.saltLength, (error, hash) => error ? reject(error) : resolve(hash));
    });
  }

  /**
   * Hash data in sync mode
   * @param {String} _data Data to hash with bcrypt
   * @param {Object} [_config] Additional configuration where you can override pre-defined config
   * @returns {String} Returns hashed data
   */
  hashSync(_data, _config) {
    let config = _.merge({}, this.get(), {
      salt: this.getSalt(),
      saltLength: this.getSaltLength()
    }, _config);

    return bcrypt.hashSync(_data, config.salt || config.saltLength);
  }

  /**
   * Compare hash with plain data
   * @param {String} _plainData Plain data
   * @param {String} _hash Hash to compare with
   * @returns {Promise}
   */
  compare(_plainData, _hash) {
    return new Promise((resolve, reject) => {
      bcrypt.compare(_plainData, _hash, (error, equal) => error ? reject(error) : resolve(equal));
    });
  }

  /**
   * Compare data with hash in sync mode
   * @param {String} _plainData Plain data
   * @param {String} _hash Hash to compare with
   * @returns {Boolean} Returns true if equal
   */
  compareSync(_plainData, _hash) {
    return bcrypt.compareSync(_plainData, _hash);
  }
};
