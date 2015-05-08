var BCryptHash = require('./BCryptHash');

/**
 * Create new factory for hash services
 * @constructor
 */
function HashFactory() {
}

HashFactory.prototype = Object.create({
  constructor: HashFactory,

  /**
   * Create hash instance based on type
   * @param {String} type Type of hash service
   * @param {Object} options Config for hash instance
   * @returns {*}
   */
  create: function (type, options) {
    switch (type) {
      case 'bcrypt':
        return this.createBCryptHash(options);
      default:
        throw new Error('Unrecognized type -> ' + type);
    }
  },

  /**
   * Create bcrypt instance
   * @param {Object} options
   * @returns {BCryptHash}
   */
  createBCryptHash: function (options) {
    return new BCryptHash(options);
  }
});

module.exports = HashFactory;
