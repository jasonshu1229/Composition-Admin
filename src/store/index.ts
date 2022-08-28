import { createStore, Store, useStore as useVuexStore } from 'vuex';
import { IRootState, IStoreType } from '@/store/types';
import login from './login/login';
import system from './system/system';

import { getPageListData } from '@/service/main/system/system';

const store = createStore<IRootState>({
	state: () => {
		return {
			name: 'lsh',
			age: 18,
			entireDepartment: [],
			entireRole: [],
			entireMenu: []
		};
	},
	mutations: {
		changeEntireDepartment(state, list) {
			state.entireDepartment = list;
		},
		changeEntireRole(state, list) {
			state.entireRole = list;
		},
		changeEntireMenu(state, list) {
			state.entireMenu = list;
		}
	},
	getters: {},
	actions: {
		async getInitialDataAction({ commit }) {
			// 1. 请求部门和角色数据
			const departmentResult = await getPageListData('/department/list', {
				offset: 0,
				size: 100
			});
			const { list: departmentList } = departmentResult.data;

			const roleResult = await getPageListData('/role/list', {
				offset: 0,
				size: 100
			});
			const { list: roleList } = roleResult.data;

			const menuResult = await getPageListData('/menu/list', {});
			const { list: menulist } = menuResult.data;

			// 2. 保存数据
			commit('changeEntireDepartment', departmentList);
			commit('changeEntireRole', roleList);
			commit('changeEntireMenu', menulist);
		}
	},
	modules: {
		login,
		system
	}
});

/**
 * @description 防止页面刷新，导致vuex数据丢失，确保vuex数据和localStorage里同步
 */
export function setupStore() {
	store.dispatch('login/loadLocalLogin');
	// 不能放在这里，因为 异步操作有可能 token没回来，造成请求失败
	// store.dispatch('getInitialDataAction');
}

export function useStore(): Store<IStoreType> {
	return useVuexStore();
}

export default store;
