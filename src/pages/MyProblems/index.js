import React from 'react';
import {Route, Switch, useRouteMatch} from 'react-router-dom';
import MyListPage from './pages/MyListPage';

function MyProblems(props) {
	const match = useRouteMatch();
	return (
		<Switch>
			<Route exact path = {`${match.url}/`} component = {MyListPage} />
		</Switch>
	);
}

export default MyProblems;

