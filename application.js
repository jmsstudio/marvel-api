webpackJsonp([0],{

/***/ 186:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(187);

var _react = __webpack_require__(2);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(19);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _App = __webpack_require__(198);

var _App2 = _interopRequireDefault(_App);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable no-undef */
var root = document.getElementById('root');

_reactDom2.default.render(_react2.default.createElement(_App2.default, null), root);

/***/ }),

/***/ 187:
/***/ (function(module, exports) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

!(function(global) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  runtime.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration. If the Promise is rejected, however, the
          // result for this iteration will be rejected with the same
          // reason. Note that rejections of yielded Promises are not
          // thrown back into the generator function, as is the case
          // when an awaited Promise is rejected. This difference in
          // behavior between yield and await is important, because it
          // allows the consumer to decide what to do with the yielded
          // rejection (swallow it and continue, manually .throw it back
          // into the generator, abandon iteration, whatever). With
          // await, by contrast, there is no opportunity to examine the
          // rejection reason outside the generator function, so the
          // only option is to throw it from the await expression, and
          // let the generator function handle the exception.
          result.value = unwrapped;
          resolve(result);
        }, reject);
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  runtime.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        if (delegate.iterator.return) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };
})(
  // In sloppy mode, unbound `this` refers to the global object, fallback to
  // Function constructor if we're in global strict mode. That is sadly a form
  // of indirect eval which violates Content Security Policy.
  (function() { return this })() || Function("return this")()
);


/***/ }),

/***/ 198:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(2);

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = __webpack_require__(20);

var _Template = __webpack_require__(207);

var _Template2 = _interopRequireDefault(_Template);

var _AboutPage = __webpack_require__(208);

var _AboutPage2 = _interopRequireDefault(_AboutPage);

var _CharactersPage = __webpack_require__(209);

var _CharactersPage2 = _interopRequireDefault(_CharactersPage);

var _ComicsPage = __webpack_require__(238);

var _ComicsPage2 = _interopRequireDefault(_ComicsPage);

var _marvelApi = __webpack_require__(240);

var _marvelApi2 = _interopRequireDefault(_marvelApi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function App() {
  return _react2.default.createElement(
    _reactRouterDom.BrowserRouter,
    null,
    _react2.default.createElement(
      _Template2.default,
      null,
      _react2.default.createElement(_reactRouterDom.Route, { component: _CharactersPage2.default, exact: true, path: '/' }),
      _react2.default.createElement(_reactRouterDom.Route, { component: _ComicsPage2.default, exact: true, path: '/comics' }),
      _react2.default.createElement(_reactRouterDom.Route, { component: _AboutPage2.default, exact: true, path: '/about' })
    )
  );
}

//needed to compile sass to css
/* eslint-disable no-unused-vars */
exports.default = App;

/***/ }),

/***/ 207:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(2);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(6);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRouterDom = __webpack_require__(20);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Template(_ref) {
  var children = _ref.children;

  return _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement(
      'header',
      { className: 'ma-header' },
      _react2.default.createElement(
        'h1',
        null,
        'Marvel API'
      )
    ),
    _react2.default.createElement(
      'aside',
      { className: 'ma-menu' },
      _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          _reactRouterDom.NavLink,
          { to: '/', exact: true, activeClassName: 'active' },
          _react2.default.createElement(
            'div',
            { className: 'ma-menu-item' },
            _react2.default.createElement('i', { className: 'fa fa-fw fa-2x fa-users' }),
            _react2.default.createElement(
              'span',
              null,
              'Characters'
            )
          )
        ),
        _react2.default.createElement(
          _reactRouterDom.NavLink,
          { to: '/comics', exact: true, activeClassName: 'active' },
          _react2.default.createElement(
            'div',
            { className: 'ma-menu-item' },
            _react2.default.createElement('i', { className: 'fa fa-fw fa-2x fa-book' }),
            _react2.default.createElement(
              'span',
              null,
              'Comics'
            )
          )
        ),
        _react2.default.createElement(
          _reactRouterDom.NavLink,
          { to: '/about', exact: true, activeClassName: 'active' },
          _react2.default.createElement(
            'div',
            { className: 'ma-menu-item' },
            _react2.default.createElement('i', { className: 'fa fa-fw fa-2x fa-info-circle' }),
            _react2.default.createElement(
              'span',
              null,
              'About'
            )
          )
        )
      )
    ),
    _react2.default.createElement(
      'main',
      { className: 'ma-app-container' },
      children
    )
  );
}

Template.propTypes = {
  children: _propTypes2.default.any
};

exports.default = Template;

/***/ }),

