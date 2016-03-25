import React from 'react';

class Record extends React.Component {
	render() {

		const gfpg = this.props.data.total_goals_for / this.props.data.games_played;
		const gapg = this.props.data.total_goals_against / this.props.data.games_played;

		return (
			<tr>
				<td>{this.props.data.player}</td>
				<td>{this.props.data.games_played}</td>
				<td>{this.props.data.wins}</td>
				<td>{this.props.data.losses}</td>
				<td className='detailed-info'>{this.props.data.win_percentage}</td>
				<td className='detailed-info'>{gfpg.toFixed(2)}</td>
				<td className='detailed-info'>{gapg.toFixed(2)}</td>
				<td className='detailed-info'>{this.props.data.total_goals_diff}</td>
			</tr>
		);
	}
}

export default Record;
