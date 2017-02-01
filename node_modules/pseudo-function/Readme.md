
# pseudo-function

[![Build Status](https://travis-ci.org/nulltask/pseudo-function.svg)](https://travis-ci.org/nulltask/pseudo-function)

Turn the function object to URL object. This library is useful to create web workers from inline functions.

## Supported Browsers

- Internet Explorer 11+
- Firefox 12+
- Google Chrome 26+
- Safari 6+
- iOS 6.0+
- Android 4.4+

## Installation

npm:

    $ npm install pseudo-function

bower:

    $ bower install pseudo-function

## Example

```js
// var pfn = window.PseudoFunction; // bower
var pfn = require('pseudo-function'); // browserify

var fn = pfn(function() {
  setInterval(function() {
    self.postMessage(new Date());
  }, 1000);
});

var worker = new Worker(fn);

worker.onmessage = function(e) {
  console.log(e.data);
};

setTimeout(function() {
  worker.terminate();
  fn.revoke();  // clean up pseudo function
  console.log('terminated');
}, 5000);
```

## License

MIT
