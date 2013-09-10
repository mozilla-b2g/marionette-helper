var Marionette = require('marionette-client');


/**
 * @param {Marionette.Client} client Marionette client to use.
 * @constructor
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
   * ~*~*~*~*~ o_O Deprecated o_O ~*~*~*~*~
   * Use client#waitFor instead!
   *
   * @param {Function} test some function that returns a boolean.
   * @param {Function} callback function to invoke when test pass or timeout.
   * @param {Object} opt_context Optional context object for test block.
   * @param {number} opt_interval Optional test frequency in millis.
   * @param {number} opt_timeout Optional test timeout in millis.
   */
  waitFor: function(test, callback, opt_context, opt_interval, opt_timeout) {
    this.client.waitFor(test, {
      interval: opt_interval,
      timeout: opt_timeout
    }, callback);
  },


  /**
   * Find some element and wait for it to be displayed.
   * @param {Marionette.Element|string} el element or some css selector.
   * @return {Marionette.Element} Element we find with css selector.
   */
  waitForElement: function(el) {
    var client = this.client;

    while (!isElement(el)) {
      el = client.findElement(el);
    }

    client.waitFor(function() { return el.displayed(); });
    return el;
  }
};


/**
 * @param {Object} maybeElement something that could or could not be an el.
 * @return {boolean} Whether or not we have an element.
 * @private
 */
function isElement(maybeElement) {
  return maybeElement && (maybeElement instanceof Marionette.Element ||
                         (!!maybeElement.id && !!maybeElement.client));
}
