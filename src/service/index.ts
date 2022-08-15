// service统一出口
import SHRequest from '@/service/request';
import { BASE_URL, TIME_OUT } from './request/config';

const shRequest = new SHRequest({
	baseURL: BASE_URL,
	timeout: TIME_OUT,
	// 每个实例都可以有自己的拦截器
	interceptors: {
		requestInterceptor: (config) => {
			// 携带 token 的拦截
			// const token = 'token';
			// if (token) {
			// 	config.headers.Authorization = `Bearer ${token}`;
			// }
			return config;
		},
		requestInterceptorCatch: (err) => {
			return err;
		},
		responseInterceptor: (res) => {
			return res;
		},
		responseInterceptorCatch: (err) => {
			return err;
		}
	}
});

export default shRequest;
