import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import Home from './components/home';
import MatchResults from './components/matches/index';
import AddMatchResult from './components/matches/add';
import Player from './components/players/index';

const parentElement = document.getElementById('placeholder');

ReactDOM.render((
	<Router history={browserHistory}>
	  <Route path="/" component={Home} />
	  <Route path="/matches" component={MatchResults} />
	  <Route path="/matches/add" component={AddMatchResult} />
	  <Route path="/players/:name" component={Player} />
	</Router>),
	document.getElementById('placeholder')
);
