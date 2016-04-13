import React from 'react';
import request from 'superagent';
import { promisify } from '../../lib/promisify';

class RecentMatches extends React.Component {

	static propTypes = {
		name: React.PropTypes.string.isRequired
	};

	componentWillMount() {
		const self = this;
		const limit = 5;
		const url = `/api/players/${this.props.name}/matches/${limit}`;

		console.log('getting url ', url);

		request.get(url)
				.use(promisify)
				.promise()
				.then(function(response) {
					self.setState({ matches: response.body });
				});
	}

	render() {
		return (
			<div>
				<
			</div>
		);
	}
}

export default RecentMatches;
