function Random(selector) {
  Component.call(this, selector);
  this.randomNumbers = [];
};

Random.prototype = Object.create(Component.prototype);
Random.constructor = Random;

Random.prototype.init = function (rankingComponent) {
  this.rankingComponent = rankingComponent;
  this.getData();
};

Random.prototype.getData = function() {
  const self = this;
  /* fetch random numbersfrom endpoint, after succesfull fetch repeat process*/
  axios.get('http://localhost:3000/random-numbers')
    .then(function (response) {
      self.randomNumbers = response.data.data.map(function (number) {
        return {
          id: number
        }
      });
      self.update();
      self.rankingComponent.update(self.randomNumbers);

    }).then(() => new Promise(resolve => setTimeout(function () {
      self.getData();
    }, 1000)))
    .catch(function (error) {
      console.error(error);
    });
};

Random.prototype.update = function() {
  /* clear and render component */
  this.clear();
  this.render();
};

Random.prototype.clear = function () {
  /* clear component markup */
  const container = this.getDOMElement();
  container.innerHTML = '';
};

Random.prototype.render = function () {
  const container = this.getDOMElement();

  this.randomNumbers.forEach(function (number) {
    const listElement = document.createElement('li');
    listElement.classList.add('list-group-item');
    listElement.innerHTML = number.id;

    container.appendChild(listElement);
  });
};

