import React from 'react';
import Award from './award';
import request from 'superagent';
import { promisify } from '../../lib/promisify';

class Awards extends React.Component {

	constructor(props) {
		super(props);
		this.state = { data: null };
	}

	componentWillMount() {
		const self = this;

		request.get('/api/awards')
				.use(promisify)
				.promise()
				.then(function(response) {
					self.setState({ data: response.body });
				});
	}

	render() {
        const data = this.state.data;

        if (!data || !data.records || data.records.length === 0) {
            return null;
        }
        
		return (
			<div>
                <h2>Awards</h2>
                {
                    data.records.map((record) => {
                        return <Award record={record} />
                    })
                }
			</div>
		);
	}
}

export default Awards;
