import { Module } from 'vuex';

import { accountLoginRequest } from '@/service/login/login';

import { IAccount } from '@/service/login/type';
import { ILoginState } from './types';
import { IRootState } from '../types';

const loginModule: Module<ILoginState, IRootState> = {
	namespaced: true,
	state() {
		return {
			token: '',
			userInfo: {}
		};
	},
	getters: {},
	mutations: {
		changeToken(state, token: string) {
			state.token = token;
		}
	},
	actions: {
		async accountLoginAction({ commit }, payload: IAccount) {
			// 实现真正的登录逻辑
			const loginResult = await accountLoginRequest(payload);
			const { token } = loginResult.data;
			commit('changeToken', token);
		},
		phoneLoginAction({ commit }, payload: any) {
			console.log('执行phoneLoginAction', payload);
		}
	}
};

export default loginModule;
