class Healthcheck {
	static *list(next) {
		if ('GET' != this.method) return yield next;

		this.body = {
			status: 'alive! woohoo!'
		};
	}
}

export default Healthcheck;
