import { useStore } from '@/store';

/**
 * @description 判断当前 PageName 是否有 handleName 权限
 * @param pageName
 * @param handleName
 */
export function usePermission(pageName: string, handleName: string) {
	const store = useStore();
	const permissions = store.state.login.permissions;
	const verifyPermission = `system:${pageName}:${handleName}`;
	console.log('verifyPermission', verifyPermission);

	return !!permissions.find((item) => item === verifyPermission);
}
