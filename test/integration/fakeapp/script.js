(function() {
  'use strict';

  var selects = ['select', 'multi'];
  var events = ['change', 'blur'];

  events.forEach(function(evtName) {
    selects.forEach(function(selectId) {
      document.getElementById(selectId)
              .addEventListener(evtName, showEvent.bind(null, selectId));
    });
  });

  function showEvent(selectId, evt) {
    var emitted = document.getElementById(selectId + '-events');
    emitted.textContent += evt.type;
  }

})();
