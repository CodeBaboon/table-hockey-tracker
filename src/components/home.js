import React from 'react';
import Standings from './standings';

class Home extends React.Component {

	render() {
		return (
      <main>
        <h1>D2L Table Hockey</h1>
		<Standings {...this.props} />
      </main>
    );
	}
}

export default Home;
