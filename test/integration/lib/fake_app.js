/* global module */

'use strict';

function FakeApp(client, origin) {
  this.client = client;
  this.origin = origin;
}

FakeApp.Selector = Object.freeze({
  selectElement: '#select',
  selectedOptionElement: '#select option:checked',
  inputElement: '#input',
  inputdateElement: '#input-date',
  inputtimeElement: '#input-time',
  inputdatetimeElement: '#input-datetime'
});

FakeApp.prototype = {
  client: null,
  getElement: function(type) {
    return this.client.findElement(
      FakeApp.Selector['input' + type + 'Element']);
  },
  get selectElement() {
    return this.client.findElement(FakeApp.Selector.selectElement);
  },
  get selectedOption() {
    return this.client.findElement(FakeApp.Selector.selectedOptionElement);
  },
  isInputElementValueSet: function(type, value) {
    return value == this.getElement(type).getAttribute('value');
  },
  isSpecificSelectOptionSelected: function(value) {
    return value == this.selectedOption.text();
  },
  launch: function() {
    this.client.apps.launch(this.origin);
    this.client.apps.switchToApp(this.origin);
  },
  close: function() {
    this.client.apps.close(this.origin);
  }
};

module.exports = FakeApp;
