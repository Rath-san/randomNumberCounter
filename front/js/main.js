class App {
    init() {
        
        const rankingService = new RankingService(10000);

        const ranking = new RankingComponent('#numbers-ranking',rankingService);
        const random = new RandomComponent('#numbers-random', rankingService);

        random.init();
        ranking.init();
    }
}

const app = new App();
app.init();
