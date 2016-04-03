import React from 'react';

class Record extends React.Component {
	render() {
		const data = this.props.data;
		const gfpg = data.goals_for / data.games_played;
		const gapg = data.goals_against / data.games_played;
		const diff = +data.goals_for - +data.goals_against;
		return (
			<tr>
				<td>{data.opponent}</td>
				<td>{data.games_played}</td>
				<td>{data.total_wins}</td>
				<td>{data.total_losses}</td>
				<td className='detailed-info'>{data.win_percentage}</td>
				<td className='detailed-info'>{gfpg.toFixed(2)}</td>
				<td className='detailed-info'>{gapg.toFixed(2)}</td>
				<td className='detailed-info'>{diff}</td>
			</tr>
		);
	}
}

export default Record;
