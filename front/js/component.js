function Component(selector) {
  this.selector = selector;
  this.calledTimes = 0;
}

Component.prototype.init = function() {
  console.log("Component: " + this.selector + " initialized");
};

Component.prototype.getDOMElement = function() {
  return document.querySelector(this.selector);
};

Component.prototype.render = function() {
  console.log("Component: " + this.selector + " rendered");
};