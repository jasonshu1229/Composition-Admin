import shRequest from '../../index';

import { IDataType } from '../../types';

export function getPageListData(url: string, queryInfo: any) {
	return shRequest.post<IDataType>({
		url: url,
		data: queryInfo
	});
}
