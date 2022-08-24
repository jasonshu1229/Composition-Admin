import { Module } from 'vuex';
import { ISystemState } from '@/store/system/types';
import { IRootState } from '@/store/types';

import { getPageListData } from '@/service/main/system/system';

const systemModule: Module<ISystemState, IRootState> = {
	namespaced: true,
	state() {
		return {
			userList: [],
			userCount: 0,
			roleList: [],
			roleCount: 0
		};
	},
	mutations: {
		changeUsersList(state, userList: any[]) {
			state.userList = userList;
		},
		changeUsersCount(state, userCount: number) {
			state.userCount = userCount;
		},
		changeRoleList(state, roleList: any[]) {
			state.roleList = roleList;
		},
		changeRoleCount(state, roleCount: number) {
			state.roleCount = roleCount;
		}
	},
	getters: {
		pageTableListData(state) {
			return (pageName: string) => {
				switch (pageName) {
					case 'users':
						return state.userList;
					case 'role':
						return state.roleList;
				}
			};
		}
	},
	actions: {
		async getPageListAction({ commit }, payload: any) {
			// 1. 获取pageUrl
			const pageName = payload.pageName;
			const pageUrl = `/${pageName}/list`;

			console.log(pageUrl);
			console.log(payload.queryInfo);

			// 2. 对页面发生请求
			const pageResult = await getPageListData(pageUrl, payload.queryInfo);

			// 3. 将数据存储到state中
			const { list, totalCount } = pageResult.data;

			const changePageName =
				pageName.slice(0, 1).toUpperCase() + pageName.slice(1);
			commit(`change${changePageName}List`, list);
			commit(`change${changePageName}Count`, totalCount);
		}
	}
};

export default systemModule;
