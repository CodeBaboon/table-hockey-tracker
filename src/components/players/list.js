import React from 'react';
import { Link } from 'react-router';

class PlayersList extends React.Component {

	constructor(props) {
	  super(props);
	  this.state = {};
	}

	renderList(records, filter) {
		return (
			<ul>
			{
				records
					.filter(filter)
					.map((record, index) => {
						const playerUrl = `/players/${record.name}`;
						return <li key={index}><Link to={playerUrl}>{record.name}</Link></li>;
				})
			}
			</ul>);
	}

	render() {
		const data = this.props.data;

		if (!data || !data.records) {
			return <div><p>loading...</p></div>;
		}

		if (data.records.length < 1) {
			return (
				<div>
					<h2>No match results to display</h2>
					<p>Maybe you should <Link to="/matches/add">get playing</Link>?</p>
				</div>
			);
		}

		return (
			<div>
				<h2>Active</h2>
				{this.renderList(data.records, (player) => player.is_active)}
				<h2>Retired</h2>
				{this.renderList(data.records, (player) => !player.is_active)}
			</div>
		);
	}
}

export default PlayersList;
