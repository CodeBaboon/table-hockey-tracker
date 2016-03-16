import React from 'react';
import Record from './record';

class StandingsTable extends React.Component {

	constructor(props) {
	  super(props);
	  this.state = {};
	}

	render() {
		let data = this.props.data;

		if (!data || !data.records) {
			return <div><p>loading...</p></div>;
		}

		return (
			<div>
				<table summary="Wins, losses, and other overall summary data related to player matches">
					<caption>Overall Standings</caption>
					<thead>
						<tr>
							<th>Player</th>
							<th>Wins</th>
							<th>Losses</th>
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

export default StandingsTable;
