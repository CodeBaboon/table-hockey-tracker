class Standings {
	static *list() {
		const query = `SELECT player
							, games_played
							, wins
							, ot_wins
							, losses
							, ot_losses
							, win_percentage
							, total_goals_for
							, total_goals_against
							, total_goals_diff
							, home_goals_for
							, home_goals_against
							, home_goals_diff
							, away_goals_for
							, away_goals_against
							, away_goals_diff
						FROM detailed_standings_view`;
		const result = yield this.pg.db.client.query_(query);
		this.body = {
			records: result.rows
		};
	}

	static *perOpponent(player) {
		const query = `SELECT player
							, opponent
							, home_wins
							, away_wins
							, home_losses
							, away_losses
							, total_wins
							, total_losses
						FROM getStandingsPerOpponent('${player}')`;
		const result = yield this.pg.db.client.query_(query);
		this.body = {
			records: result.rows
		};
	}
}

export default Standings;
