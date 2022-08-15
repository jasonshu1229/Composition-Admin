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

export default store;
