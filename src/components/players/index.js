import React from 'react';
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
				<h1>{title}</h1>
				<StandingsPerOpponent {...this.props} />
			</div>
		);
	}
}

export default Player;
