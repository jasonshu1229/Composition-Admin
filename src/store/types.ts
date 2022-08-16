import { ILoginState } from './login/types';

export interface IRootState {
	name: string;
	age: number;
}

// Root类型里面还有可能有store下的Module类型
export interface IRootWithModule {
	login: ILoginState;
}

export type IStoreType = IRootWithModule & IRootState;
