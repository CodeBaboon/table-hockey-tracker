import React from 'react';
import { Link } from 'react-router';
import Standings from './standings/index';

class Home extends React.Component {

	render() {
		return (
			<div>
				<header>
					<h1>D2L Table Hockey</h1>
					<nav>
						<ul>
							<li><Link to="matches">View match results</Link></li>
							<li><Link to="matches/add">Add match result</Link></li>
						</ul>
					</nav>
				</header>
				<main>
					<Standings {...this.props} />
				</main>
			</div>
    	);
	}
}

export default Home;
