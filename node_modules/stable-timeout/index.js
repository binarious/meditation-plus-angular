
/**
 * Module dependencies.
 */

var pseudo = require('pseudo-function');

/**
 * Worker function for `setTimeout`.
 */

var timeout = pseudo(function() {
  var timerId = null;
  self.onmessage = function(e) {
    if (timerId) {
      timerId = clearTimeout(timerId);
      return;
    }
    timerId = setTimeout(function() {
      self.postMessage(0);
    }, e.data);
  };
});

/**
 * Expose `StableTimeout`.
 */

module.exports = StableTimeout;

/**
 * @api public
 */

function StableTimeout() {
  if (!(this instanceof StableTimeout)) return new StableTimeout();
}

/**
 * @param {Function} fn
 * @param {Number} ms
 * @api public
 */

StableTimeout.prototype.set = function(fn, ms) {
  if (this.worker) throw new Error('callback is already registered.');
  this.worker = new Worker(timeout);
  this.worker.onmessage = fn;
  this.worker.postMessage(ms);
};

/**
 * @api public
 */

StableTimeout.prototype.clear = function() {
  if (!this.worker) return;
  this.worker.postMessage(void 0);
  this.worker = null;
};
