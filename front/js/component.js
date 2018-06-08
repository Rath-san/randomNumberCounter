class Component {
  constructor(
    selector
  ) {
    this.selector = selector;
  }

  init() {
    console.log("Component: " + this.selector + " initialized");
  }

  getDOMElement() {
    return document.querySelector(this.selector);
  }

  render() {
    console.log("Component: " + this.selector + " rendered");
  }
}