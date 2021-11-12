import React, {Suspense} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import './assets/styles/grid.css';


import Auth from './hocs/Authentication';
import NotFound from './components/404NotFound';
import Loading from './components/Loading/Loading';

const MainPage = React.lazy(() => import('./pages/MainPage'));
const ProblemsByCategories = React.lazy(() => import('./pages/ProblemsByCategories'));
const CodingProblems = React.lazy(() => import('./pages/CodingProblems'));
const MyProblems = React.lazy(() => import('./pages/MyProblems'));
const Multiplechoice = React.lazy(() => import('./pages/MultipleChoice'));
const ShortansProblems = React.lazy(() => import('./pages/ShortansProblems'));
const AdminPage = React.lazy(() => import('./admin/pages'));
function App() {
	const getHeadOrBody = () =>{
		return document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0];
	};

	// Inject if not
	getHeadOrBody().appendChild(
		Object.assign(
			document.createElement('script'),
			{
				type: 'text/javascript',
				async: true,
				src: 'https://cdn.rawgit.com/google/code-prettify/master/loader/run_prettify.js',
			},
		),
	);
	return (
		<Suspense fallback = {<Loading type={'bars'} color={'black'} />}>
			<BrowserRouter>
				<Switch>
					<Route exact path = "/" component = {Auth(MainPage, true)}/>
					<Route path = "/problemsbank" component = {Auth(ProblemsByCategories, true)}/>
					<Route path = "/codeproblems" component = {Auth(CodingProblems, true)}/>
					<Route path = "/mylist" component = {Auth(MyProblems, true)}/>
					<Route path = "/multiplechoice" component = {Auth(Multiplechoice, true)}/>
					<Route path = "/shortans" component = {Auth(ShortansProblems, true)}/>
					<Route path = "/mylist" component = {Auth(MyProblems, true)}/>
					
					{/* admin page */}
					<Route path = "/admin" component = {Auth(AdminPage, true)}/>
					<Route component = {NotFound} />
				</Switch>
			</BrowserRouter>
		</Suspense>
	);
}

export default App;