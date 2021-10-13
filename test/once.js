const chai = require('chai');
chai.use(require('chai-as-promised'));
const expect = chai.expect;
const once = require('../lib/once');

describe('once', () => {
  function createCounterFunc(options = {}) {
    let counter = 0;
    if (options.asyncFunc) {
      return async function () {
        if (options.throwError) {
          throw new Error(counter++);
        }
        return counter++;
      };
    }
    return function () {
      if (options.throwError) {
        throw new Error(counter++);
      }
      return counter++;
    };
  }

  it('no once', () => {
    const func = createCounterFunc();
    expect(func()).equals(0);
    expect(func()).equals(1);
    expect(func()).equals(2);
  });

  it('once', () => {
    const func = once(createCounterFunc());
    expect(func()).equals(0);
    expect(func()).equals(0);
    expect(func()).equals(0);
  });

  it('error', () => {
    const func = once(createCounterFunc({ throwError: true }));
    expect(func).to.throw(Error, '0');
    expect(func).to.throw(Error, '0');
    expect(func).to.throw(Error, '0');
  });

  it('async', async () => {
    const func = once(createCounterFunc({ asyncFunc: true }));
    expect(func()).to.be.an.instanceof(Promise);
    expect(func()).equals(func());
    expect(await func()).equals(0);
    expect(await func()).equals(0);
    expect(await func()).equals(0);
  });

  it('async error', async () => {
    const func = once(createCounterFunc({ asyncFunc: true, throwError: true }));
    expect(func()).to.be.an.instanceof(Promise);
    expect(func()).equals(func());
    expect(func()).to.eventually.rejectedWith(Error, '0');
  });
});
