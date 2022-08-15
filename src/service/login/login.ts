import shRequest from '@/service';

import { IAccount, IDataType, ILoginResult } from './type';

enum LoginAPI {
	AccountLogin = '/login'
}

export function accountLoginRequest(account: IAccount) {
	return shRequest.post<IDataType<ILoginResult>>({
		url: LoginAPI.AccountLogin,
		data: account
	});
}
