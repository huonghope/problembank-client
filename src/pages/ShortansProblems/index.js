import React from 'react';
import {Route, Switch, useRouteMatch} from 'react-router-dom';
import ShortansProblems from './pages/ShortansProblems';
import DetailProblem from './pages/DetailProblem';

function ShortansProblemsRouter(props) {
	const match = useRouteMatch();
	return (
		<Switch>
			<Route exact path = {`${match.url}/`} component = {ShortansProblems} />
			<Route exact path = {`${match.url}/view`} component = {DetailProblem} />
		</Switch>
	);
}

export default ShortansProblemsRouter;

