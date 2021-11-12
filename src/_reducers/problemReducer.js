import {
	GET_PROBLEMS_DATA,
	GET_PROBLEMS_INFOR,
} from '../_actions/types';

export default function(state= {}, action) {
	switch (action.type) {
	case GET_PROBLEMS_DATA:
		return {...state, problemsAllData: action.payload};
	case GET_PROBLEMS_INFOR:
		return {...state, problemsInfor: action.payload};
	default:
		return state;
	}
}
