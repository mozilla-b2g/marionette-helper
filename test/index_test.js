suite('MarionetteHelper', function() {
  var subject;

  var client = createClient();
  marionette.plugin('helper', require('../index'));

  setup(function(done) {
    subject = client.helper;
    setTimeout(done, 2500);  // In the stead of using the BootWatcher.
  });

  test('#wait', function() {
    var before = new Date().getTime();
    subject.wait(1000);
    var after = new Date().getTime();
    assert.ok(after - before >= 1000);
  });


  test('#waitFor', function(done) {
    var i = 0;
    subject.waitFor(function() {
      i++;
      return i > 4;
    }, function() {
      assert.strictEqual(i, 5);
      done();
    }, 50, 1000);
  });

  test('#waitForElement exists', function(done) {
    subject.waitForElement('#screen');
    done();
  });

  test('#waitForElement does not exist', function(done) {
    try {
      subject.waitForElement('#not-so-much-there');
    } catch (e) {
      assert.strictEqual(e.type, 'NoSuchElement');
      done();
    }
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
