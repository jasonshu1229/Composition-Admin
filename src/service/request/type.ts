// 自定义拦截器
import type { AxiosRequestConfig, AxiosResponse } from 'axios';

export interface SHRequestInterceptors<T = AxiosResponse> {
	requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig;
	requestInterceptorCatch?: (error: any) => any;
	responseInterceptor?: (res: T) => T;
	responseInterceptorCatch?: (error: any) => any;
}

// 对原来的AxiosRequestConfig进行扩展
export interface SHRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
	interceptors?: SHRequestInterceptors<T>;
	showLoading?: boolean;
}
