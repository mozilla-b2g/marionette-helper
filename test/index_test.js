suite('MarionetteHelper', function() {
  var subject;

  var client = createClient();
  marionette.plugin('helper', require('../index'));

  setup(function(done) {
    subject = client.helper;
    client.setSearchTimeout(10000);
    setTimeout(done, 2500);  // Instead of using the BootWatcher.
  });

  test.skip('#wait', function() {
    var before = new Date().getTime();
    subject.wait(1000);
    var after = new Date().getTime();
    assert.ok(after - before >= 1000);
  });

  test.skip('#waitFor', function(done) {
    var i = 0;
    subject.waitFor(function() {
      i++;
      return i > 4;
    }, function() {
      assert.strictEqual(i, 5);
      done();
    }, 50, 200);
  });

  test.skip('#waitForElement, element added to DOM', function() {
    var myRandomID = 'YAAAAAAYRandomWow' + Date.now();
    client.executeScript(function(myRandomID) {
      setTimeout(function() {
        var el = document.createElement('div');
        el.id = myRandomID;
        el.innerHTML = 'Hello Test!';
        document.body.appendChild(el);
      }, 500);
    }, [myRandomID]);
    subject.waitForElement('#' + myRandomID);
  });

  test.skip('#waitForElement, element displayed with CSS', function() {
    var myRandomID = 'YAAAAAAYRandomWow' + Date.now();
    client.executeScript(function(myRandomID) {
      var el = document.createElement('div');
      el.id = myRandomID;
      el.innerHTML = 'Hello Test!';
      el.style.display = 'none';
      document.body.appendChild(el);
      setTimeout(function() {
        el.style.display = 'block';
      }, 500);
    }, [myRandomID]);
    subject.waitForElement('#' + myRandomID);
  });

  test.skip('#waitForChild, element added to DOM', function() {
    var myRandomID = 'YAAAAAAYRandomWow' + Date.now();
    client.executeScript(function(myRandomID) {
      var parent = document.createElement('div');
      parent.id = 'parent';
      document.body.appendChild(parent);
      setTimeout(function() {
        var el = document.createElement('div');
        el.id = myRandomID;
        el.innerHTML = 'Hello Test!';
        parent.appendChild(el);
      }, 500);
    }, [myRandomID]);
    var parent = client.findElement('#parent');
    subject.waitForChild(parent, '#' + myRandomID);
  });

  test.skip('#waitForChild, element displayed with CSS', function() {
    var myRandomID = 'YAAAAAAYRandomWow' + Date.now();
    client.executeScript(function(myRandomID) {
      var parent = document.createElement('div');
      parent.id = 'parent';
      document.body.appendChild(parent);
      var el = document.createElement('div');
      el.id = myRandomID;
      el.innerHTML = 'Hello Test!';
      el.style.display = 'none';
      parent.appendChild(el);
      setTimeout(function() {
        el.style.display = 'block';
      }, 500);
    }, [myRandomID]);
    var parent = client.findElement('#parent');
    subject.waitForChild(parent, '#' + myRandomID);
  });

  test.skip('#waitForElementToDisappear DOM with an Element', function() {
    var myRandomID = 'YAAAAAAYRandomWow' + Date.now();
    client.executeScript(function(myRandomID) {
      var el = document.createElement('div');
      el.id = myRandomID;
      el.innerHTML = 'Hello Test!';
      document.body.appendChild(el);
      setTimeout(function() {
        document.body.removeChild(el);
      }, 500);
    }, [myRandomID]);
    var el = client.findElement('#' + myRandomID);
    subject.waitForElementToDisappear(el);
  });

  test.skip('#waitForElementToDisappear DOM with a string', function() {
    var myRandomID = 'YAAAAAAYRandomWow' + Date.now();
    client.executeScript(function(myRandomID) {
      var el = document.createElement('div');
      el.id = myRandomID;
      el.innerHTML = 'Hello Test!';
      document.body.appendChild(el);
      setTimeout(function() {
        document.body.removeChild(el);
      }, 500);
    }, [myRandomID]);
    var el = client.findElement('#' + myRandomID);
    subject.waitForElementToDisappear('#' + myRandomID);
  });

  test.skip('#waitForElementToDisappear CSS with an Element', function() {
    var myRandomID = 'YAAAAAAYRandomWow' + Date.now();
    client.executeScript(function(myRandomID) {
      var el = document.createElement('div');
      el.id = myRandomID;
      el.innerHTML = 'Hello Test!';
      document.body.appendChild(el);
      setTimeout(function() {
        el.style.display = 'none';
      }, 500);
    }, [myRandomID]);
    var el = client.findElement('#' + myRandomID);
    subject.waitForElementToDisappear(el);
  });

  test.skip('#waitForElementToDisappear DOM with a string', function() {
    var myRandomID = 'YAAAAAAYRandomWow' + Date.now();
    client.executeScript(function(myRandomID) {
      var el = document.createElement('div');
      el.id = myRandomID;
      el.innerHTML = 'Hello Test!';
      document.body.appendChild(el);
      setTimeout(function() {
        el.style.display = 'none';
      }, 500);
    }, [myRandomID]);
    var el = client.findElement('#' + myRandomID);
    subject.waitForElementToDisappear('#' + myRandomID);
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

  suite('#tapSelectOption', function() {
    test('should set selected', function() {
      var myRandomID = 'YAAAAAAYRandomWow' + Date.now();

      // inject select option first
      client.executeScript(function(myRandomID) {
        var select = document.createElement('select');
        select.id = myRandomID;
        select.style.zIndex = 99999;
        select.style.position = 'absolute';

        var option0 = document.createElement('option');
        option0.value = 0;
        option0.text = 'option0';
        option0.selected = true;

        var option1 = document.createElement('option');
        option1.value = 1;
        option1.text = 'option1';

        select.add(option0);
        select.add(option1);

        document.body.appendChild(select);
      }, [myRandomID]);

      subject.tapSelectOption('#' + myRandomID, 'option1');
      var option1 = client.findElement('option[value="1"]');
      assert.equal(option1.getAttribute('selected'), 'true');
    });

    test.skip('should not change iframe', function() {
      // TODO
    });
  });
});