/***/ 208:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(2);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function MainPage() {
  return _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement(
      'h2',
      null,
      'Marvel API Data'
    ),
    _react2.default.createElement('hr', null),
    _react2.default.createElement(
      'p',
      null,
      'This project was created by ',
      _react2.default.createElement(
        'em',
        null,
        'Jefferson Mariano de Souza'
      ),
      ' as a way to learn a little more about javascript and react framework.'
    ),
    _react2.default.createElement(
      'p',
      null,
      'It serves as a front-end project using data provided from the',
      ' ',
      _react2.default.createElement(
        'a',
        { href: 'http://developer.marvel.com', target: '_blank', rel: 'noopener noreferrer' },
        'Marvel Api'
      )
    ),
    _react2.default.createElement(
      'p',
      null,
      'The main technologies used in this project were react, mobx and sass.'
    ),
    _react2.default.createElement(
      'p',
      null,
      'If you want to contact me, here are my contacts:'
    ),
    _react2.default.createElement(
      'ul',
      null,
      _react2.default.createElement(
        'li',
        null,
        _react2.default.createElement(
          'a',
          { href: 'https://github.com/jmsstudio', target: '_blank', rel: 'noopener noreferrer' },
          _react2.default.createElement('i', { className: 'fa fa-fw fa-2x fa-github' }),
          ' /jmsstudio'
        )
      ),
      _react2.default.createElement(
        'li',
        null,
        _react2.default.createElement(
          'a',
          { href: 'mailto:jefferson.msouza86@gmail.com', target: '_blank', rel: 'noopener noreferrer' },
          _react2.default.createElement('i', { className: 'fa fa-fw fa-2x fa-envelope-o' }),
          ' jefferson.msouza86@gmail.com'
        )
      )
    ),
    _react2.default.createElement(
      'p',
      null,
      'If you want to contribute,',
      ' ',
      _react2.default.createElement(
        'a',
        { href: 'https://github.com/jmsstudio/marvel-api', title: 'MarvelAPI' },
        'this'
      ),
      ' ',
      'is the project repository:'
    ),
    _react2.default.createElement(
      'a',
      { href: 'https://github.com/jmsstudio/marvel-api', title: 'Fork me on github' },
      _react2.default.createElement('i', { className: 'fa fa-fw fa-2x fa-code-fork' }),
      ' Fork me on ',
      _react2.default.createElement('i', { className: 'fa fa-fw fa-lg fa-github-alt' })
    )
  );
}

exports.default = MainPage;

/***/ }),

/***/ 209:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class;

var _react = __webpack_require__(2);

var _react2 = _interopRequireDefault(_react);

var _mobxReact = __webpack_require__(29);

var _mobx = __webpack_require__(16);

var _debounce2 = __webpack_require__(47);

var _debounce3 = _interopRequireDefault(_debounce2);

var _reactRouterDom = __webpack_require__(20);

var _ComicsState = __webpack_require__(51);

var _ComicsState2 = _interopRequireDefault(_ComicsState);

var _LazyImage = __webpack_require__(58);

var _LazyImage2 = _interopRequireDefault(_LazyImage);

var _Scrollable = __webpack_require__(59);

