import React from 'react';

class Record extends React.Component {
	render() {
		return (
			<tr>
				<td>{this.props.data.player}</td>
					<td>{this.props.data.wins}</td>
					<td>{this.props.data.losses}</td>
			</tr>
		);
	}
}

export default Record;
