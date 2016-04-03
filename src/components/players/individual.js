import React from 'react';
import Navigation from '../navigation/index';
import StandingsPerOpponent from '../standings/perOpponent/index';

class Player extends React.Component
{
	constructor(props) {
		super(props);
		this.state = { data: null };
	}

	render() {
		const title = `${this.props.params.name}'s Page`;
		return (
			<div>
				<header>
					<Navigation {...this.props} />
				</header>
				<main>
					<h1>{title}</h1>
					<StandingsPerOpponent {...this.props} />
				</main>
			</div>
		);
	}
}

export default Player;
