import { Module } from 'vuex';
import { ISystemState } from '@/store/system/types';
import { IRootState } from '@/store/types';

import { getPageListData } from '@/service/main/system/system';

const systemModule: Module<ISystemState, IRootState> = {
	namespaced: true,
	state() {
		return {
			usersList: [],
			usersCount: 0,
			roleList: [],
			roleCount: 0
		};
	},
	mutations: {
		changeUsersList(state, usersList: any[]) {
			state.usersList = usersList;
		},
		changeUsersCount(state, usersCount: number) {
			state.usersCount = usersCount;
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
				// 不将state 断言成any类型，会报错，因为 state 推导下来是 ISystemState 类型
				return (state as any)[`${pageName}List`];
				// switch (pageName) {
				// 	case 'users':
				// 		return state.usersList;
				// 	case 'role':
				// 		return state.roleList;
				// }
			};
		},
		pageListTableCount(state) {
			return (pageName: string) => {
				return (state as any)[`${pageName}Count`];
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

			// 类型断言成 string，方便有api提示
			const changePageName =
				(pageName.slice(0, 1) as string).toUpperCase() + pageName.slice(1);

			commit(`change${changePageName}List`, list);
			commit(`change${changePageName}Count`, totalCount);
		}
	}
};

export default systemModule;
