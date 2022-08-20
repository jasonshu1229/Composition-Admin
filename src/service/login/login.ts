import shRequest from '@/service';

import { IAccount, ILoginResult } from './type';
import { IDataType } from '../types';

enum LoginAPI {
	AccountLogin = '/login',
	LoginUserInfo = '/users/', // 用法：/users/1
	UserMenus = '/role/' // 用法： role/1/menu
}

/**
 * @description 用户登录请求
 * @param account 账号、密码
 */
export function accountLoginRequest(account: IAccount) {
	return shRequest.post<IDataType<ILoginResult>>({
		url: LoginAPI.AccountLogin,
		data: account
	});
}

/**
 * @description 根据 ID 查询某个用户信息
 * @param id 用户 id
 */
export function requestUserInfoById(id: number) {
	return shRequest.get<IDataType>({
		url: LoginAPI.LoginUserInfo + id,
		showLoading: false
	});
}

/**
 * @description 根据 ID 查询角色菜单树
 * @param id 角色 ID
 */
export function requestUserMenusByRoleId(id: number) {
	return shRequest.get<IDataType>({
		url: LoginAPI.UserMenus + id + '/menu',
		showLoading: false
	});
}
