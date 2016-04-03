import React from 'react';
import Navigation from './navigation/index';
import Standings from './standings/index';
import Awards from './awards/index';

class Home extends React.Component {

	render() {
		return (
			<div>
				<header>
					<Navigation {...this.props} selectedItem="Home" />
				</header>
				<main>
					<Standings {...this.props} />
                    <Awards {...this.props} />
				</main>
			</div>
    	);
	}
}

export default Home;
