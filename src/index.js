import BCryptHash from './BCryptHash';

var hash = {
  bcrypt: BCryptHash
};

/**
 * Create Hash instance
 * @param {String} type Type of hash instance
 * @param {Object} [config] Additional options for hash instance
 * @returns {*}
 */
export default function (type, config) {
  if (hash[type.toLowerCase()] instanceof Function) {
    return new hash[type.toLowerCase()](config);
  } else {
    throw new Error('Unrecognized type -> ' + type);
  }
}
