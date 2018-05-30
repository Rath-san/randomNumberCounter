const ranking = new Ranking('#numbers-ranking');
const random = new Random('#numbers-random', 10000);
ranking.init();
random.init(ranking);

