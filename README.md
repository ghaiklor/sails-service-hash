# sails-service-hash

![Build Status](https://img.shields.io/travis/ghaiklor/sails-service-hash.svg) ![Coverage](https://img.shields.io/coveralls/ghaiklor/sails-service-hash.svg) ![Downloads](https://img.shields.io/npm/dm/sails-service-hash.svg) ![npm version](https://img.shields.io/npm/v/sails-service-hash.svg) ![dependencies](https://img.shields.io/david/ghaiklor/sails-service-hash.svg) ![dev dependencies](https://img.shields.io/david/dev/ghaiklor/sails-service-hash.svg) ![License](https://img.shields.io/npm/l/sails-service-hash.svg)

Service for Sails framework with Hash features.

## List of supported hashes

- bcrypt

## Getting Started

Install this module.

```shell
npm install sails-service-hash
```

Then require it in your service.

```javascript
// api/services/HashService.js
module.exports = require('sails-service-hash');
```

That's it, you can create instances of hash for your need in your project.

```javascript
// api/controllers/SomeController.js
var bcrypt = HashService.create('bcrypt');

module.exports = {
  someAction: function(req, res) {
    var myPasswordInHash = bcrypt.hashSync('MY_PASSWORD');
    var isCorrectPassword = bcrypt.compareSync('MY_PASSWORD', myPasswordInHash);
    res.ok(isCorrectPassword);
  }
};
```

## API

Each of Hash instances has 4 methods:

- hash(data) - Hash your data and returns Promise
- hashSync(data) - Hash your data and returns hash
- compare(plainData, hash) - Compare plainData with hash and returns Promise
- compareSync(plainData, hash) - Compare plainData with hash and returns Boolean

## Examples

### BCryptHash

```javascript
var bcrypt = HashService.create('bcrypt', {
  salt: '<SALT_GENERATED_VIA_BCRYPT>', // Optional argument if you want to specify custom salt
  saltLength: 10 // Optional argument if you want to specify length of auto-generated salt
});

bcrypt.hash('MY_PASSWORD').then(function(hash) {
  bcrypt.compare('MY_PASSWORD', hash).then(console.log.bind(console));
});

var hash = bcrypt.hashSync('MY_PASSWORD');
var isEqual = bcrypt.compareSync('MY_PASSWORD', hash);
```

## License

The MIT License (MIT)

Copyright (c) 2015 Eugene Obrezkov

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