var _Scrollable2 = _interopRequireDefault(_Scrollable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CharactersPage = (0, _mobxReact.observer)(_class = function (_React$Component) {
  _inherits(CharactersPage, _React$Component);

  function CharactersPage(props) {
    _classCallCheck(this, CharactersPage);

    var _this = _possibleConstructorReturn(this, (CharactersPage.__proto__ || Object.getPrototypeOf(CharactersPage)).call(this, props));

    _this.store = _ComicsState2.default;

    _this._handleChange = (0, _debounce3.default)(_this._handleChange, 350).bind(_this);
    _this._handleSelectCharacter = _this._handleSelectCharacter.bind(_this);
    return _this;
  }

  _createClass(CharactersPage, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.store.loadCharacters();
    }
  }, {
    key: '_handleChange',
    value: function _handleChange() {
      this.store.loadCharacters();
    }
  }, {
    key: '_handleSelectCharacter',
    value: function _handleSelectCharacter(id) {
      this.store.selectCharacter(id);

      //navigate to comics section
      this.props.history.push('/comics');
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var percent = Math.round(this.store.charactersList.length / this.store.characterPaginateConfig.total * 100) / 100;
      var loadingMessage = this.store.isLoadingCharacters ? _react2.default.createElement('i', { className: 'fa fa-spinner fa-pulse fa-3x fa-fw' }) : null;

      var defaultNoCharactersMessage = _react2.default.createElement(
        'h4',
        { className: 'ma-text-center' },
        'No characters found for the typed query.'
      );
      var hasData = true;
      var chars = (0, _mobx.toJS)(this.store.charactersList);

      if (chars.length == 0 && !this.store.isLoadingCharacters) {
        hasData = false;
      }

      return _react2.default.createElement(
        _Scrollable2.default,
        { check: !this.store.isLoadingCharacters, callback: function callback() {
            return _this2.store.loadCharacters(true);
          } },
        _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'h2',
            null,
            'Characters'
          ),
          _react2.default.createElement('hr', null),
          _react2.default.createElement(
            'div',
            { className: 'ma-mv--5 ma-mb--10 ma-mh--5' },
            _react2.default.createElement(
              'label',
              { htmlFor: 'characterName' },
              'Filter characters'
            ),
            _react2.default.createElement('input', {
              type: 'text',
              className: 'ma-full',
              id: 'characterName',
              placeholder: 'Type to filter characters',
              value: this.store.searchName,
              onChange: function onChange(e) {
                _this2.store.changeCharacterSearchName(e.target.value);
                _this2._handleChange();
              }
            })
          ),
          _react2.default.createElement(
            'div',
            { className: 'ma-grid ma-mt--20' },
            this.store.charactersList.map(function (character, i) {
              return _react2.default.createElement(
                'div',
                { key: i },
                _react2.default.createElement(
                  'span',
                  { className: 'ma-pointer', onClick: function onClick() {
                      return _this2._handleSelectCharacter(character.id);
                    } },
                  character.name
                ),
                _react2.default.createElement(
                  'div',
                  null,
                  _react2.default.createElement(_LazyImage2.default, {
                    className: 'ma-tiny ma-pointer',
                    src: character.thumbnail.path + '.' + character.thumbnail.extension,
                    alt: character.description,
                    onClick: function onClick() {
                      return _this2._handleSelectCharacter(character.id);
                    }
                  })
                )
              );
            })
          ),
          !hasData ? defaultNoCharactersMessage : null,
          _react2.default.createElement(
            'div',
            { className: 'ma-text-center' },
            loadingMessage
          ),
          _react2.default.createElement(
            'footer',
            { className: 'ma-app-footer' },
            'Loaded ',
            this.store.charactersList.length,
            ' from ',
            this.store.characterPaginateConfig.total,
            ' (',
            percent,
            '%)'
          )
        )
      );
    }
  }]);

  return CharactersPage;
}(_react2.default.Component)) || _class;

exports.default = (0, _reactRouterDom.withRouter)(CharactersPage);

/***/ }),

/***/ 210:
/***/ (function(module, exports, __webpack_require__) {

var root = __webpack_require__(49);

/**
 * Gets the timestamp of the number of milliseconds that have elapsed since
 * the Unix epoch (1 January 1970 00:00:00 UTC).
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Date
 * @returns {number} Returns the timestamp.
 * @example
 *
 * _.defer(function(stamp) {
 *   console.log(_.now() - stamp);
 * }, _.now());
 * // => Logs the number of milliseconds it took for the deferred invocation.
 */
var now = function() {
  return root.Date.now();
};

module.exports = now;


/***/ }),

/***/ 211:
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

module.exports = freeGlobal;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(30)))

/***/ }),

/***/ 212:
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(48),
    isSymbol = __webpack_require__(213);

/** Used as references for various `Number` constants. */
var NAN = 0 / 0;

/** Used to match leading and trailing whitespace. */
var reTrim = /^\s+|\s+$/g;

/** Used to detect bad signed hexadecimal string values. */
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

/** Used to detect binary string values. */
var reIsBinary = /^0b[01]+$/i;

/** Used to detect octal string values. */
var reIsOctal = /^0o[0-7]+$/i;

/** Built-in method references without a dependency on `root`. */
var freeParseInt = parseInt;

/**
 * Converts `value` to a number.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {number} Returns the number.
 * @example
 *
 * _.toNumber(3.2);
 * // => 3.2
 *
 * _.toNumber(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toNumber(Infinity);
 * // => Infinity
 *
 * _.toNumber('3.2');
 * // => 3.2
 */
function toNumber(value) {
  if (typeof value == 'number') {
    return value;
  }
  if (isSymbol(value)) {
    return NAN;
  }
  if (isObject(value)) {
    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
    value = isObject(other) ? (other + '') : other;
  }
  if (typeof value != 'string') {
    return value === 0 ? value : +value;
  }
  value = value.replace(reTrim, '');
  var isBinary = reIsBinary.test(value);
  return (isBinary || reIsOctal.test(value))
    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
    : (reIsBadHex.test(value) ? NAN : +value);
}

module.exports = toNumber;


/***/ }),

/***/ 213:
/***/ (function(module, exports, __webpack_require__) {

var baseGetTag = __webpack_require__(214),
    isObjectLike = __webpack_require__(217);

/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && baseGetTag(value) == symbolTag);
}

module.exports = isSymbol;


/***/ }),

