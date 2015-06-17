/**
 * Message for implement method
 * @type {String}
 */
var IMPLEMENT_MESSAGE = 'Not implemented';

/**
 * BaseHash class
 * @param {Object} _config Additional configuration for hash
 * @constructor
 */
function BaseHash(_config) {
  var config = _config || {};

  Object.keys(config).forEach(function (key) {
    this.setConfig(key, config[key]);
  }.bind(this));
}

BaseHash.prototype = {
  /**
   * Get configuration value
   * @param {String} key
   * @returns {*}
   */
  getConfig: function (key) {
    return typeof key === 'undefined' ? this._config : this._config && this._config[key];
  },

  /**
   * Set new configuration value
   * @param {String} key
   * @param {*} value
   * @returns {BaseHash}
   */
  setConfig: function (key, value) {
    this._config[key] = value;
    return this;
  },

  /**
   * Hash plain data
   */
  hash: function () {
    throw new Error(IMPLEMENT_MESSAGE);
  },

  /**
   * Hash plain data in sync mode
   */
  hashSync: function () {
    throw new Error(IMPLEMENT_MESSAGE);
  },

  /**
   * Compare hash to plain data
   */
  compare: function () {
    throw new Error(IMPLEMENT_MESSAGE);
  },

  /**
   * Compare hash to plain data in sync mode
   */
  compareSync: function () {
    throw new Error(IMPLEMENT_MESSAGE);
  }
};

module.exports = BaseHash;
