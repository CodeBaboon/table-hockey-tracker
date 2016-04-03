import moment from 'moment';

function isEmptyObject(obj) {
  return !obj || !Object.keys(obj).length;
}

function isValidMatchResult(obj) {
	if (isEmptyObject(obj)) { return false; }
	return obj.hasOwnProperty('home_player') &&
			obj.hasOwnProperty('home_score') &&
			obj.hasOwnProperty('away_player') &&
			obj.hasOwnProperty('away_score');
}

function getCurrentDate() {
	return moment().format('YYYY-MM-DD');
}

class Matches {
	static *list(limit, next) {
		if ('GET' != this.method) return yield next;

		let query = `SELECT id
                            , home_player
                            , home_score
                            , away_player
                            , away_score
                            , overtime
                            , played_on
                            , winner
                            , loser
                        FROM match_results_view`;

        if (!isNaN(limit)) {
            query += ` LIMIT ${limit}`;
        }

        const result = yield this.pg.db.client.query_(query);
		this.body = {
			records: result.rows
		};
	}

	static *add(data, next) {
		if ('POST' != this.method) return yield next;

		const match = this.request.body;
		if (!isValidMatchResult(match)) {
			this.throw('Invalid request data', 400);
		} else {
            const overtime = match.overtime || false;
            const played_on = match.played_on || getCurrentDate();
			const queryCols = `INSERT INTO match_results(home_player, home_score
								, away_player, away_score, overtime, played_on)`;
			const queryVals = `VALUES('${match.home_player}', ${match.home_score}
								, '${match.away_player}', ${match.away_score}
								, '${overtime}'
								, '${played_on}')`;

			const result = yield this.pg.db.client.query_(`${queryCols} ${queryVals}`);
			if (!result) {
				this.throw('Error adding match result', 500);
			}
			this.body = 'Match result added';
		}
	}

	static *byPlayer(player, limit, next) {
		if ('GET' != this.method) return yield next;

		let query = `SELECT id
							, home_player
							, home_score
							, away_player
							, away_score
							, overtime
							, played_on
							, winner
							, loser
						FROM match_results_view
						WHERE winner = '${player}'
						   OR loser = '${player}'
						ORDER BY played_on DESC
								, id DESC`;

        if (!isNaN(limit)) {
            query += ` LIMIT ${limit}`;
        }

		const result = yield this.pg.db.client.query_(query);

		this.body = {
			records: result.rows
		};
	}
}

export default Matches;
