import Mustache from "mustache";

/**
 * Base class for all views.
 */
export default class View {
  constructor() {
    this.data = {};

    this.addListeners();
  }

  addListeners() {
  }

  appendTo(parentSelector) {
    document.querySelector(parentSelector).innerHTML += this.render();
    return this;
  }

  removeData(key) {
    delete this.data[key];
    return this;
  }

  render() {
    const template = document.querySelector(this.templateSelector).innerHTML;
    return Mustache.render(template, this.data);
  }

  setData(key, value) {
    this.data[key] = value;
    return this;
  }
}