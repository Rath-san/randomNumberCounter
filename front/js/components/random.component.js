class RandomComponent extends Component {
  constructor(
    selector, rankingService
  ) {
    super(selector);
    this.eventBus = rankingService.eventBus;
    this.interval = rankingService.interval;

    this.randomNumbers = [];
  }

  init() {
    this._getData();
  }

  fetchTimer() {
    const fetchTimer = document.querySelector('#fetch-timer');
    let time = this.interval / 1000;
    const printTime = function () {
      if (time <= 0) return;
      fetchTimer.innerHTML = time;
      setTimeout(() => {
        printTime();
      }, 1000);
      time--;
    };
    printTime();
  }

  _getData() {
    axios.get('http://localhost:3000/random-numbers')
      .then((res) => {
        this.randomNumbers = res.data.data.map((number) => {
          return {
            id: number
          };
        });
        this._update();
        this.eventBus.post('randomFetched', this.randomNumbers);
      }).then(() => new Promise((resolve) => setTimeout(() => {
        this._getData();
      }, this.interval)))
      .catch((error) => {
        console.error(error);
      });
  }

  _render() {
    const container = this.getDOMElement();
    let bgPos = 0;

    this.randomNumbers.forEach((number) => {
      const listElement = document.createElement('li');
      listElement.classList.add('list-card-item');
      listElement.innerHTML = number.id;

      const style = {
        'background-position': bgPos + 'px'
      };

      Object.assign(listElement.style, style);
      container.appendChild(listElement);

      listElement.addEventListener('mouseover', () => {
        this.eventBus.post('hoveronnumber', number);
      });
      listElement.addEventListener('mouseleave', () => {
        this.eventBus.post('hoveronnumber', undefined);
      });

      bgPos -= 70;
    });
    this.fetchTimer();
  }

  _clear() {
    const container = this.getDOMElement();
    container.innerHTML = '';
  }

  _update() {
    this._clear();
    this._render();
  }
}