/***/ 214:
/***/ (function(module, exports, __webpack_require__) {

var Symbol = __webpack_require__(50),
    getRawTag = __webpack_require__(215),
    objectToString = __webpack_require__(216);

/** `Object#toString` result references. */
var nullTag = '[object Null]',
    undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (symToStringTag && symToStringTag in Object(value))
    ? getRawTag(value)
    : objectToString(value);
}

module.exports = baseGetTag;


/***/ }),

/***/ 215:
/***/ (function(module, exports, __webpack_require__) {

var Symbol = __webpack_require__(50);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag),
      tag = value[symToStringTag];

  try {
    value[symToStringTag] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }
  return result;
}

module.exports = getRawTag;


/***/ }),

/***/ 216:
/***/ (function(module, exports) {

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString.call(value);
}

module.exports = objectToString;


/***/ }),

/***/ 217:
/***/ (function(module, exports) {

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && typeof value == 'object';
}

module.exports = isObjectLike;


/***/ }),

/***/ 218:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _axios = __webpack_require__(52);

var _axios2 = _interopRequireDefault(_axios);

var _md = __webpack_require__(10);

var _md2 = _interopRequireDefault(_md);

var _config = __webpack_require__(237);

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BASE_URL = _config2.default.marvelApi.baseUrl;
var CHARACTERS_ENDPOINT = _config2.default.marvelApi.endpoints.characters;
var COMICS_ENDPOINT = _config2.default.marvelApi.endpoints.comics;

var API_PRIVATE_KEY = _config2.default.marvelApi.privateKey;
var API_PUBLIC_KEY = _config2.default.marvelApi.publicKey;

var ComicsService = {
  /**
   * Generates the url params relative to api validation token.
   */
  _generateAccessParams: function _generateAccessParams() {
    var timestamp = new Date().getTime();
    var hash = (0, _md2.default)(timestamp + API_PRIVATE_KEY + API_PUBLIC_KEY);

    return 'ts=' + timestamp + '&apikey=' + API_PUBLIC_KEY + '&hash=' + hash;
  },
  _generatePaginateParams: function _generatePaginateParams(limit, offset) {
    return '&limit=' + limit + '&offset=' + offset;
  },


  /**
   * Loads a list of characters whose name starts with the <code>name</code> (optional)
   *
   * @param {string} name
   */
  loadCharacters: function loadCharacters() {
    var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var limit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 20;
    var offset = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

    var filterName = name ? 'nameStartsWith=' + name : '';
    var paginate = this._generatePaginateParams(limit, offset);

    return _axios2.default.get(BASE_URL + '/' + CHARACTERS_ENDPOINT + '?' + filterName + '&orderBy=name&' + this._generateAccessParams() + paginate);
  },


  /**
   * Load a list of comics for the character with the supplied id.
   *
   * @param {number} characterId
   */
  loadComics: function loadComics(characterId) {
    var limit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 20;
    var offset = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

    var paginate = this._generatePaginateParams(limit, offset);

    return _axios2.default.get(BASE_URL + '/' + COMICS_ENDPOINT + '?characters=' + characterId + '&orderBy=onsaleDate&' + this._generateAccessParams() + paginate);
  }
};

exports.default = ComicsService;

/***/ }),

/***/ 237:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/* eslint-disable no-undef */
module.exports = {
  marvelApi: {
    privateKey: '7311d2dda779f046d3ce454fbc2d9ff08c134aa6',
    publicKey: 'b286fcfc7594db80b7b2bf5af4869c49',
    baseUrl: 'http://gateway.marvel.com/v1/public',
    endpoints: {
      characters: 'characters',
      comics: 'comics'
    }
  }
};

/***/ }),

/***/ 238:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class;

var _react = __webpack_require__(2);

var _react2 = _interopRequireDefault(_react);

var _mobxReact = __webpack_require__(29);

var _mobx = __webpack_require__(16);

var _moment = __webpack_require__(0);

var _moment2 = _interopRequireDefault(_moment);

var _LazyImage = __webpack_require__(58);

var _LazyImage2 = _interopRequireDefault(_LazyImage);

var _ComicsState = __webpack_require__(51);

var _ComicsState2 = _interopRequireDefault(_ComicsState);

var _Scrollable = __webpack_require__(59);

