import streak from './Awards/streak';

function determineAwards(matchResults) {
    const awards = [];
    
    addAwards(streak, matchResults, awards);
    
    return awards;
}

function addAwards(awardFunc, dataSource, awards) {
    const newAwards = awardFunc(dataSource);
    
    if (newAwards && newAwards.length > 0) {
        awards.push.apply(awards, newAwards);
    }
}

class Awards {
	static *list(next) {
		if ('GET' != this.method) {
            return yield next;
        }

		const query = 'SELECT id, home_player, home_score, away_player, away_score, overtime, played_on, winner, loser FROM match_results_view';
		const result = yield this.pg.db.client.query_(query);
        
		this.body = {
			records: determineAwards(result.rows)
		};
	}
}

export default Awards;
