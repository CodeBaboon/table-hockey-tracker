import React from 'react';
import Forms from 'react-vui-forms';
import request from 'superagent';
import Q from 'q';
import { promisify } from '../../lib/promisify';

class AddMatchResult extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			players: [],
			home_player: null,
			home_score: null,
			away_player: null,
			away_score: null,
			overtime: null,
			played_on: null
		};
	}

	getPlayers() {
		return [
			'Christian',
			'Bob',
			'Joel',
			'Jeff',
			'Dave',
			'Adam'
		];
	}

	getInputData() {
		const self = this;
		return {
			home_player: self.state.home_player,
			home_score: self.state.home_score,
			away_player: self.state.away_player,
			away_score: self.state.away_score,
			overtime: self.state.overtime
		}
	}

	validate() {
		const self = this;

		return Q.all([self.refs.homePlayerInput.validate(),
				self.refs.homeScoreInput.validate(),
				self.refs.awayPlayerInput.validate(),
				self.refs.awayScoreInput.validate()]);
	}

	addResult() {
		const self = this;
		self.validate()
			.then((validationResults) => {
				if (validationResults.every(result => result.isValid)) {
					request.post('/api/matches')
							.send(self.getInputData())
							.set('Accept', 'application/json')
							.use(promisify)
							.promise()
							.then(function(response) {
								self.setState({ responseData: response.text });
							});
				}
			});
	}

	handleHomePlayerChange(event) {
		this.setState({home_player: event.target.value});
	}

	handleHomeScoreChange(event) {
		this.setState({home_score: event.target.value});
	}

	handleAwayPlayerChange(event) {
		this.setState({away_player: event.target.value});
	}

	handleAwayScoreChange(event) {
		this.setState({away_score: event.target.value});
	}

	handleOvertimeChange(event) {
		this.setState({overtime: event.target.value});
	}

	componentWillMount() {
		const self = this;
		this.setState({ players: self.getPlayers() });
	}

	render() {
		const self = this;
		return (
			<div>
				<h1>Add a match result</h1>
				<label>Home player
					<Forms.Select ref="homePlayerInput"
						value={self.state.home_player}
						onChange={self.handleHomePlayerChange.bind(self)}
						validators={ Forms.Validators.required('Home player is required') }
					>
						<option value={null}></option>
					{
						self.state.players.map((player, index) => {
							return <option key={`hp${index}`} value={player}>{player}</option>;
						})
					}
					</Forms.Select>
				</label>
				<label>Home score
	                <Forms.Input type="text" ref="homeScoreInput"
						value={self.state.home_score}
						onChange={self.handleHomeScoreChange.bind(self)}
						validators={ Forms.Validators.required('Home score is required'),
				                    Forms.Validators.patternMatch(
				                        /^\d+$/,
				                        'Score must be a number'
				                    ) }
						/>
	            </label>
				<label>Away player
					<Forms.Select ref="awayPlayerInput"
						value={self.state.away_player}
						onChange={self.handleAwayPlayerChange.bind(self)}
						validators={ Forms.Validators.required('Away player is required') }
					>
						<option value={null}></option>
					{
						self.state.players.map((player, index) => {
							return <option key={`ap${index}`} value={player}>{player}</option>;
						})
					}
					</Forms.Select>
				</label>
				<label>Away score
	                <Forms.Input type="text" ref="awayScoreInput"
						value={self.state.away_score}
						onChange={self.handleAwayScoreChange.bind(self)}
						validators={ Forms.Validators.required('Away score is required'),
				                    Forms.Validators.patternMatch(
				                        /^\d+$/,
				                        'Score must be a number'
				                    ) }
						/>
	            </label>
				<label className="checkbox-label">
				    <input type="checkbox"
						value={self.state.overtime}
						onChange={self.handleOvertimeChange.bind(self)}
					/>Overtime
				</label>
				<button className="primary" onClick={self.addResult.bind(self)}>Add</button>
				<p>{self.state.responseData}</p>
			</div>
		);
	}
}

export default AddMatchResult;