var _Scrollable2 = _interopRequireDefault(_Scrollable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ComicsPage = (0, _mobxReact.observer)(_class = function (_React$Component) {
  _inherits(ComicsPage, _React$Component);

  function ComicsPage(props) {
    _classCallCheck(this, ComicsPage);

    var _this = _possibleConstructorReturn(this, (ComicsPage.__proto__ || Object.getPrototypeOf(ComicsPage)).call(this, props));

    _this.store = _ComicsState2.default;
    return _this;
  }

  _createClass(ComicsPage, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.store.loadComics();
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var percent = Math.round(this.store.comicsList.length / this.store.comicPaginateConfig.total * 100) / 100;
      var defaultNoComicsMessage = _react2.default.createElement(
        'h4',
        null,
        'No comics found for the selected character.'
      );
      var hasData = true;
      var comics = (0, _mobx.toJS)(this.store.comicsList);

      if (comics.length == 0 && !this.store.isLoadingComics) {
        hasData = false;
      }

      var charImage = null;
      if (this.store.selectedCharacter.thumbnail) {
        charImage = _react2.default.createElement('img', {
          className: 'ma-tiny ma-pointer',
          src: this.store.selectedCharacter.thumbnail.path + '.' + this.store.selectedCharacter.thumbnail.extension,
          alt: this.store.selectedCharacter.description
        });
      }

      var loadingMessage = this.store.isLoadingComics ? _react2.default.createElement('i', { className: 'fa fa-spinner fa-pulse fa-3x fa-fw' }) : null;

      return _react2.default.createElement(
        _Scrollable2.default,
        { check: !this.store.isLoadingComics, callback: function callback() {
            return _this2.store.loadComics(true);
          } },
        _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'h2',
            null,
            'Comics'
          ),
          _react2.default.createElement('hr', null),
          _react2.default.createElement(
            'h4',
            null,
            'Character: ',
            this.store.selectedCharacter.name
          ),
          charImage,
          _react2.default.createElement(
            'ul',
            { className: 'ma-card-container' },
            comics.map(function (comic) {
              var onsaleDate = (0, _moment2.default)(comic.dates.find(function (d) {
                return d.type == 'onsaleDate';
              }).date);

              return _react2.default.createElement(
                'li',
                { key: comic.id, className: 'ma-card' },
                _react2.default.createElement(
                  'h5',
                  null,
                  comic.title
                ),
                _react2.default.createElement(
                  'div',
                  { className: 'ma-text-center' },
                  _react2.default.createElement(_LazyImage2.default, { src: comic.thumbnail.path + '.' + comic.thumbnail.extension, alt: 'Comic thumbnail' })
                ),
                _react2.default.createElement(
                  'div',
                  null,
                  'Released date: ',
                  _react2.default.createElement(
                    'small',
                    null,
                    onsaleDate.isValid() ? onsaleDate.format('DD/MM/YYYY') : '-'
                  )
                ),
                _react2.default.createElement(
                  'p',
                  { className: 'container' },
                  _react2.default.createElement(
                    'strong',
                    null,
                    'Description:'
                  ),
                  ' ',
                  _react2.default.createElement(
                    'span',
                    null,
                    comic.description || '-'
                  )
                )
              );
            }),
            !hasData ? defaultNoComicsMessage : null
          ),
          _react2.default.createElement(
            'div',
            { className: 'ma-text-center' },
            loadingMessage
          ),
          _react2.default.createElement(
            'footer',
            { className: 'ma-app-footer' },
            'Loaded ',
            this.store.comicsList.length,
            ' from ',
            this.store.comicPaginateConfig.total,
            ' (',
            percent || 0,
            '%)'
          )
        )
      );
    }
  }]);

  return ComicsPage;
}(_react2.default.Component)) || _class;

exports.default = ComicsPage;

/***/ }),

/***/ 240:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 47:
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(48),
    now = __webpack_require__(210),
    toNumber = __webpack_require__(212);

/** Error message constants. */
var FUNC_ERROR_TEXT = 'Expected a function';

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max,
    nativeMin = Math.min;

/**
 * Creates a debounced function that delays invoking `func` until after `wait`
 * milliseconds have elapsed since the last time the debounced function was
 * invoked. The debounced function comes with a `cancel` method to cancel
 * delayed `func` invocations and a `flush` method to immediately invoke them.
 * Provide `options` to indicate whether `func` should be invoked on the
 * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
 * with the last arguments provided to the debounced function. Subsequent
 * calls to the debounced function return the result of the last `func`
 * invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is
 * invoked on the trailing edge of the timeout only if the debounced function
 * is invoked more than once during the `wait` timeout.
 *
 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `_.debounce` and `_.throttle`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to debounce.
 * @param {number} [wait=0] The number of milliseconds to delay.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=false]
 *  Specify invoking on the leading edge of the timeout.
 * @param {number} [options.maxWait]
 *  The maximum time `func` is allowed to be delayed before it's invoked.
 * @param {boolean} [options.trailing=true]
 *  Specify invoking on the trailing edge of the timeout.
 * @returns {Function} Returns the new debounced function.
 * @example
 *
 * // Avoid costly calculations while the window size is in flux.
 * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
 *
 * // Invoke `sendMail` when clicked, debouncing subsequent calls.
 * jQuery(element).on('click', _.debounce(sendMail, 300, {
 *   'leading': true,
 *   'trailing': false
 * }));
 *
 * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
 * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
 * var source = new EventSource('/stream');
 * jQuery(source).on('message', debounced);
 *
 * // Cancel the trailing debounced invocation.
 * jQuery(window).on('popstate', debounced.cancel);
 */
