suite('MarionetteHelper', function() {
  var subject;

  var client = createClient();
  marionette.plugin('helper', require('../index'));
  marionette.plugin('apps', require('marionette-apps'));

  setup(function(done) {
    subject = client.helper;
    setTimeout(done, 2500);   // In the stead of using the BootWatcher.
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
    }, 50, 1000);
  });

  test('#waitForElement', function() {
    var CLOCK_ORIGIN = 'app://clock.gaiamobile.org';
    client.apps.launch(CLOCK_ORIGIN);
    client.apps.switchToApp(CLOCK_ORIGIN);
    subject.waitForElement('body');
    assert.ok(true);
  });
});
