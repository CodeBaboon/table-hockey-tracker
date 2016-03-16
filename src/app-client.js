import React from 'react';
import ReactDOM from 'react-dom';
import Home from './components/home';

const parentElement = document.getElementById('placeholder');
// const orgUnitId = parentElement.getAttribute('data-org-unit-id');

ReactDOM.render(
	// <Home orgUnitId={orgUnitId} />,
	<Home />,
	document.getElementById('placeholder')
);
