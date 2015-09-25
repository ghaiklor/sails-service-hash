import _ from 'lodash';

export default class BaseHash {
  constructor(config) {
    this._config = {};

    _.assign(this._config, config);
  }

  /**
   * Get configuration value
   * @param {String} [path]
   * @returns {*}
   */
  get(path) {
    return typeof path === 'undefined' ? this._config : _.get(this._config, path);
  }

  /**
   * Set new configuration value
   * @param {String} path
   * @param {*} value
   * @returns {BaseHash}
   */
  set(path, value) {
    _.set(this._config, path, value);
    return this;
  }
}
