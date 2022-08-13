// 自定义拦截器
import type { AxiosRequestConfig, AxiosResponse } from 'axios';

export interface SHRequestInterceptors {
	requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig;
	requestInterceptorCatch?: (error: any) => any;
	responseInterceptor?: (res: AxiosResponse) => AxiosResponse;
	responseInterceptorCatch?: (error: any) => any;
}

// 对原来的AxiosRequestConfig进行扩展
export interface SHRequestConfig extends AxiosRequestConfig {
	interceptors?: SHRequestInterceptors;
}
