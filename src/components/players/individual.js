import React from 'react';
import Navigation from '../navigation/index';
import StandingsPerOpponent from '../standings/perOpponent/index';
import MatchesTable from '../matches/table';
import request from 'superagent';
import { promisify } from '../../lib/promisify';

class Player extends React.Component
{
	constructor(props) {
		super(props);
		this.state = { matches: null };
	}

	componentWillMount() {
		const self = this;
		const limit = 5;
		const url = `/api/players/${this.props.params.name}/matches/${limit}`;

		console.log('getting url ', url);

		request.get(url)
				.use(promisify)
				.promise()
				.then(function(response) {
					self.setState({ matches: response.body });
				});
	}

	render() {
		const name = this.props.params.name;
		const title = `${name}'s Page`;
		const matchesCaption = `${name}'s Recent Match Results`;
		const matchesSummary = `Most recent match results for ${name}`;

		return (
			<div>
				<header>
					<Navigation {...this.props} selectedItem="Players" />
				</header>
				<main>
					<h1>{title}</h1>
					<StandingsPerOpponent {...this.props} />
					<MatchesTable data={this.state.matches} caption={matchesCaption} summary={matchesSummary} />
				</main>
			</div>
		);
	}
}

export default Player;
