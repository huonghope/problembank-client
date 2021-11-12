import testAPI from '../apis/tests';
import {
	GET_USER_RESULTS,
	GET_USER_TESTS,
	GET_USER_ANSWERS,
} from './types.js';

export async function getUserTest(user_id) {
	const request = testAPI.getUserTests({user_id: user_id});
	return {
		type: GET_USER_TESTS,
		payload: request,
	};
}

export async function getUserResult(user_id) {
	const request = testAPI.getResultUser({user_id: user_id});
	return {
		type: GET_USER_RESULTS,
		payload: request,
	};
}

export async function getUserAnswer({test_id, u_id}) {
	const request = testAPI.getUserAnswers({test_id: test_id, u_id: u_id});
	return {
		type: GET_USER_ANSWERS,
		payload: request,
	};
}
