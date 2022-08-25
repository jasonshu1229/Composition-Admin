import shRequest from '../../index';

import { IDataType } from '../../types';

/**
 * @description 请求页面的pageList数据，用于table
 * @param url 请求的路由地址
 * @param queryInfo 请求体信息
 */
export function getPageListData(url: string, queryInfo: any) {
	return shRequest.post<IDataType>({
		url: url,
		data: queryInfo
	});
}
