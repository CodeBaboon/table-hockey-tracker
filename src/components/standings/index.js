import React from 'react';
import StandingsTable from './table';
import request from 'superagent';
import { promisify } from '../../lib/promisify';

class Standings extends React.Component {

	constructor(props) {
		super(props);
		this.state = { data: null };
	}

	componentWillMount() {
		const self = this;

		request.get('/api/standings')
				.use(promisify)
				.promise()
				.then(function(response) {
					self.setState({ data: response.body });
				});
	}

	render() {
		return (
			<div>
				<StandingsTable data={this.state.data} />
			</div>
		);
	}
}

export default Standings;
