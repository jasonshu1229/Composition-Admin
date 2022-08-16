import { createStore } from 'vuex';
import { IRootState } from '@/store/types';
import login from './login/login';

const store = createStore<IRootState>({
	state: () => {
		return {
			name: 'lsh',
			age: 18
		};
	},
	mutations: {},
	getters: {},
	actions: {},
	modules: {
		login
	}
});

/**
 * @description 防止页面刷新，导致vuex数据丢失，确保vuex数据和localStorage里同步
 */
export function setupStore() {
	store.dispatch('login/loadLocalLogin');
}

export default store;
