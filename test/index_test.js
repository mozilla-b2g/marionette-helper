suite('MarionetteHelper', function() {
  Helper.client({
    plugins: {
      helper: require('../index')
    }
  });

  var subject;
  setup(function() {
    subject = this.client.helper;
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
    });
  });

  test.skip('#waitForElement', function() {
    // TODO(gaye)
  });
});
