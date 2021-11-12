import axiosClient from './axios';

const userAPI = {
	loginUser: (params) => {
		const url = '/users/login';
		return axiosClient.post(url, params);
	},
	auth: (params) => {
		const url = '/users/auth';
		return axiosClient.post(url, params);
	},
	authRedirect: (params) => {
		const url = '/users/authRedirect';
		return axiosClient.post(url, params);
	},
	getRoleIdByUserId: (params) => {
		const url = '/users/getRoleIdByUserId';
		return axiosClient.post(url, params);
	},
};

export default userAPI;
