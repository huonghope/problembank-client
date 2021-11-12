import problemAPI from '../apis/problemsBank';
import {
	GET_PROBLEMS_DATA,
	GET_PROBLEMS_INFOR,
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
