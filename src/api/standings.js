class Standings {
	static *list() {
		const query = 'SELECT player, wins, losses FROM standings_view';
		const result = yield this.pg.db.client.query_(query);
		this.body = {
			records: result.rows
		};
	}
}

export default Standings;
