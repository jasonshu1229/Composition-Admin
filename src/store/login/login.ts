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
import { mapMenusToPermission, mapMenusToRoutes } from '@/utils/map-menu';

const loginModule: Module<ILoginState, IRootState> = {
	namespaced: true,
	state() {
		return {
			isDark: false,
			token: '',
			userInfo: {},
			userMenus: [],
			permissions: []
		};
	},
	getters: {},
	mutations: {
		changeTheme(state, newValue: boolean) {
			state.isDark = newValue;
		},
		changeToken(state, token: string) {
			state.token = token;
		},
		changeUserInfo(state, userInfo: any) {
			state.userInfo = userInfo;
		},
		changeUserMenus(state, userMenus: any) {
			state.userMenus = userMenus;

			// 注册动态路由 将 userMenus => routes
			const routes = mapMenusToRoutes(userMenus);
			// {path: '/main/analysis/overview', name: 'overview', children: Array(0), component: ƒ}
			routes.forEach((route) => {
				// 把遍历到的路由添加到 main 路由的子路由下面
				router.addRoute('main', route);
			});

			//	获取用户按钮的权限
			const permissions = mapMenusToPermission(userMenus);
			state.permissions = permissions;
		}
	},
	actions: {
		switchTheme({ commit }, payload: boolean) {
			commit('changeTheme', payload);
			localCache.setCache('isDark', payload);
		},
		async accountLoginAction({ commit, dispatch }, payload: IAccount) {
			// 1. 实现登录逻辑
			const loginResult = await accountLoginRequest(payload);
			const { id, token } = loginResult.data;
			commit('changeToken', token);
			localCache.setCache('token', token);

			// 获取到token之后，立马请求（完整的role/department）
			dispatch('getInitialDataAction', null, { root: true });

			// 2. 请求用户信息
			const userInfoResult = await requestUserInfoById(id);
			const userInfo = userInfoResult.data;
			commit('changeUserInfo', userInfo);
			localCache.setCache('userInfo', userInfo);

			// 3. 请求角色菜单
			const userMenusResult = await requestUserMenusByRoleId(userInfo.role.id);
			const userMenus = userMenusResult.data;
			commit('changeUserMenus', userMenus);
			localCache.setCache('userMenus', userMenus);

			// 4. 跳到首页
			await router.push('/main');
		},
		loadLocalLogin({ commit, dispatch }) {
			// 本地加载函数
			const isDark = localCache.getCache('isDark');
			if (isDark) {
				commit('changeTheme', isDark);
			}
			const token = localCache.getCache('token');
			if (token) {
				commit('changeToken', token);
				dispatch('getInitialDataAction', null, { root: true });
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
