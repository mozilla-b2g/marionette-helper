suite.skip('MarionetteHelper.waitForAlert', function() {
  var subject;

  var client = createClient();
  marionette.plugin('helper', require('../../index'));

  setup(function(done) {
    subject = client.helper;
    client.setSearchTimeout(10000);
    setTimeout(done, 2500);  // Instead of using the BootWatcher.
  });

  suite.skip('#waitForAlert', function() {
    setup(function() {
      console.log('Will alert!');
      client.executeScript(function() {
        alert('lololololololol');
      });
    });

    test('should wait for substring sync', function() {
      subject.waitForAlert('lol');
    });

    test('should wait for substring async', function(done) {
      subject.waitForAlert('lol', done);
    });

    test('should wait for RegExp sync', function() {
      subject.waitForAlert(/(lo)*l/);
    });

    test('should wait for RegExp async', function(done) {
      subject.waitForAlert(/(lo)*l/, done);
    });
  });

});
