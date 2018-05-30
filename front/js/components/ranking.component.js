function Ranking(selector) {
  Component.call(this, selector);
  this.numbers = [];
  this.iteration = 0;
}

Ranking.prototype = Object.create(Component.prototype);
Ranking.constructor = Ranking;

Ranking.prototype.init = function () {
  const self = this;
  axios.get('http://localhost:3000/numbers')
    .then(function (response) {
      self.numbers = response.data.data.map(function (number) {
        return {
          id: number,
          showedTimes: 0
        }
      });
      self.render();
    })
    .catch(function (error) {
      console.error(error);
    });
};

Ranking.prototype.render = function () {
  const container = this.getDOMElement();

  this.numbers.forEach(function (number) {
    const listElement = document.createElement('li');
    const smallElement = document.createElement('small');

    smallElement.classList.add('badge', 'badge-primary')
    listElement.classList.add('list-group-item');

    listElement.innerHTML = number.id;
    smallElement.innerHTML = number.showedTimes

    const style = {
      'display': 'flex',
      'justify-content': 'space-between',
      'align-items': 'center'
    };

    Object.assign(listElement.style, style);

    listElement.appendChild(smallElement);
    container.appendChild(listElement);
  });
};

Ranking.prototype.updateRandomFetchCounter = function () {
  /* renders iteration in DOM */
  const fetchCounter = document.querySelector('#iteration-counter');
  fetchCounter.innerHTML = this.iteration;
};

Ranking.prototype.sortNumbers = function () {
  /* Sorting this.numbers by this.numbers[n].showedTimes */
  this.numbers.sort(function (a, b) {
    return a.showedTimes < b.showedTimes
  });
};

Ranking.prototype.clear = function () {
  /* clearing component html */
  const container = this.getDOMElement();
  container.innerHTML = '';
};

Ranking.prototype.update = function (randomNumbers) {
  /* update component data every timerandom number is fetched by RanfomNumberComponent */
  const self = this
  this.iteration++;
  randomNumbers.forEach(function (randomNumber) {
    self.numbers.filter(function (rankingNumber) {
      if (rankingNumber.id === randomNumber.id) {
        rankingNumber.showedTimes++;
      }
    });
  });
  this.sortNumbers();
  this.updateRandomFetchCounter();
  this.clear();
  this.render();
};
