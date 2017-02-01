
# function-body-regex

[![Build Status](https://travis-ci.org/nulltask/function-body-regex.svg?branch=master)](https://travis-ci.org/nulltask/function-body-regex)

function-body-regex is regex to rip off function body.

## Example

```js
var regex = require('function-body-regex');

var fn = function() {
  console.log('this is function body.');
  return true;
};

var ret = regex.exec(fn.toString());
console.log(ret[1]);  // => '\nconsole.log(\'this is function body.\');\nreturn true;\n'
```

## Installation

    $ npm install function-body-regex

## License

MIT
