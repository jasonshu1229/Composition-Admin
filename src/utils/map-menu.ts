import { RouteRecordRaw } from 'vue-router';
import { IBreadcrumb } from '@/bast-ui/breadcrumb';

let firstMenu: any = null; // 项目首次加载的默认路由

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
				if (!firstMenu) {
					firstMenu = menu; // 保存第一个菜单
				}
			} else {
				_recurseGetRoute(menu.children);
			}
		}
	};

	_recurseGetRoute(userMenus);

	return routes;
}

/**
 * @description 将当前路径映射成对应菜单路由（二级菜单路由）
 * @param userMenus 角色菜单
 * @param currentPath 当前路径
 */
// export function pathMapToMenu(userMenus: any[], currentPath: string): any {
// 	for (const menu of userMenus) {
// 		if (menu.type === 1) {
// 			// 当前是一级菜单，但包含children，还有二级菜单
// 			const findMenu = pathMapToMenu(menu.children ?? [], currentPath);
// 			if (findMenu) {
// 				return findMenu;
// 			}
// 		} else if (menu.type === 2 && menu.url === currentPath) {
// 			return menu;
// 		}
// 	}
// }

/**
 * @description 将路径映射成面包屑需要的数据
 * @param userMenus 角色菜单
 * @param currentPath 当前路径
 */
export function pathMapBreadcrumbs(userMenus: any[], currentPath: string) {
	const breadcrumbs: IBreadcrumb[] = [];
	pathMapToMenu(userMenus, currentPath, breadcrumbs);
	return breadcrumbs;
}

/**
 * @description 将当前路径通过菜单路由匹配规则生成相应路由
 * @param userMenus 角色菜单
 * @param currentPath 当前路径
 * @param breadcrumbs 面包屑配置数据
 */
export function pathMapToMenu(
	userMenus: any[],
	currentPath: string,
	breadcrumbs?: IBreadcrumb[]
): any {
	for (const menu of userMenus) {
		if (menu.type === 1) {
			const findSecondMenu = pathMapToMenu(menu.children ?? [], currentPath);
			if (findSecondMenu) {
				breadcrumbs?.push({ name: menu.name });
				breadcrumbs?.push({ name: findSecondMenu.name });
				return findSecondMenu;
			}
		} else if (menu.type === 2 && menu.url === currentPath) {
			// 只返回二级菜单
			return menu;
		}
	}
}

/**
 * @description 递归角色菜单直至找到type为3的角色权限（增删改查）为了获取用户的权限
 * @param userMenu 角色菜单
 */
export function mapMenusToPermission(userMenu: any[]) {
	const permissions: string[] = [];

	const _recurseGetPermission = (menus: any[]) => {
		for (const menu of menus) {
			if (menu.type === 1 || menu.type === 2) {
				_recurseGetPermission(menu.children ?? []);
			} else if (menu.type === 3) {
				permissions.push(menu.permission);
			}
		}
	};

	_recurseGetPermission(userMenu);

	return permissions;
}

export { firstMenu };
