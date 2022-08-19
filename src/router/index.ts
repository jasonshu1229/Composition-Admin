import { createRouter, createWebHashHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';
import localCache from '@/utils/cache';
import { firstMenu } from '@/utils/map-menu';

const routes: RouteRecordRaw[] = [
	{
		path: '/',
		redirect: '/main'
	},
	{
		path: '/login',
		name: 'login',
		component: () => import('@/views/login/login.vue')
	},
	{
		path: '/main',
		name: 'main',
		component: () => import('@/views/main/main.vue')
	},
	{
		path: '/:pathMatch(.*)*',
		name: 'not-found',
		component: () => import('@/views/not-found/not-found.vue')
	}
];

const router = createRouter({
	routes,
	history: createWebHashHistory()
});

// 路由守卫
router.beforeEach((to) => {
	if (to.path !== '/login') {
		const token = localCache.getCache('token');
		if (!token) {
			return '/login';
		}
	}
	// to: 要跳转到的路由对象  router.getRoutes() 获得全部路由
	if (to.path === '/main') {
		return firstMenu.url;
	}
});

export default router;
