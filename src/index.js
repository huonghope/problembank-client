import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
// confirm redux
import store from './_reducers';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import promiseMiddleware from 'redux-promise';
import ReduxThunk from 'redux-thunk';

const createStoreWithMiddleware = applyMiddleware(promiseMiddleware, ReduxThunk)(createStore);
ReactDOM.render(
	<Provider
		store={createStoreWithMiddleware(
			store,
			window.__REDUX_DEVTOOLS_EXTENSION__ &&
          window.__REDUX_DEVTOOLS_EXTENSION__(),
		)}
	>
		<App/>
	</Provider>,
	document.getElementById('root'),
);
