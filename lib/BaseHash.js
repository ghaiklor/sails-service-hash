/**
 * Message for implement method
 * @type {String}
 */
var IMPLEMENT_MESSAGE = "Not implemented";

/**
 * BaseHash class
 * @constructor
 */
function BaseHash(content) {
  // TODO: think about typeof content == object

  if (!content) {
    throw new Error("You must provide plain data or hash");
  }

  this.setContent(content);
}

BaseHash.prototype = Object.create({
  constructor: BaseHash,

  /**
   * Get current content of hash
   * @returns {*}
   */
  getContent: function () {
    return this._content;
  },

  /**
   * Set new content for hash or compare
   * @param {*} content
   * @returns {BaseHash}
   */
  setContent: function (content) {
    this._content = content;
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
});

module.exports = BaseHash;
