var hashes = {
  bcrypt: require('./BCryptHash')
};

module.exports = {
  /**
   * Create Hash instance
   * @param {String} type Type of hash instance
   * @param {Object} config Additional options for hash instance
   * @returns {*}
   */
  create: function (type, config) {
    if (hashes[type.toLowerCase()] instanceof Function) {
      return new hashes[type.toLowerCase()](config);
    } else {
      throw new Error('Unrecognized type -> ' + type);
    }
  },

  BCryptHash: hashes.bcrypt
};
