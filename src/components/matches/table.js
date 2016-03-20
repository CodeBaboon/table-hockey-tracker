import React from 'react';
import Record from './record';

class MatchesTable extends React.Component {

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
				<table className="match-results" summary="Full list of all matches recorded to date">
					<caption>All Match Results</caption>
					<thead>
						<tr>
							<th>Id</th>
							<th>Date</th>
							<th>Home</th>
							<th>Away</th>
							<th>OT</th>
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

export default MatchesTable;
