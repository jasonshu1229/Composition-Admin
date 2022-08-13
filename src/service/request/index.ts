import axios from 'axios';
import type { AxiosInstance, AxiosRequestConfig } from 'axios';
import type { SHRequestInterceptors, SHRequestConfig } from './type';

// axios的二次封装
class SHRequest {
	instance: AxiosInstance;
	interceptors?: SHRequestInterceptors;

	constructor(config: SHRequestConfig) {
		// 创建axios实例
		this.instance = axios.create(config);

		// 保存基本信息
		this.interceptors = config.interceptors;

		// 使用拦截器
		// 1. 从config中取出的拦截器是对应的实例拦截器
		this.instance.interceptors.request.use(
			this.interceptors?.requestInterceptor,
			this.interceptors?.requestInterceptorCatch
		);
		this.instance.interceptors.response.use(
			this.interceptors?.responseInterceptor,
			this.interceptors?.responseInterceptorCatch
		);
	}

	request(config: AxiosRequestConfig): void {
		this.instance.request(config).then((res) => {
			console.log(res.data);
		});
	}
}

export default SHRequest;
