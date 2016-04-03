import React from 'react';
import Item from './item';

class Navigation extends React.Component {

	constructor(props) {
		super(props);
		this.state = { data: null };
	}

	render() {
		return (
			<div>
				<nav>
					<input className="nav-toggle" type="checkbox" id="css-toggle-menu" name="css-toggle-menu"></input>
					<ul>
						<Item selected={this.props.selectedItem === `Home`} to="/" title="Home" />
						<Item selected={this.props.selectedItem === `Players`} to="/players" title="Players" />
						<Item selected={this.props.selectedItem === `Matches`} to="/matches" title="Matches" />
						<Item selected={this.props.selectedItem === `Add`} to="/matches/add" title="Add" />
					</ul>
					<label htmlFor="css-toggle-menu" id="css-toggle-menu"></label>
				</nav>
			</div>
    	);
	}
}

export default Navigation;
