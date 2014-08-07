/* global module */

'use strict';

function FakeApp(client, origin) {
  this.client = client;
  this.origin = origin;
}

FakeApp.Selector = Object.freeze({
  selectElement: '#select',
  selectedOptionElement: '#select option:checked',
  selectEventsElement: '#select-events',
  multiElement: '#multi',
  multiOptionElements: '#multi option:checked',
  multiEventsElement: '#multi-events',
  inputElement: '#input',
  inputDateElement: '#input-date',
  inputTimeElement: '#input-time',
  inputDatetimeElement: '#input-datetime',
  inputDatetimeLocalElement: '#input-datetime-local'
});

FakeApp.prototype = {
  client: null,

  get inputElementValue() {
    return this.client.findElement(
      FakeApp.Selector['inputElement']).getAttribute('value');
  },
  get inputDateElementValue() {
    return this.client.findElement(
      FakeApp.Selector['inputDateElement']).getAttribute('value');
  },
  get inputTimeElementValue() {
    return this.client.findElement(
      FakeApp.Selector['inputTimeElement']).getAttribute('value');
  },
  get inputDatetimeElementValue() {
    return this.client.findElement(
      FakeApp.Selector['inputDatetimeElement']).getAttribute('value');
  },
  get inputDatetimeLocalElementValue() {
    return this.client.findElement(
      FakeApp.Selector['inputDatetimeLocalElement']).getAttribute('value');
  },
  get selectElement() {
    return this.client.findElement(FakeApp.Selector.selectElement);
  },
  get selectedOption() {
    return this.client.findElement(FakeApp.Selector.selectedOptionElement);
  },
  get selectEvents() {
    return this.client.findElement(FakeApp.Selector.selectEventsElement);
  },
  isSpecificSelectOptionSelected: function(value) {
    return value == this.selectedOption.text();
  },
  get multiElement() {
    return this.client.findElement(FakeApp.Selector.multiElement);
  },
  get multiOptions() {
    return this.client.findElements(FakeApp.Selector.multiOptionElements);
  },
  get multiEvents() {
    return this.client.findElement(FakeApp.Selector.multiEventsElement);
  },
  isSpecificMultiOptionSelected: function(value) {
    return this.multiOptions.some(function(option) {
      return value == option.text();
    });
  },
  didEventFire: function(element, name) {
    return this[element + 'Events'].text().indexOf(name) > -1;
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
