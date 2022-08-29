import { ILoginState } from './login/types';
import { ISystemState } from './system/types';
import { IDashboardState } from './main/analysis/types';

export interface IRootState {
	name: string;
	age: number;
	entireDepartment: any[];
	entireRole: any[];
	entireMenu: any[];
}

// Root类型里面还有可能有store下的Module类型
export interface IRootWithModule {
	login: ILoginState;
	system: ISystemState;
	dashboard: IDashboardState;
}

export type IStoreType = IRootWithModule & IRootState;
