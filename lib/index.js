var BCryptHash = require('./BCryptHash');

module.exports = {
  /**
   * Create Hash instance
   * @param {String} type Type of hash instance
   * @param {Object} options Additional options for hash instance
   * @returns {*}
   */
  create: function (type, options) {
    switch (type) {
      case 'bcrypt':
        return new BCryptHash(options);
      default:
        throw new Error('Unrecognized type -> ' + type);
    }
  },

  BCryptHash: BCryptHash
};
