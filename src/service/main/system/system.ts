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

/**
 * @description 根据 url 删除对应的数据
 * @param url /users/id
 */
export function deletePageData(url: string) {
	return shRequest.delete<IDataType>({
		url: url
	});
}

/**
 * @description 根据 url 创建对应数据
 * @param url /user
 * @param newData 新建时编写的数据
 */
export function createPageData(url: string, newData: any) {
	return shRequest.post<IDataType>({
		url: url,
		data: newData
	});
}

/**
 * @description 根据 url 编辑对应数据
 * @param url /user
 * @param editData 编辑时填入的数据
 */
export function editPageData(url: string, editData: any) {
	return shRequest.patch<IDataType>({
		url: url,
		data: editData
	});
}
