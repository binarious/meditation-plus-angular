
# stable-timeout

Stable `setTimeout`.

## Installation

    $ npm install stable-timeout

## Example

```js
var StableTimeout = require('stable-timeout');
var timeout = new StableTimeout();
var clearButton = document.querySelector('.button-clear');

timeout.set(function() {
  console.log('fired after 10s');
}, 10000);

clearButton.addEventListener('click', function(e) {
  // cancel timeout
  timeout.clear();
}, false);
```

## License

MIT
