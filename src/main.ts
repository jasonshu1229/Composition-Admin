import { createApp } from 'vue';
import App from './App.vue';
import 'normalize.css';
import './assets/css/index.less';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';

// import shRequest from './service';

// 全局引入 1)
// import ElementPlus from 'element-plus';
// import 'element-plus/dist/index.css';

import router from './router';
import store from './store/index';
import { setupStore } from '@/store';

const app = createApp(App);

// app.use(router);
// app.use(store);
// 全局注册 2)
// app.use(ElementPlus);

// app.mount('#app');

app.use(router).use(store).mount('#app');
setupStore(); // 防止页面刷新，vuex数据丢失

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
	app.component(key, component);
}

// shRequest.request({
// 	url: '/home/multidata',
// 	method: 'GET',
// 	interceptors: {
// 		requestInterceptor: (config) => {
// 			console.log('单独请求的config');
// 			return config;
// 		},
// 		responseInterceptor: (res) => {
// 			console.log('单独响应的response');
// 			return res;
// 		}
// 	}
// });

// interface DataType {
// 	data: any;
// 	returnCode: string;
// 	success: boolean;
// }

// shRequest
// 	.get<DataType>({
// 		url: '/home/multidata',
// 		showLoading: false
// 	})
// 	.then((res) => {
// 		console.log(res.data);
// 		console.log(res.returnCode);
// 		console.log(res.success);
// 	});
