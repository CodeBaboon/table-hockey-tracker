import React from 'react';
import { Link } from 'react-router';

class Record extends React.Component {
	render() {
		const data = this.props.data;
		const gfpg = data.total_goals_for / data.games_played;
		const gapg = data.total_goals_against / data.games_played;
		const player = data.player;
		const playerUrl = `/players/${player}`;

		return (
			<tr>
				<td><Link to={playerUrl}>{player}</Link></td>
				<td>{data.games_played}</td>
				<td>{data.wins}</td>
				<td>{data.losses}</td>
				<td className='detailed-info'>{data.win_percentage}</td>
				<td className='detailed-info'>{gfpg.toFixed(2)}</td>
				<td className='detailed-info'>{gapg.toFixed(2)}</td>
				<td className='detailed-info'>{data.total_goals_diff}</td>
			</tr>
		);
	}
}

export default Record;