function debounce(func, wait, options) {
  var lastArgs,
      lastThis,
      maxWait,
      result,
      timerId,
      lastCallTime,
      lastInvokeTime = 0,
      leading = false,
      maxing = false,
      trailing = true;

  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  wait = toNumber(wait) || 0;
  if (isObject(options)) {
    leading = !!options.leading;
    maxing = 'maxWait' in options;
    maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }

  function invokeFunc(time) {
    var args = lastArgs,
        thisArg = lastThis;

    lastArgs = lastThis = undefined;
    lastInvokeTime = time;
    result = func.apply(thisArg, args);
    return result;
  }

  function leadingEdge(time) {
    // Reset any `maxWait` timer.
    lastInvokeTime = time;
    // Start the timer for the trailing edge.
    timerId = setTimeout(timerExpired, wait);
    // Invoke the leading edge.
    return leading ? invokeFunc(time) : result;
  }

  function remainingWait(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime,
        timeWaiting = wait - timeSinceLastCall;

    return maxing
      ? nativeMin(timeWaiting, maxWait - timeSinceLastInvoke)
      : timeWaiting;
  }

  function shouldInvoke(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime;

    // Either this is the first call, activity has stopped and we're at the
    // trailing edge, the system time has gone backwards and we're treating
    // it as the trailing edge, or we've hit the `maxWait` limit.
    return (lastCallTime === undefined || (timeSinceLastCall >= wait) ||
      (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait));
  }

  function timerExpired() {
    var time = now();
    if (shouldInvoke(time)) {
      return trailingEdge(time);
    }
    // Restart the timer.
    timerId = setTimeout(timerExpired, remainingWait(time));
  }

  function trailingEdge(time) {
    timerId = undefined;

    // Only invoke if we have `lastArgs` which means `func` has been
    // debounced at least once.
    if (trailing && lastArgs) {
      return invokeFunc(time);
    }
    lastArgs = lastThis = undefined;
    return result;
  }

  function cancel() {
    if (timerId !== undefined) {
      clearTimeout(timerId);
    }
    lastInvokeTime = 0;
    lastArgs = lastCallTime = lastThis = timerId = undefined;
  }

  function flush() {
    return timerId === undefined ? result : trailingEdge(now());
  }

  function debounced() {
    var time = now(),
        isInvoking = shouldInvoke(time);

    lastArgs = arguments;
    lastThis = this;
    lastCallTime = time;

    if (isInvoking) {
      if (timerId === undefined) {
        return leadingEdge(lastCallTime);
      }
      if (maxing) {
        // Handle invocations in a tight loop.
        timerId = setTimeout(timerExpired, wait);
        return invokeFunc(lastCallTime);
      }
    }
    if (timerId === undefined) {
      timerId = setTimeout(timerExpired, wait);
    }
    return result;
  }
  debounced.cancel = cancel;
  debounced.flush = flush;
  return debounced;
}

module.exports = debounce;


/***/ }),

/***/ 48:
/***/ (function(module, exports) {

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}

module.exports = isObject;


/***/ }),

/***/ 49:
/***/ (function(module, exports, __webpack_require__) {

var freeGlobal = __webpack_require__(211);

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

module.exports = root;


/***/ }),

/***/ 50:
/***/ (function(module, exports, __webpack_require__) {

var root = __webpack_require__(49);

/** Built-in value references. */
var Symbol = root.Symbol;

module.exports = Symbol;


/***/ }),

/***/ 51:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _desc, _value, _class, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8;

var _mobx = __webpack_require__(16);

var _ComicsService = __webpack_require__(218);

var _ComicsService2 = _interopRequireDefault(_ComicsService);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _initDefineProp(target, property, descriptor, context) {
  if (!descriptor) return;
  Object.defineProperty(target, property, {
    enumerable: descriptor.enumerable,
    configurable: descriptor.configurable,
    writable: descriptor.writable,
    value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
  });
}

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

function _initializerWarningHelper(descriptor, context) {
  throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
}

(0, _mobx.useStrict)(true);

