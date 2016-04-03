import React from 'react';
import { Link } from 'react-router';
import Record from './record';

class StandingsPerOpponentTable extends React.Component {

	constructor(props) {
	  super(props);
	  this.state = {};
	}

	render() {
		let data = this.props.data;

		if (!data || !data.records) {
			return <div><p>loading...</p></div>;
		}

		if (data.records.length < 1) {
			return (
				<div>
					<h2>No per-opponent standings to display</h2>
					<p>You know nothing, {this.props.params.name}. Play the game of thr--- uhh, table hockey, then <Link to="/matches/add">add some results</Link>.</p>
				</div>
			);
		}

		return (
			<div>
				<table summary="Wins, losses, and other overall summary data related to player vs player matches">
					<caption>Per Opponent Standings</caption>
					<thead>
						<tr>
							<th>Opponent</th>
							<th>GP</th>
							<th>Wins</th>
							<th>Losses</th>
							<th className='detailed-info'>Win %</th>
							<th className='detailed-info'>GFPG</th>
							<th className='detailed-info'>GAPG</th>
							<th className='detailed-info'>Diff</th>
						</tr>
					</thead>
					<tbody>
					{
						data.records.map((record, index) => {
							return <Record key={index} data={record} />;
						})
					}
					</tbody>
				</table>
			</div>
		);
	}
}

export default StandingsPerOpponentTable;
