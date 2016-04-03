import React from 'react';
import { Link } from 'react-router';

class Navigation extends React.Component {

	constructor(props) {
		super(props);
		this.state = { data: null };
	}

	render() {
		const itemClassName = this.props.selected ? 'selected' : '';

		return (
			<li className={itemClassName}><Link className='nav-link' to={this.props.to}>{this.props.title}</Link></li>
    	);
	}
}

export default Navigation;
