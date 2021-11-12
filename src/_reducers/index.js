import {combineReducers} from 'redux';
import user from './userReducer';
import problem from './problemReducer';
import problemAdmin from './../admin/_reducers/problemReducerAdmin';

const RootReducer = combineReducers({
	user,
	problem,
	problemAdmin,
});

export default RootReducer;
