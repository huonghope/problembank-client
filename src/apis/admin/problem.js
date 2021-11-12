import axiosClient from './axios';

const AdminProblemAPI = {
	insertProblems: (params) => {
		const url = 'admin/problems/insertproblem';
		return axiosClient.post(url, params);
	},
	updateProblems: (params) => {
		const url = 'admin/problems/updateproblem';
		return axiosClient.put(url, params);
	},
	MultiUpdateProblem: (params) => {
		const url = 'admin/problems/update-multichoice';
		return axiosClient.put(url, params);
	},
	ShortUpdatdeProblems: (params) => {
		const url = 'admin/problems/update-short';
		return axiosClient.put(url, params);
	},
	deleteProblem: (params) => {
		const url = 'admin/problems/delete-problem';
		return axiosClient.post(url, params);
	},
	MultideleteProblem: (params) => {
		const url = 'admin/problems/Multidelete-problem';
		return axiosClient.post(url, params);
	},

	deleteShortProblem: (params) => {
		const url = 'admin/problems/delete-shortans';
		return axiosClient.post(url, params);
	},
	deleteMultiChoiceProblem: (params) => {
		const url = 'admin/problems/delete-multiplechoice';
		return axiosClient.post(url, params);
	},
	getProblemAllData: (params) => {
		const url = '/problems/problemsdata';
		return axiosClient.get(url);
	},
	getCategories: (params) => {
		const url = '/problems/getcategories';
		return axiosClient.get(url);
	},
	insertMultiChoiceProblems: (params) => {
		const url = 'admin/problems/insert-multichoice';
		return axiosClient.post(url, params);
	},
	getProblemById: (params) => {
		const url = 'admin/problems/';
		return axiosClient.get(url, {params});
	},
	getMultiChoiceProblemById: (params) => {
		const url = 'admin/problems/multi';
		return axiosClient.get(url, {params});
	},
	insertShortProblems: (params) => {
		const url = 'admin/problems/insert-short';
		return axiosClient.post(url, params);
	},
	getMultiChoiceProblems: (params) => {
		const url = '/problems/getlistmultiproblems';
		return axiosClient.get(url);
	},
	getMultiChoiceProble: (params) => {
		const url = '/problems/multi';
		return axiosClient.get(url, {params});
	},
	getShortProblem: (params) => {
		const url = 'admin/problems/short';
		return axiosClient.get(url, {params});
	},
	getShortProblems: (params) => {
		const url = '/problems/shortans';
		return axiosClient.get(url);
	},
	submitMultiChoiceProblem: (params) => {
		const url = '/problems/submit-multichoice';
		return axiosClient.get(url, {params});
	},


};

export default AdminProblemAPI;
