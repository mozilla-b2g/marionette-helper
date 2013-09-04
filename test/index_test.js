suite('MarionetteHelper', function() {
  var subject;
  var client = marionette.client();
  marionette.plugin('app', require('marionette-apps'));
  marionette.plugin('helper', require('../index'));

  setup(function() {
    subject = client.helper;
  });

  test('#wait', function() {
    var before = new Date().getTime();
    subject.wait(1000);
    var after = new Date().getTime();
    assert.ok(after - before >= 1000);
  });

  test('#waitFor', function() {
    var i = 0;
    subject.waitFor(function() {
      i++;
      return i > 4;
    }, function() {
      assert.strictEqual(i, 5);
    });
  });

  test('#waitForElement', function() {
    var CLOCK_ORIGIN = 'app://clock.gaiamobile.org';
    client.app.launch(CLOCK_ORIGIN);
    client.app.switchToApp(CLOCK_ORIGIN);
    subject.waitForElement('body');
    assert.ok(true);
  });
});
