class Players {
	static *list() {
		const query = `SELECT DISTINCT winner as player
						FROM match_results_view
					   	UNION
						SELECT DISTINCT loser as player
						FROM match_results_view
						ORDER BY player`;
		const result = yield this.pg.db.client.query_(query);

		this.body = {
			records: result.rows
		};
	}
}

export default Players;
