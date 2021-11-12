import React from 'react';
import {Route, Switch, useRouteMatch} from 'react-router-dom';
import ListCategory from './pages/ListCategory';
import ProblemsByCategory from './pages/ProblemsByCategory';

function ProblemsByCategories(props) {
	const match = useRouteMatch();
	return (
		<Switch>
			<Route exact path = {`${match.url}`} component = {ListCategory} />
			<Route path = {`${match.url}/listproblems`} component = {ProblemsByCategory} />
		</Switch>
	);
}

export default ProblemsByCategories;

