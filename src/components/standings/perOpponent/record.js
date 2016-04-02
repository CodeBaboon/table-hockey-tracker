import React from 'react';

class Record extends React.Component {
	render() {
		const data = this.props.data,
				wins = data.total_wins,
				losses = data.total_losses,
				games_played = +data.total_wins + +data.total_losses;

		return (
			<tr>
				<td>{data.opponent}</td>
				<td>{games_played}</td>
				<td>{wins}</td>
				<td>{losses}</td>
			</tr>
		);
	}
}

export default Record;
