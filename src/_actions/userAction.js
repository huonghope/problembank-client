import userAPI from '../apis/userAPI.js';
import {
	LOGIN_USER,
	AUTH_USER,
	GET_USER_INFO,
} from './types.js';

export async function loginUser(datatoSubmit) {
	const request = await userAPI.loginUser(datatoSubmit);
	return {
		type: LOGIN_USER,
		payload: request,
	};
}

export async function auth() {
	const request = await userAPI.auth();
	return {
		type: AUTH_USER,
		payload: request,
	};
}

export async function getUserInfo() {
	const request = userAPI.getUserInfo();
	return {
		type: GET_USER_INFO,
		payload: request,
	};
}
