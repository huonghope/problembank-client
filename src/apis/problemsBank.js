import axiosClient from './axios';
import axiosScoreServer from './axiosScoreServer';

const problemsBank = {
	getCategory: (params) => {
		const url = '/problems/getcategory';
		return axiosClient.get(url, {params});
	},
	getProblemsBankByCategoryID: (params) => {
		const url = '/problems/category';
		return axiosClient.get(url, {params});
	},
	getProblemAllData: (params) => {
		const url = '/problems/problemsdata';
		return axiosClient.get(url);
	},
	getProblemInformation: (params) => {
		const url = '/problems/getproblemsinfor';
		return axiosClient.get(url);
	},
	ProblemToMyList: (params) => {
		const url = '/problems/problemtomylist';
		return axiosClient.post(url, params);
	},
	getProblemFromMyList: (params) => {
		const url = '/problems/getmyproblems';
		return axiosClient.get(url);
	},
	getMultiProblems: (params) => {
		const url = '/problems/getlistmultiproblems';
		return axiosClient.get(url);
	},
	getShortansProblems: (params) => {
		const url = '/problems/shortans';
		return axiosClient.get(url);
	},
	deleteMyProblem: (params) => {
		const url = '/problems/delete-myproblem';
		return axiosClient.get(url, {params});
	},
	getMyProcessor: (params) => {
		const url = '/problems/problem-processor';
		return axiosClient.get(url, {params});
	},
	getStatusProblem: (params) => {
		const url = '/problems/status-problem';
		return axiosClient.get(url, {params});
	},
	getStatusProblem: (params) => {
		const url = '/problems/status-problems';
		return axiosClient.get(url, {params});
	},
	getStatusMultiProblem: (params) => {
		const url = '/problems/status-multiproblem';
		return axiosClient.get(url, {params});
	},
	submitShortans: (params) => {
		const url = '/problems/submit-shortans';
		return axiosClient.post(url, params);
	},
	getStatusShortansProblem: (params) => {
		const url = '/problems/status-shortans';
		return axiosClient.get(url, {params});
	},
	compileProblem: (params) => {
		const url = '/projects/compile-problem';
		return axiosScoreServer.post(url, params);
	}
};

export default problemsBank;
