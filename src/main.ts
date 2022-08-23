import { createApp } from 'vue';
import App from './App.vue';
import 'normalize.css';
import './assets/css/index.less';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';

// 1. 国际化全局配置
import ElementPlus from 'element-plus';
import zhCn from 'element-plus/es/locale/lang/zh-cn';

// 1. 全局引入
// import ElementPlus from 'element-plus';
// import 'element-plus/dist/index.css';

// 2. 全局注册
// app.use(ElementPlus);

import router from './router';
import store from './store/index';
import { setupStore } from '@/store';
import { globalRegister } from '@/global';

const app = createApp(App);

app.use(globalRegister);
app.use(store);

setupStore(); // 防止页面刷新，vuex数据丢失
app.use(router);

// 2. 国际化配置
app.use(ElementPlus, {
	locale: zhCn
});

app.mount('#app');

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
	app.component(key, component);
}
