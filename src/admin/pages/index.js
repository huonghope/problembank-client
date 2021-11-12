import React from 'react';
import {Route, Switch, useRouteMatch} from 'react-router-dom';
import Dashboard from './Dashboard';
import Problem from './Dashboard/Problem';
import Multiple from './Dashboard/Multiple';
import Short from './Dashboard/Short';
import CreateMultiChoiceProblem from './Problem/CreateMultiChoiceProblem';
import CreateShortAnswerProblem from './Problem/CreateShortProblem';
import CreateProblem from './Problem/CreateProblem';
import EditProblem from './Problem/EditProblem';
import EditMultiChoiceProblem from './Problem/EditMultiChoiceProblem';
import EditShortChoiceProblem from './Problem/EditShortProblem';
import NotFound from '../../components/404NotFound';
import {useSelector} from 'react-redux';


// ! URL 너무 길어음
function AdminPage(props) {
	const match = useRouteMatch();
	const user = useSelector((state) => state.user);
	if (user.userData.roleId !== 1) {
		return ( <NotFound /> );
	}
	return (
		<Switch>
			<Route exact path = {`${match.url}`} render={(props) => <Problem {...props} />} />
			<Route exact path = {`${match.url}/multiple`} render={(props) => <Multiple {...props} />} />
			<Route exact path = {`${match.url}/short`} render={(props) => <Short {...props}/>} />
			{/* <Route exact path = {`${match.url}`} component = {Dashboard} />         */}
			{/* 코딩 문제(프로그래밍) 등록 */}
			<Route exact path = {`${match.url}/createproblem`} render={(props) => <CreateProblem {...props} /> } />
			{/* 객관식 문제 등록 */}
			<Route exact path = {`${match.url}/createmultichoiceproblem`} render={(props) => <CreateMultiChoiceProblem {...props} />} />
			{/* 단답형 문제 등록         */}
			<Route exact path={`${match.url}/createshortanswerproblem`} render={(props) => <CreateShortAnswerProblem {...props} />} />

			{/* 코딩 문제(프로그래밍) 수정 */}
			<Route exact path = {`${match.url}/edit`} render={(props) => <EditProblem {...props} />} />
			{/* 객관식 문제 수정 */}
			<Route exact path = {`${match.url}/editmulti`} render={(props) => <EditMultiChoiceProblem {...props} /> } />
			<Route exact path = {`${match.url}/editshort`} render={(props) => <EditShortChoiceProblem {...props} /> } />
		</Switch>
	);
}

export default AdminPage;

