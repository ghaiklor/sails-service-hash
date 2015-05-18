var BCryptHash = require('./BCryptHash');

module.exports = {
  create: function (type, options) {
    switch (type) {
      case 'bcrypt':
        return new BCryptHash(options);
      default:
        throw new Error('Unrecognized type -> ' + type);
    }
  },

  BCrypt: BCryptHash
};
