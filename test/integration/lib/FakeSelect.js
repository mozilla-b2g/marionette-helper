/* global module */

'use strict';

function FakeSelect(client, origin) {
  this.client = client;
  this.origin = origin;
}

module.exports = FakeSelect;

FakeSelect.Selector = Object.freeze({
  selectElement: '#select',
  selectedOptionElement: '#select option:checked'
});

FakeSelect.prototype = {
  client: null,
  get selectElement() {
    return this.client.findElement(FakeSelect.Selector.selectElement);
  },
  get selectedOption() {
    return this.client.findElement(FakeSelect.Selector.selectedOptionElement);
  },
  isOptionSelected: function(value) {
    console.log(this.selectedOption);
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
