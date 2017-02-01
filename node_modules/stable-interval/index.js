
/**
 * Module dependencies.
 */

var pseudo = require('pseudo-function');

/**
 * Worker function for `setInterval`.
 */

var interval = pseudo(function() {
  var timerId = null;
  self.onmessage = function(e) {
    if (timerId) {
      timerId = clearInterval(timerId);
      return;
    }
    timerId = setInterval(function() {
      self.postMessage(0);
    }, e.data);
  };
});


/**
 * Expose `StableInterval`.
 */

module.exports = StableInterval;

/**
 * @api private
 */

function StableInterval() {
  if (!(this instanceof StableInterval)) return new StableInterval();
};

/**
 * @param {Function} fn
 * @param {Number} ms
 * @api public
 */

StableInterval.prototype.set = function(fn, ms) {
  if (this.worker) throw new Error('callback is already registered.');
  this.worker = new Worker(interval);
  this.worker.onmessage = fn;
  this.worker.postMessage(ms);
};

/**
 * @api public
 */

StableInterval.prototype.clear = function() {
  if (!this.worker) return;
  this.worker.postMessage(void 0);
  this.worker = null;
};
