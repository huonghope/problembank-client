import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Route, Switch, useRouteMatch} from 'react-router-dom';
import Index from './pages/MainPage';

function MainPage(props) {
	const match = useRouteMatch();
	return (
		<Switch>
			<Route exact path={`${match.url}`} component= {Index}/>
		</Switch>
	);
}

export default MainPage;

