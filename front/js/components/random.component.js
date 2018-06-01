function Random(selector, interval) {
  Component.call(this, selector);
  this.randomNumbers = [];
  this.interval = interval;
};

Random.prototype = Object.create(Component.prototype);
Random.constructor = Random;

Random.prototype.init = function () {
  this.getData();
};

Random.prototype.getData = function () {
  /* fetch random numbersfrom endpoint every this.interval(ms), after succesfull fetch repeat process*/
  const self = this;
  axios.get('http://localhost:3000/random-numbers')
    .then(function (response) {
      self.randomNumbers = response.data.data.map(function (number) {
        return {
          id: number
        }
      });
      self.update();
      ranking.update(self.randomNumbers);
    }).then(() => new Promise(resolve => setTimeout(function () {
      self.getData();
    }, self.interval)))
    .catch(function (error) {
      console.error(error);
    });
};

Random.prototype.update = function () {
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
  this.fetchTimer();
};

Random.prototype.fetchTimer = function () {
  const info = document.querySelector('#fetch-timer');
  let time = this.interval / 1000;

  const printTime = function () {
    if (time <= 0) return;
    info.innerHTML = time;
    setTimeout(() => {
      printTime();
    }, 1000);

    time--;
  }

  printTime();
}
