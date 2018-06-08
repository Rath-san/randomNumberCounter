class RankingComponent extends Component {

  constructor(
    selector, rankingService
  ) {
    super(selector)
    this.iteration = 0;
    this.numbers = [];
    this.eventBus = rankingService.eventBus;
  }

  _getData() {
    return new Promise((resolve, reject) => {
      axios.get('http://localhost:3000/numbers')
        .then((res) => {
          this.numbers = res.data.data.map((number) => {
            return {
              id: number,
              showedTimes: 0
            }
          });
          resolve(
            'numbers fetched'
          );
        })
        .catch((error) => {
          reject(
            console.error(error)
          )
        });
    });
  }

  init() {

    this.eventBus.subscribe('hoveronnumber', (i) => {
      const container = this.getDOMElement();

      if (i) {

        const index = this.numbers.findIndex(x => {
          return i.id === x.id;
        });

        const child = container.childNodes[index]
        child.classList.add('active');

        const style = {
          'perspective-origin': `calc(${child.offsetLeft}px + ${child.clientWidth / 2}px)`
        };
        Object.assign(container.style, style);

      } else {
        container.querySelector('.active').classList.remove('active');
      }

    });

    this.eventBus.subscribe('randomFetched', (i) => {
      const randomPromise = new Promise((resolve, reject) => {
        resolve(i);
      });

      if (this.numbers.length === 0) {
        Promise.all([this._getData(), randomPromise])
          .then((x) => {
            this._update(x[1])
          });
      } else {
        randomPromise.then((x) => {
          this._update(x);
        })

      }

    });

  }

  _render() {
    const container = this.getDOMElement();
    let bgPos = 0;
    this.numbers.forEach((number) => {
      const listElement = document.createElement('li');
      const smallElement = document.createElement('small');

      smallElement.classList.add('badge', 'badge-primary')
      listElement.classList.add('list-card-item');

      listElement.innerHTML = number.id;
      smallElement.innerHTML = number.showedTimes

      const style = {
        'background-position': bgPos + 'px'
      };

      Object.assign(listElement.style, style);

      listElement.appendChild(smallElement);
      container.appendChild(listElement);

      bgPos -= 70;
    });
  }

  _clear() {
    const container = this.getDOMElement();
    container.innerHTML = '';
  }

  _update(randomNumbers) {
    this.iteration++;
    this.numbers.filter((i) => {
      if (
        randomNumbers.findIndex(x => x.id === i.id) > -1
      ) {
        i.showedTimes++
      }
    });
    this._sortNumbers();
    this._updateRandomFetchCounter();
    this._clear();
    this._render();
  }

  _sortNumbers() {
    this.numbers.sort((a, b) => a.showedTimes < b.showedTimes);
  }

  _updateRandomFetchCounter() {
    const fetchCounter = document.querySelector('#iteration-counter');
    fetchCounter.innerHTML = this.iteration;
  }

}