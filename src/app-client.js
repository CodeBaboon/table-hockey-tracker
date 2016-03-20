import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import Home from './components/home';
import MatchResults from './components/matches/index';
import AddMatchResult from './components/matches/add';

const parentElement = document.getElementById('placeholder');
// const orgUnitId = parentElement.getAttribute('data-org-unit-id');

ReactDOM.render((
	<Router history={browserHistory}>
	  <Route path="/" component={Home} />
	  <Route path="/matches" component={MatchResults} />
	  <Route path="/matches/add" component={AddMatchResult} />
	</Router>),
	document.getElementById('placeholder')
);
