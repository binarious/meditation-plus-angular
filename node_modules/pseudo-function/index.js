
/**
 * Module dependencies.
 */

var regex = require('function-body-regex');
var Blob = require('blob');

/**
 * Expose `PseudoFunction`.
 */

module.exports = PseudoFunction;

/**
 * `URL` object.
 */

var URL = window.URL || window.webkitURL;

/**
 * @param {Function} fn
 * @api public
 */

function PseudoFunction(fn) {
  if (!(this instanceof PseudoFunction)) return new PseudoFunction(fn);
  var result = regex.exec(fn.toString());
  if (null == result) throw new TypeError('invalid function is given.');
  this.fn = fn;
  this.body = result[1];
  this.objectURL = null;
}

/**
 * @return {String}
 * @api public
 */

PseudoFunction.prototype.toString = function() {
  if (!this.objectURL) {
    this.objectURL = this.create(this.body);
  }
  return this.objectURL;
};

/**
 * @return {String}
 * @api private
 */

PseudoFunction.prototype.create = function(body) {
  return URL.createObjectURL(new Blob([body], { type: 'text/javascript' }));
};

/**
 * @return {PseudoFunction}
 * @api public
 */

PseudoFunction.prototype.revoke = function() {
  if (!this.objectURL) return this;
  URL.revokeObjectURL(this.objectURL);
  this.objectURL = null;
  return this;
};
