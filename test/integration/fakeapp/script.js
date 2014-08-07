(function() {
  'use strict';

  var select = document.getElementById('select');
  var emitted = document.getElementById('emitted');

  var events = ['change', 'blur'];
  events.forEach(function(evtName) {
    select.addEventListener(evtName, showEvent);
  });

  function showEvent(evt) {
    emitted.textContent += evt.type;
  }

})();
