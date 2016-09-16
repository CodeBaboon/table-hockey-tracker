class Healthcheck {
	static *list(next) {
		if ('GET' != this.method) return yield next;

		console.log('db url is ', process.env.DATABASE_URL);

		this.body = {
			status: 'alive! woohoo!',
			database_url: process.env.DATABASE_URL || 'undefined'
		};
	}
}

export default Healthcheck;
