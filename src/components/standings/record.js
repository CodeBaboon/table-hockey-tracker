import React from 'react';

class Record extends React.Component {
	render() {
		return (
			<tr>
				<td>{this.props.data.player}</td>
				<td>{this.props.data.games_played}</td>
				<td>{this.props.data.wins}</td>
				<td>{this.props.data.losses}</td>
				<td className='detailed-info'>{this.props.data.win_percentage}</td>
				<td className='detailed-info'>{this.props.data.total_goals_for}</td>
				<td className='detailed-info'>{this.props.data.total_goals_against}</td>
				<td className='detailed-info'>{this.props.data.total_goals_diff}</td>
			</tr>
		);
	}
}

export default Record;
