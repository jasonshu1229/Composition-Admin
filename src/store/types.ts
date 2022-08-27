import { ILoginState } from './login/types';
import { ISystemState } from './system/types';

export interface IRootState {
	name: string;
	age: number;
	entireDepartment: any[];
	entireRole: any[];
}

// Root类型里面还有可能有store下的Module类型
export interface IRootWithModule {
	login: ILoginState;
	system: ISystemState;
}

export type IStoreType = IRootWithModule & IRootState;
