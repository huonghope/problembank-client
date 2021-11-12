import React from 'react';
import {Route, Switch, useRouteMatch} from 'react-router-dom';
import MultipleChoicePage from './pages/MultipleChoicePage';
import DetailProblem from './pages/DetailProblem';

function Multiplechoice(props) {
	const match = useRouteMatch();
	return (
		<Switch>
			<Route exact path = {`${match.url}`} component = {MultipleChoicePage} />
			<Route exact path = {`${match.url}/view`} component = {DetailProblem} />
		</Switch>
	);
}

export default Multiplechoice;

