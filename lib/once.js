/**
 * Returns a function that wraps the given function `func`. Calling the wrapper
 * function will only invoke the underlying `func` once, and all subsequent
 * calls to the wrapper function will return the return value from the first
 * call. If the underlying `func` throw an error, the wrapper function will
 * throw the same error for the first and all the subsequence invocations.
 *
 * @param {Function} func
 * @return {Function} The wrapper function to ensure that the underlying
 * function to be called only once.
 */
function once(func) {
  let called = false;
  let ret;
  let error;

  return function () {
    if (called) {
      if (error) {
        throw error;
      }
      return ret;
    }
    called = true;
    try {
      ret = func();
    } catch (e) {
      error = e;
      throw e;
    }
    return ret;
  };
}

module.exports = once;
