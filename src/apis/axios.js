import axios from 'axios';
import queryString from 'querystring';

const axiosClient = axios.create({
	baseURL: process.env.REACT_APP_SERVER_API,
	headers: {
		'content-type': 'application/json',
	},
	paramsSerializer: (params) => queryString.stringify(params),
});

// handle token for request
axiosClient.interceptors.request.use(async (config) => {
	const token = localStorage.getItem('problem_bank');
	if (token)
	{
		config.headers['Authorization'] = `Bearer ${token}`;
	}
	config.headers['Content-Type'] = 'application/json';
	return config;
},
(error) => {
	Promise.reject(error);
},
);

// return data from all response
axiosClient.interceptors.response.use((response) => {
	if (response && response.data) {
		return response.data;
	}
	return response;
}, (error) => {
	throw error;
});

export default axiosClient;
