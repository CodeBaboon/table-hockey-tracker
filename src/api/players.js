class Players {
	static *list(next) {
		if ('GET' != this.method) return yield next;

		const query = `SELECT players.name as name
						, players.is_active as is_active
						FROM players
					   	ORDER BY players.name`;
		const result = yield this.pg.db.client.query_(query);

		this.body = {
			records: result.rows
		};
	}
}

export default Players;
