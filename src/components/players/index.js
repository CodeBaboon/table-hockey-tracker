import React from 'react';
import Navigation from '../navigation/index';
import PlayersList from './list';
import request from 'superagent';
import { promisify } from '../../lib/promisify';

class Players extends React.Component
{
	constructor(props) {
		super(props);
		this.state = { data: null };
	}

	componentWillMount() {
		const self = this;

		request.get('/api/players')
				.use(promisify)
				.promise()
				.then(function(response) {
					self.setState({ data: response.body });
				});
	}

	render() {
		return (
			<div>
				<header>
					<Navigation {...this.props} />
				</header>
				<main>
					<h1>Player List</h1>
					<PlayersList data={this.state.data} />
				</main>
			</div>
		);
	}
}

export default Players;
