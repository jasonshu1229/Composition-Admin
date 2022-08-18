import { RouteRecordRaw } from 'vue-router';

/**
 * @description 将用户角色拥有的菜单树映射成角色所属路由
 * @param userMenus 角色菜单树
 */
export function mapMenusToRoutes(userMenus: any[]): RouteRecordRaw[] {
	const routes: RouteRecordRaw[] = [];

	// 1. 默认先去加载所有的routes
	const allRoutes: RouteRecordRaw[] = [];
	// 获取到 main 下面的所有路由文件
	const routeFiles = require.context('../router/main', true, /\.ts/);
	routeFiles.keys().forEach((key) => {
		// key：./system/user/user.ts
		// 导入路由（需要做一定处理） 获取到的路由，好统一执行所有路由
		const route = require('../router/main' + key.split('.')[1]);
		allRoutes.push(route.default);
	});

	// 2. 根据菜单获取需要添加的 routes
	// type: 1 表示可以展开的菜单，需要递归遍历
	// type: 2 表示一级菜单，为不可以展开的菜单，则不需要递归遍历了
	const _recurseGetRoute = (menus: any[]) => {
		for (const menu of menus) {
			if (menu.type === 2) {
				const route = allRoutes.find((route) => route.path === menu.url);
				if (route) routes.push(route);
			} else {
				_recurseGetRoute(menu.children);
			}
		}
	};

	_recurseGetRoute(userMenus);

	return routes;
}
