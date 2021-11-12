import problemAPI from '../../apis/admin/problem';
import {
	GET_PROBLEMS_DATA,
	GET_PROBLEMS_INFOR,
	GET_CATEGORIES_INFOR,
	GET_MULTICHOICE_PROBLEMS_INFOR,
	GET_SHORT_PROBLEMS_INFOR,
} from './types.js';

export async function getProblemData() {
	const request = problemAPI.getProblemAllData();
	return {
		type: GET_PROBLEMS_DATA,
		payload: request,
	};
}
export async function getProblemsInformation() {
	const request = problemAPI.getProblemInformation();
	return {
		type: GET_PROBLEMS_INFOR,
		payload: request,
	};
}

export async function getCategories() {
	const request = problemAPI.getCategories();
	return {
		type: GET_CATEGORIES_INFOR,
		payload: request,
	};
}

export async function getMultiChoiceProblems() {
	const request = problemAPI.getMultiChoiceProblems();
	return {
		type: GET_MULTICHOICE_PROBLEMS_INFOR,
		payload: request,
	};
}

export async function getShortProblems() {
	const request = problemAPI.getShortProblems();
	return {
		type: GET_SHORT_PROBLEMS_INFOR,
		payload: request,
	};
}
