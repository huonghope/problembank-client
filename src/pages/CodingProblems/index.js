import React from 'react';
import {Route, Switch, useRouteMatch} from 'react-router-dom';
import TotalProblemsPage from './pages/TotalProblemsPage';
import DetailProblem from './pages/DetailProblem';
function TotalProblems(props) {
	const match = useRouteMatch();
	return (
		<Switch>
			<Route exact path = {`${match.url}`} component = {TotalProblemsPage} />
			<Route exact path = {`${match.url}/view`} component = {DetailProblem} />
		</Switch>
	);
}

export default TotalProblems;

