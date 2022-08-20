import axios from 'axios';
import type { AxiosInstance } from 'axios';
import type { SHRequestInterceptors, SHRequestConfig } from './type';

import { ElLoading } from 'element-plus';
import { LoadingInstance } from 'element-plus/lib/components/loading/src/loading';

const DEFAULT_LOADING = false;

// axios的二次封装
class SHRequest {
	instance: AxiosInstance;
	interceptors?: SHRequestInterceptors;
	showLoading: boolean;
	loading?: LoadingInstance;

	constructor(config: SHRequestConfig) {
		// 创建axios实例
		this.instance = axios.create(config);

		// 配置Loading的初始值
		this.showLoading = config.showLoading ?? DEFAULT_LOADING;

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

		// 2. 给所有的实例添加都有的拦截器
		this.instance.interceptors.request.use(
			(config) => {
				// console.log('所有的实例都有的拦截器：请求成功拦截');

				if (this.showLoading) {
					this.loading = ElLoading.service({
						fullscreen: true,
						lock: true,
						text: 'Loading',
						background: 'rgba(0, 0, 0, 0.7)'
					});
				}

				return config;
			},
			(err) => {
				// console.log('所有的实例都有的拦截器：请求失败拦截');
				return err;
			}
		);
		this.instance.interceptors.response.use(
			(res) => {
				// console.log('所有的实例都有的拦截器：响应成功拦截');

				// 将loading移出
				setTimeout(() => {
					this.loading?.close();
				}, 2000);

				const data = res.data;

				if (data.returnCode === '-1001') {
					console.log('请求失败~错误信息');
				} else {
					return res.data;
				}
			},
			(err) => {
				// console.log('所有的实例都有的拦截器：响应失败拦截');
				// 根据不同的 HttpErrorCode 显示不同的错误信息
				if (err.response.status === 404) {
					console.log('404的错误~！');
				}
				return err;
			}
		);
	}

	request<T>(config: SHRequestConfig<T>): Promise<T> {
		return new Promise((resolve, reject) => {
			// 1. 为每个请求配置 请求拦截器
			if (config.interceptors?.requestInterceptor) {
				config = config.interceptors?.requestInterceptor(config);
			}

			// 2. 判断是否让实例中传进来的showLoading生效
			if (config.showLoading === false) {
				this.showLoading = config.showLoading;
			}

			this.instance
				.request<any, T>(config)
				.then((res) => {
					// 1. 对每个请求数据的处理
					// 为每个请求配置 响应拦截器
					if (config.interceptors?.responseInterceptor) {
						res = config.interceptors.responseInterceptor(res);
					}
					// 2. 将showLoading设置为初始值true，这样不会影响下一个请求
					this.showLoading = DEFAULT_LOADING;

					// 3. 将结果resolve
					resolve(res);
				})
				.catch((err) => {
					// 将showLoading设置为初始值true，这样不会影响下一个请求
					this.showLoading = DEFAULT_LOADING;
					reject(err);
					return err;
				});
		});
	}

	get<T>(config: SHRequestConfig<T>): Promise<T> {
		return this.request<T>({ ...config, method: 'GET' });
	}

	post<T>(config: SHRequestConfig<T>): Promise<T> {
		return this.request<T>({ ...config, method: 'POST' });
	}

	delete<T>(config: SHRequestConfig<T>): Promise<T> {
		return this.request<T>({ ...config, method: 'DELETE' });
	}

	patch<T>(config: SHRequestConfig<T>): Promise<T> {
		return this.request<T>({ ...config, method: 'PATCH' });
	}
}

export default SHRequest;