/* eslint-disable no-undef */
var ComicsState = (_class = function () {
  function ComicsState() {
    _classCallCheck(this, ComicsState);

    _initDefineProp(this, 'searchName', _descriptor, this);

    _initDefineProp(this, 'selectedCharacter', _descriptor2, this);

    _initDefineProp(this, 'charactersList', _descriptor3, this);

    _initDefineProp(this, 'comicsList', _descriptor4, this);

    _initDefineProp(this, 'isLoadingComics', _descriptor5, this);

    _initDefineProp(this, 'isLoadingCharacters', _descriptor6, this);

    _initDefineProp(this, 'characterPaginateConfig', _descriptor7, this);

    _initDefineProp(this, 'comicPaginateConfig', _descriptor8, this);
  }

  _createClass(ComicsState, [{
    key: 'loadComics',
    value: function loadComics() {
      var _this = this;

      var append = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

      var DEFAULT_OFFSET = 20;
      this.isLoadingComics = true;

      var limit = this.comicPaginateConfig.limit;
      var offset = this.comicPaginateConfig.offset;
      var shouldLoad = true;

      if (append) {
        limit = this.comicPaginateConfig.limit;
        offset = this.comicPaginateConfig.count + this.comicPaginateConfig.offset + 1;

        if (offset < DEFAULT_OFFSET || this.comicPaginateConfig.count == 0) {
          shouldLoad = false;
          this.isLoadingComics = false;
        }
      }

      if (shouldLoad) {
        _ComicsService2.default.loadComics(this.selectedCharacter.id, limit, offset).then(function (res) {
          (0, _mobx.runInAction)('Loading comics', function () {
            _this.isLoadingComics = false;
            if (append) {
              res.data.data.results.forEach(function (comic) {
                return _this.comicsList.push(comic);
              });
            } else {
              _this.comicsList = res.data.data.results;
            }
            _this.comicPaginateConfig = {
              offset: res.data.data.offset > 0 ? res.data.data.offset - 1 : 0,
              limit: res.data.data.limit,
              total: res.data.data.total,
              count: res.data.data.count
            };
          });
        }).catch(function (err) {
          (0, _mobx.runInAction)('Loading comics', function () {
            _this.isLoadingComics = false;
          });
          console.error('An error ocurred when loading data: ', err);
        });
      }
    }
  }, {
    key: 'loadCharacters',
    value: function loadCharacters() {
      var _this2 = this;

      var append = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

      var DEFAULT_OFFSET = 20;
      this.isLoadingCharacters = true;

      var limit = this.characterPaginateConfig.limit;
      var offset = this.characterPaginateConfig.offset;
      var shouldLoad = true;

      if (append) {
        limit = this.characterPaginateConfig.limit;
        offset = this.characterPaginateConfig.count + this.characterPaginateConfig.offset + 1;

        if (offset < DEFAULT_OFFSET || this.characterPaginateConfig.count == 0) {
          shouldLoad = false;
          this.isLoadingCharacters = false;
        }
      }

      if (shouldLoad) {
        _ComicsService2.default.loadCharacters(this.searchName, limit, offset).then(function (res) {
          (0, _mobx.runInAction)('Loading characters', function () {
            _this2.isLoadingCharacters = false;
            if (append) {
              res.data.data.results.forEach(function (char) {
                return _this2.charactersList.push(char);
              });
            } else {
              _this2.charactersList = res.data.data.results;
            }
            _this2.characterPaginateConfig = {
              offset: res.data.data.offset > 0 ? res.data.data.offset - 1 : 0,
              limit: res.data.data.limit,
              total: res.data.data.total,
              count: res.data.data.count
            };
          });
        }).catch(function (err) {
          (0, _mobx.runInAction)('Loading characters', function () {
            _this2.isLoadingCharacters = false;
          });
          console.error('An error ocurred when loading data: ', err);
        });
      }
    }
  }, {
    key: 'selectCharacter',
    value: function selectCharacter(characterId) {
      this.selectedCharacter = this.charactersList.find(function (c) {
        return c.id == characterId;
      });
      this._resetPagination();
    }
  }, {
    key: 'changeCharacterSearchName',
    value: function changeCharacterSearchName(characterName) {
      this.searchName = characterName;
    }
  }, {
    key: '_resetPagination',
    value: function _resetPagination() {
      this.characterPaginateConfig = {
        offset: 0,
        limit: 40,
        total: 999,
        count: 0
      };
    }
  }]);

  return ComicsState;
}(), (_descriptor = _applyDecoratedDescriptor(_class.prototype, 'searchName', [_mobx.observable], {
  enumerable: true,
  initializer: function initializer() {
    return '';
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, 'selectedCharacter', [_mobx.observable], {
  enumerable: true,
  initializer: function initializer() {
    return {
      id: 1009368,
      name: 'Iron Man'
    };
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, 'charactersList', [_mobx.observable], {
  enumerable: true,
  initializer: function initializer() {
    return [];
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class.prototype, 'comicsList', [_mobx.observable], {
  enumerable: true,
  initializer: function initializer() {
    return [];
  }
}), _descriptor5 = _applyDecoratedDescriptor(_class.prototype, 'isLoadingComics', [_mobx.observable], {
  enumerable: true,
  initializer: function initializer() {
    return false;
  }
}), _descriptor6 = _applyDecoratedDescriptor(_class.prototype, 'isLoadingCharacters', [_mobx.observable], {
  enumerable: true,
  initializer: function initializer() {
    return false;
  }
}), _descriptor7 = _applyDecoratedDescriptor(_class.prototype, 'characterPaginateConfig', [_mobx.observable], {
  enumerable: true,
  initializer: function initializer() {
    return {
      offset: 0,
      limit: 40,
      total: 999,
      count: 0
    };
  }
}), _descriptor8 = _applyDecoratedDescriptor(_class.prototype, 'comicPaginateConfig', [_mobx.observable], {
  enumerable: true,
  initializer: function initializer() {
    return {
      offset: 0,
      limit: 40,
      total: 999,
      count: 0
    };
  }
}), _applyDecoratedDescriptor(_class.prototype, 'loadComics', [_mobx.action], Object.getOwnPropertyDescriptor(_class.prototype, 'loadComics'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'loadCharacters', [_mobx.action], Object.getOwnPropertyDescriptor(_class.prototype, 'loadCharacters'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'selectCharacter', [_mobx.action], Object.getOwnPropertyDescriptor(_class.prototype, 'selectCharacter'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'changeCharacterSearchName', [_mobx.action], Object.getOwnPropertyDescriptor(_class.prototype, 'changeCharacterSearchName'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, '_resetPagination', [_mobx.action], Object.getOwnPropertyDescriptor(_class.prototype, '_resetPagination'), _class.prototype)), _class);
exports.default = new ComicsState();

/***/ }),

/***/ 58:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(2);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(19);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _debounce2 = __webpack_require__(47);

var _debounce3 = _interopRequireDefault(_debounce2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/* eslint-disable no-undef */
/* eslint-disable react/no-find-dom-node */
var LazyImage = function (_React$Component) {
  _inherits(LazyImage, _React$Component);

  function LazyImage(props) {
    _classCallCheck(this, LazyImage);

    var _this = _possibleConstructorReturn(this, (LazyImage.__proto__ || Object.getPrototypeOf(LazyImage)).call(this, props));

    _this.state = {
      shouldShow: false
    };

    _this.isVisible = _this.isVisible.bind(_this);
    _this.checkIsVisible = (0, _debounce3.default)(function () {
      return _this.isVisible(_reactDom2.default.findDOMNode(_this));
    }, 600);
    return _this;
  }

  _createClass(LazyImage, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      window.addEventListener('scroll', this.checkIsVisible);
      window.addEventListener('resize', this.checkIsVisible);
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.isVisible(_reactDom2.default.findDOMNode(this));
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      window.removeEventListener('scroll', this.checkIsVisible);
      window.removeEventListener('resize', this.checkIsVisible);
    }
  }, {
    key: 'isVisible',
    value: function isVisible(nodeElement) {
      if (nodeElement != null) {
        var measures = nodeElement.getBoundingClientRect();

        if (!this.state.shouldShow) {
          this.setState({
            shouldShow: measures.x + measures.width < window.innerWidth && measures.y < window.innerHeight
          });
        }
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var element = this.state.shouldShow ? _react2.default.createElement('img', {
        className: this.props.className,
        ref: this.isVisible,
        src: this.props.src,
        alt: this.props.alt,
        onClick: this.props.onClick
      }) : _react2.default.createElement('i', { className: 'fa fa-file-image-o fa-fw fa-4x' });

      return element;
    }
  }]);

  return LazyImage;
}(_react2.default.Component);

exports.default = LazyImage;

/***/ }),

/***/ 59:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(2);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(6);

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/* eslint-disable no-undef */
var Scrollable = function (_React$Component) {
  _inherits(Scrollable, _React$Component);

  function Scrollable(props) {
    _classCallCheck(this, Scrollable);

    var _this = _possibleConstructorReturn(this, (Scrollable.__proto__ || Object.getPrototypeOf(Scrollable)).call(this, props));

    _this._handleScroll = _this._handleScroll.bind(_this);
    return _this;
  }

  _createClass(Scrollable, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      window.addEventListener('scroll', this._handleScroll, true);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      window.removeEventListener('scroll', this._handleScroll);
    }
  }, {
    key: '_handleScroll',
    value: function _handleScroll(e) {
      e.preventDefault();
      var documentHeight = document.documentElement.offsetHeight;
      var windowHeight = window.innerHeight;
      var windowScroll = window.scrollY;
      var totalScroll = windowScroll + windowHeight;

      //when 20% near to bottom, loads more data
      if (totalScroll > documentHeight - documentHeight * 0.2 && this.props.check) {
        this.props.callback();
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return this.props.children;
    }
  }]);

  return Scrollable;
}(_react2.default.Component);

Scrollable.propTypes = {
  check: _propTypes2.default.bool,
  callback: _propTypes2.default.func.isRequired,
  children: _propTypes2.default.element.isRequired
};

exports.default = Scrollable;

/***/ })

},[186]);