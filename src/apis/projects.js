import axiosClient from './axios';

const projectAPI = {
	compile: (params) => {
		const url = '/projects/compile';
		return axiosClient.post(url, params );
	},
	addMyList: (params) => {
		const url = '/projects/addlist';
		return axiosClient.post(url, params);
	},
};

export default projectAPI;
