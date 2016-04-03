import React from 'react';
import { Link } from 'react-router';

class Navigation extends React.Component {

	render() {
		return (
			<div>
				<nav>
					<ul>
						<li><Link to="/"><h1>D2L Table Hockey</h1></Link></li>
						<li><Link to="/players">View player list</Link></li>
						<li><Link to="/matches">View match results</Link></li>
						<li><Link to="/matches/add">Add match result</Link></li>
					</ul>
				</nav>
			</div>
    	);
	}
}

export default Navigation;
