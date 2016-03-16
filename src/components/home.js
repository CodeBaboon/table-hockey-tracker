import React from 'react';
import Standings from './standings';

class Home extends React.Component {

	render() {
		return (
			<div>
				<header>
					<h1>D2L Table Hockey</h1>
				</header>
				<main>
					<Standings {...this.props} />
				</main>
			</div>
    	);
	}
}

export default Home;
