import { Module } from 'vuex';
import { ISystemState } from '@/store/system/types';
import { IRootState } from '@/store/types';

import { getPageListData } from '@/service/main/system/system';

const systemModule: Module<ISystemState, IRootState> = {
	namespaced: true,
	state() {
		return {
			userList: [],
			userCount: 0
		};
	},
	mutations: {
		changeUserList(state, userList: any[]) {
			state.userList = userList;
		},
		changeUserCount(state, userCount: number) {
			state.userCount = userCount;
		}
	},
	actions: {
		async getPageListAction({ commit }, payload: any) {
			// payload：{pageUrl: 'user/list', queryInfo: {…}}

			console.log(payload.pageUrl);
			console.log(payload.queryInfo);

			// 1. 对页面发生请求
			const pageResult = await getPageListData(
				payload.pageUrl,
				payload.queryInfo
			);

			const { list, totalCount } = pageResult.data;
			commit('changeUserList', list);
			commit('changeUserCount', totalCount);
		}
	}
};

export default systemModule;
