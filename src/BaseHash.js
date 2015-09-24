var _ = require('lodash');

/**
 * BaseHash class
 * @param {Object} _config Additional configuration for hash
 * @constructor
 */
function BaseHash(_config) {
  this._config = {};

  _.forOwn(_config, function (value, key) {
    this.set(key, value);
  }.bind(this));
}

/**
 * Get configuration value
 * @param {String} [path]
 * @returns {*}
 */
BaseHash.prototype.get = function (path) {
  return typeof path === 'undefined' ? this._config : _.get(this._config, path);
};

/**
 * Set new configuration value
 * @param {String} path
 * @param {*} value
 * @returns {BaseHash}
 */
BaseHash.prototype.set = function (path, value) {
  _.set(this._config, path, value);
  return this;
};

BaseHash.prototype.hash = _;
BaseHash.prototype.hashSync = _;
BaseHash.prototype.compare = _;
BaseHash.prototype.compareSync = _;

module.exports = BaseHash;
