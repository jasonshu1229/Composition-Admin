import { Module } from 'vuex';
import { ISystemState } from '@/store/system/types';
import { IRootState } from '@/store/types';

import {
	deletePageData,
	getPageListData,
	createPageData,
	editPageData
} from '@/service/main/system/system';

const systemModule: Module<ISystemState, IRootState> = {
	namespaced: true,
	state() {
		return {
			usersList: [],
			usersCount: 0,
			roleList: [],
			roleCount: 0,
			goodsList: [],
			goodsCount: 0,
			menuList: [],
			menuCount: 0
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
		},
		changeGoodsList(state, list: any[]) {
			state.goodsList = list;
		},
		changeGoodsCount(state, count: number) {
			state.goodsCount = count;
		},
		changeMenuList(state, list: any[]) {
			state.menuList = list;
		},
		changeMenuCount(state, count: number) {
			state.menuCount = count;
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
		},

		async deletePageDataAction({ dispatch }, payload) {
			// 1. 获取pageName和id
			// id -> users/id
			const { pageName, id } = payload;
			const pageUrl = `/${pageName}/${id}`;

			// 2. 调用删除的网络请求
			await deletePageData(pageUrl);

			// 3. 重新请求最新的数据
			// TODO: 可以把 查询的数据和分页的数据放在vuex中
			dispatch('getPageListAction', {
				pageName,
				queryInfo: {
					offset: 0,
					size: 10
				}
			});
		},

		async createPageDataAction({ dispatch }, payload: any) {
			// 1. 创建数据的请求
			const { pageName, newData } = payload;
			const pageUrl = `/${pageName}`;
			console.log(pageUrl);
			console.log(newData);
			await createPageData(pageUrl, newData);

			// 2. 请求最新的数据
			dispatch('getPageListAction', {
				pageName,
				queryInfo: {
					offset: 0,
					size: 10
				}
			});
		},

		async editPageDataAction({ dispatch }, payload: any) {
			// 1. 编辑数据的请求
			const { pageName, editData, id } = payload;
			console.log('editData', editData);
			const pageUrl = `/${pageName}/${id}`;
			await editPageData(pageUrl, editData);

			// 2. 请求最新的数据
			dispatch('getPageListAction', {
				pageName,
				queryInfo: {
					offset: 0,
					size: 10
				}
			});
		}
	}
};

export default systemModule;
