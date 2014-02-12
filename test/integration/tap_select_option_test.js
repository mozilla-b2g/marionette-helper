suite('MarionetteHelper.tapSelectOption', function() {

  // Require needed files
  var FakeSelect = require('./lib/FakeSelect');
  marionette.plugin('helper', require('../../index'));
  marionette.plugin('apps', require('marionette-apps'));

  var helper;
  var fakeSelect;
  var FAKE_APP_ORIGIN = 'fakeselect.gaiamobile.org';

  var apps = {};
  apps[FAKE_APP_ORIGIN] = __dirname + '/fakeselect';

  var client = marionette.client({
    settings: {
      'ftu.manifestURL': null,
      'lockscreen.enabled': false
    },
    apps: apps
  });

  setup(function(done) {
    helper = client.helper;
    fakeSelect = new FakeSelect(client, 'app://' + FAKE_APP_ORIGIN);
    fakeSelect.launch();
    setTimeout(done, 2500);  // Instead of using the BootWatcher.
  });

  test('should set on option', function() {
    var optionValue = 'option2';
    helper.tapSelectOption('#select', optionValue);
    assert.ok(fakeSelect.isOptionSelected(optionValue));
  });
});
