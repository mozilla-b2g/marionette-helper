suite('MarionetteHelper.fillInputFieldAndtapSelectOption', function() {

  // Require needed files.
  var FakeApp = require('./lib/fake_app');
  marionette.plugin('helper', require('../../index'));
  marionette.plugin('apps', require('marionette-apps'));

  var helper;
  var fakeApp;
  var FAKE_APP_ORIGIN = 'fakeapp.gaiamobile.org';

  var apps = {};
  apps[FAKE_APP_ORIGIN] = __dirname + '/fakeapp';

  var testTime;
  var client = marionette.client({
    settings: {
      'ftu.manifestURL': null,
      'lockscreen.enabled': false
    },
    apps: apps
  });

  // We add lead zero on single digit. ex: 1 -> 01, 9 -> 09.
  function addLeadZero(num) {
    return num >= 10 ? num : ('0' + num);
  }

  setup(function(done) {
    helper = client.helper;
    fakeApp = new FakeApp(client, 'app://' + FAKE_APP_ORIGIN);
    fakeApp.launch();
    testTime = new Date();
    setTimeout(done, 2500);  // Instead of using the BootWatcher.
  });

  test('should set on option', function() {
    var optionValue = 'option2';
    helper.tapSelectOption('#select', optionValue);
    assert.ok(fakeApp.isSpecificSelectOptionSelected(optionValue));
  });

  test('should emit change and blur events for one option', function() {
    helper.tapSelectOption('#select', 'option2');
    assert.ok(fakeApp.didEventFire('select', 'change'));
    helper.tapSelectConfirm('#select');
    assert.ok(fakeApp.didEventFire('select', 'blur'));
  });

  test('should set multiple options', function() {
    var optionValues = ['multi2', 'multi3'];
    helper.tapSelectOption('#multi', optionValues[0]);
    helper.tapSelectOption('#multi', optionValues[1]);
    assert.ok(fakeApp.isSpecificMultiOptionSelected(optionValues[0]));
    assert.ok(fakeApp.isSpecificMultiOptionSelected(optionValues[1]));
  });

  test('should emit change and blur events for multiple options', function() {
    helper.tapSelectOption('#multi', 'multi2');
    assert.ok(fakeApp.didEventFire('multi', 'change'));
    helper.tapSelectOption('#multi', 'multi3');
    assert.ok(fakeApp.didEventFire('multi', 'change'));
    helper.tapSelectConfirm('#multi');
    assert.ok(fakeApp.didEventFire('multi', 'blur'));
  });

  test('should set value on input', function() {
    var inputValue = 'inputtest';
    helper.fillInputField('#input', inputValue);
    assert.equal(fakeApp.inputElementValue, inputValue);
  });

  test('should set date on input', function() {
    var inputValue =
      testTime.getFullYear() + '-' + addLeadZero(testTime.getMonth()) + '-' +
      addLeadZero(testTime.getDate());
    helper.fillInputField('#input-date', testTime);
    assert.equal(fakeApp.inputDateElementValue, inputValue);
  });

  test('should set time on input', function() {
    var inputValue = addLeadZero(testTime.getHours()) + ':' +
                     addLeadZero(testTime.getMinutes());
    helper.fillInputField('#input-time', testTime);
    assert.equal(fakeApp.inputTimeElementValue, inputValue);
  });

  test('should set datetime on input', function() {
    var inputValue = testTime.toISOString();

    helper.fillInputField('#input-datetime', testTime);
    assert.equal(fakeApp.inputDatetimeElementValue, inputValue);
  });

  test('should set datetime-local on input', function() {
    var inputValue = testTime.getFullYear() + '-' +
                     addLeadZero(testTime.getMonth()) + '-' +
                     addLeadZero(testTime.getDate()) + 'T' +
                     addLeadZero(testTime.getHours()) + ':' +
                     addLeadZero(testTime.getMinutes()) + ':' +
                     addLeadZero(testTime.getSeconds()) + '.' +
                     testTime.getMilliseconds();

    helper.fillInputField('#input-datetime-local', testTime);
    assert.equal(fakeApp.inputDatetimeLocalElementValue, inputValue);
  });
});
