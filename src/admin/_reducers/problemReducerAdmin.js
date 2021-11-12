import {
	GET_PROBLEMS_DATA,
	GET_PROBLEMS_INFOR,
	GET_CATEGORIES_INFOR,
	GET_MULTICHOICE_PROBLEMS_INFOR,
	GET_SHORT_PROBLEMS_INFOR,
} from '../_actions/types';

export default function(state= {}, action) {
	switch (action.type) {
	case GET_PROBLEMS_DATA:
		return {...state, problemsAllData: action.payload};
	case GET_PROBLEMS_INFOR:
		return {...state, problemsInfor: action.payload};
	case GET_CATEGORIES_INFOR:
		return {...state, categories: action.payload};
	case GET_MULTICHOICE_PROBLEMS_INFOR:
		return {...state, multiChoiceProblems: action.payload};
	case GET_SHORT_PROBLEMS_INFOR:
		return {...state, shortProblems: action.payload};
	default:
		return state;
	}
}
