import { Module } from 'vuex';

import {
	accountLoginRequest,
	requestUserInfoById,
	requestUserMenusByRoleId
} from '@/service/login/login';
import router from '@/router';

import { IAccount } from '@/service/login/type';
import { ILoginState } from './types';
import { IRootState } from '../types';

import localCache from '@/utils/cache';

const loginModule: Module<ILoginState, IRootState> = {
	namespaced: true,
	state() {
		return {
			token: '',
			userInfo: {},
			userMenus: []
		};
	},
	getters: {},
	mutations: {
		changeToken(state, token: string) {
			state.token = token;
		},
		changeUserInfo(state, userInfo: any) {
			state.userInfo = userInfo;
		},
		changeUserMenus(state, userMenus: any) {
			state.userMenus = userMenus;
		}
	},
	actions: {
		async accountLoginAction({ commit }, payload: IAccount) {
			// 1. 实现登录逻辑
			const loginResult = await accountLoginRequest(payload);
			const { id, token } = loginResult.data;
			commit('changeToken', token);
			localCache.setCache('token', token);

			// 2. 请求用户信息
			const userInfoResult = await requestUserInfoById(id);
			const userInfo = userInfoResult.data;
			commit('changeUserInfo', userInfo);
			localCache.setCache('userInfo', userInfo);

			// 3. 请求角色菜单
			const userMenusResult = await requestUserMenusByRoleId(id);
			const userMenus = userMenusResult.data;
			commit('changeUserMenus', userMenus);
			localCache.setCache('userMenus', userMenus);

			// 4. 跳到首页
			await router.push('/main');
		},
		loadLocalLogin({ commit }) {
			const token = localCache.getCache('token');
			if (token) {
				commit('changeToken', token);
			}
			const userInfo = localCache.getCache('userInfo');
			if (userInfo) {
				commit('changeUserInfo', userInfo);
			}
			const userMenus = localCache.getCache('userMenus');
			if (userInfo) {
				commit('changeUserMenus', userMenus);
			}
		}
	}
};

export default loginModule;
