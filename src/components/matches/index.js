import React from 'react';
import MatchesTable from './table';
import request from 'superagent';
import { promisify } from '../../lib/promisify';

class Matches extends React.Component {

	constructor(props) {
		super(props);
		this.state = { data: null };
	}

	componentWillMount() {
		const self = this;

		request.get('/api/matches')
				.use(promisify)
				.promise()
				.then(function(response) {
					self.setState({ data: response.body });
				});
	}

	render() {
		return (
			<div>
				<MatchesTable data={this.state.data} />
			</div>
		);
	}
}

export default Matches;
