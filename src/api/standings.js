function _getData() {
	return {
		records: [
		{
			player: 'Jeff',
			wins: 0,
			losses: 0
		},
		{
			player: 'Joel',
			wins: 0,
			losses: 0
		},
		{
			player: 'Bob',
			wins: 0,
			losses: 0
		},
		{
			player: 'Christian',
			wins: 0,
			losses: 0
		},
		{
			player: 'Adam',
			wins: 0,
			losses: 0
		},
		{
			player: 'Dave',
			wins: 0,
			losses: 0
		}]
	};
}

class Standings {
	static *list() {
		yield this.body = _getData();
	}
}

export default Standings;
