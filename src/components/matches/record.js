import React from 'react';
import moment from 'moment';

class Record extends React.Component {
	render() {
		const home_score = `(${this.props.data.home_score})`;
		const away_score = `(${this.props.data.away_score})`;
		const overtime = this.props.data.overtime ? `Yes` : ``;
		const played_on = moment(this.props.data.played_on).format('YYYY-MM-DD');

		let homeClass, awayClass;

		if (this.props.data.home_score > this.props.data.away_score) {
			homeClass = 'winner';
			awayClass = 'loser';
		} else {
			homeClass = 'loser';
			awayClass = 'winner';
		}

		return (
			<tr>
				<td>{this.props.data.id}</td>
				<td>{played_on}</td>
				<td>
					<span>{this.props.data.home_player}</span>
					<span className={homeClass}>
						{home_score}
					</span>
				</td>
				<td>
					<span>{this.props.data.away_player}</span>
					<span className={awayClass}>
						{away_score}
					</span>
				</td>
				<td>{overtime}</td>
			</tr>
		);
	}
}

export default Record;
