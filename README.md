# once
The simple JavaScript library to call a function once and only once

## Usage

To install the module, run

```sh
npm i @sarosia/once
```

```js
const once = require('@sarosia/once');

getCachedObject = once(() => {
  return {};
});
```

Calling getCachedObject() will create the instance once and always return the
same instance.
