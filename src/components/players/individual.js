import React from 'react';
import Navigation from '../navigation/index';
import StandingsPerOpponent from '../standings/perOpponent/index';
import RecentMatches from './matches/recent';

class Player extends React.Component
{
	constructor(props) {
		super(props);
		this.state = { matches: null };
	}

	render() {
		const name = this.props.params.name;
		const title = `${name}'s Page`;

		return (
			<div>
				<header>
					<Navigation {...this.props} selectedItem="Players" />
				</header>
				<main>
					<h1>{title}</h1>
					<StandingsPerOpponent {...this.props} />
					<RecentMatches name={name} />
				</main>
			</div>
		);
	}
}

export default Player;
