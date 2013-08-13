/**
 * @constructor
 * @param {Marionette.Client} client Marionette client to use.
 */
function MarionetteHelper(client) {
  this.client = client;
}
module.exports = MarionetteHelper;

/**
 * Make a new helper.
 * @param {Marionette.Client} client Marionette client to use.
 * @param {Object} options Optional map of attributes for Apps.
 * @return {Apps} instance.
 */
MarionetteHelper.setup = function(client, options) {
  return new MarionetteHelper(client);
};


/**
 * @const {number}
 */
MarionetteHelper.DEFAULT_TEST_INTERVAL = 100;


/**
 * @const {number}
 */
MarionetteHelper.DEFAULT_TEST_TIMEOUT = 5000;


MarionetteHelper.prototype = {
  /**
   * @type {Marionette.Client}
   */
  client: null,


  /**
   * Wait for some amount of time by blocking via a marionette call.
   * Only ever use this for debugging!
   * @param {number} millis number of seconds to sleep.
   */
  wait: function(millis) {
    this.client.executeAsyncScript(function(millis) {
      setTimeout(marionetteScriptFinished, millis);
    }, [millis]);
  },


  /**
   * Similar to Marionette.Client#waitFor except that the test gets
   * executed in node rather than gecko.
   * @param {Function} test some function that returns a boolean.
   * @param {Function} callback function to invoke when test pass or timeout.
   * @param {Object} opt_context Optional context object for test block.
   * @param {number} opt_interval Optional test frequency in millis.
   * @param {number} opt_timeout Optional test timeout in millis.
   */
  waitFor: function(test, callback, opt_context, opt_interval, opt_timeout) {
    // If context provided, bind test to context.
    if (opt_context) {
      test = test.bind(opt_context);
    }

    this._waitFor(test, callback,
        opt_interval || MarionetteHelper.DEFAULT_TEST_INTERVAL,
        opt_timeout || MarionetteHelper.DEFAULT_TEST_TIMEOUT);
  },


  /**
   * Helper method for MarionetteHelper#waitFor.
   * @param {Function} test some function that returns a boolean.
   * @param {Function} callback function to invoke when test pass or timeout.
   * @param {number} interval test frequency in millis.
   * @param {number} timeout test timeout in millis.
   */
  _waitFor: function(test, callback, interval, timeout) {
    if (timeout <= 0) {
      callback(new Error('timeout exceeded for ' + test.toString()));
      return;
    }

    if (test()) {
      callback(null);
      return;
    }

    var next = this._waitFor.bind(
        this, test, callback, timeout - interval, interval);
    setTimeout(next, interval);
  },


  /**
   * Find some element and wait for it to be displayed.
   * @param {Marionette.Element|string} el element or some css selector.
   * @return {Marionette.Element} Element we find with css selector.
   */
  waitForElement: function(el) {
    if (typeof el === 'string') {
      el = this.client.findElement(el);
    }
    this.client.waitFor(function() { return el.displayed(); });
    return el;
  }
};
