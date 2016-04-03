import React from 'react';
import { Link } from 'react-router';

class PlayersList extends React.Component {

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
					<h2>No match results to display</h2>
					<p>Maybe you should <Link to="/matches/add">get playing</Link>?</p>
				</div>
			);
		}



		return (
			<div>
				<ul>
				{
					data.records.map((record, index) => {
						const playerUrl = `/players/${record.player}`;
						return <li key={index}><Link to={playerUrl}>{record.player}</Link></li>;
					})
				}
				</ul>
			</div>
		);
	}
}

export default PlayersList;
