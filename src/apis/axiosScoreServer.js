import axios from 'axios';
import queryString from 'querystring';

const axiosClientServer = axios.create({
	baseURL: process.env.REACT_APP_SERVER_SCORE_API,
	headers: {
		'content-type': 'application/json',
	},
	paramsSerializer: (params) => queryString.stringify(params),
});

// handle token for request
axiosClientServer.interceptors.request.use(async (config) => {
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
axiosClientServer.interceptors.response.use((response) => {
	if (response && response.data) {
		return response.data;
	}
	return response;
}, (error) => {
	throw error;
});

export default axiosClientServer;
