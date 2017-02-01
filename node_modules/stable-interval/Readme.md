
# stable-interval

Stable `setInterval`.

## Installation

    $ npm install stable-interval

## Example

```js
var StableInterval = require('stable-interval');
var interval = new StableInterval();
var clearButton = document.querySelector('.button-clear');

interval.set(function() {
  console.log('fires every seconds');
}, 1000);

clearButton.addEventListener('click', function(e) {
  // cancel interval
  interval.clear();
}, false);
```

## License

MIT
